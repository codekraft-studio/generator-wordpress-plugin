'use strict';

const { version } = require('../../package.json');
const _ = require('lodash');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Generator = require('yeoman-generator');

// Common functions
const utils = require('../../common/utils');

const banner = chalk`
{bold                          8                           } {red      8            w       }
{bold Yb  db  dP .d8b. 8d8b .d88 88b. 8d8b .d88b d88b d88b } {red 88b. 8 8   8 .d88 w 8d8b. }
{bold  YbdPYbdP  8' .8 8P   8  8 8  8 8P   8  dP  Yb.  Yb. } {red 8  8 8 8b d8 8  8 8 8P Y8 }
{bold   YP  YP    Y8P' 8     Y88 88P' 8     Y88P Y88P Y88P } {red 88P' 8  Y8P8  Y88 8 8   8 }
{bold                            8                         } {red 8            wwdP         }
`;

// The main generator is indipendent from all
// it initiate the project creating also a configuration file
// for later submodules generation -- all the submodules requires this file
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log(banner);

    // Optionally take first argument as project name
    this.argument('appname', {
      type: String,
      required: false
    });

    this.option('git', {
      description: 'Create an empty Git repository for the project',
      type: Boolean,
      default: true
    });

    // To avoid mess throw error if selected folder exists and is not empty
    const p = this.destinationPath(this.options.appname || '');
    if (fs.existsSync(p) && fs.readdirSync(p).length) {
      throw new Error(`The directory "${p}" is not empty.`)
    }
  }

  // Ask user for project details
  prompting() {
    // Main project setup prompt questions
    // this details are stored into yo-rc config file
    const prompts = [
      {
        type: 'text',
        name: 'projectName',
        message: 'What slug do you want to use for this project?',
        default: _.kebabCase(this.options.appname || this.appname),
        validate: utils.validateSlug
      }, {
        name: 'projectTitle',
        message: 'What is the full name for this project?',
        default: answers => _.startCase(_.toLower(answers.projectName)),
        validate: utils.validateRequired
      }, {
        type: 'text',
        name: 'projectDescription',
        message: 'What is the project description?',
        default: answers => `This is the ${answers.projectTitle} description`
      }, {
        type: 'confirm',
        name: 'projectManager',
        message: 'What do you want to use a project manager?',
        default: true
      }, {
        type: 'text',
        name: 'projectVersion',
        message: 'The version to initialize this project.',
        default: '0.0.1',
        validate: utils.validateVresion
      }, {
        type: 'text',
        name: 'projectAuthor',
        message: 'The name of the author for this project?',
        default: this.user.git.name() || ''
      }, {
        type: 'text',
        name: 'projectLicense',
        message: 'What license do you want to use?',
        default: 'ISC',
        validate: utils.validateRequired
      }
    ];

    // Prompt the questions to the user
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  // Configure the project folder and context
  configuring() {
    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      this.log('Your generator must be inside a folder named ' + this.props.projectName + '\n' + 'I\'ll automatically create this folder.');

      // Try to create the folder
      if (!mkdirp.sync(this.props.projectName)) {
        // Exit with error since project root can't be created
      }

      // Change the project root to newly created directory
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }

    // Build project prefixes/namespaces
    this.props.className = _.upperFirst(_.camelCase(this.props.projectName));
    this.props.definePrefix = this.props.className.toUpperCase();

    // Init an empty repository
    if (this.options.git) {
      this.spawnCommandSync('git', ['init', '--quiet']);
    }
  }

  // Save the project details into configuration file
  savings() {
    this.config.set(this.props);
    this.config.save();
  }

  // Compile and write the project files
  writing() {
    const copyFiles = [
      {
        src: this.templatePath('plugin/.*'),
        dest: this.destinationPath()
      }
    ];

    const copyTplFiles = [
      {
        src: this.templatePath('plugin/_plugin.php'),
        dest: this.destinationPath(this.props.projectName + '.php')
      }, {
        src: this.templatePath('plugin/readme.txt'),
        dest: this.destinationPath('readme.txt')
      }, {
        src: this.templatePath('plugin/include/*'),
        dest: this.destinationPath('include/')
      }
    ];

    if (this.props.projectManager) {

      copyTplFiles.push({
        src: this.templatePath('plugin/package.json'),
        dest: this.destinationPath('package.json')
      }, {
        src: this.templatePath('plugin/webpack.config.js'),
        dest: this.destinationPath('webpack.config.js')
      }, {
        src: this.templatePath('plugin/assets/src/scss'),
        dest: this.destinationPath('assets/src/scss')
      }, {
        src: this.templatePath('plugin/assets/src/js'),
        dest: this.destinationPath('assets/src/js')
      });

    } else {

      copyFiles.push({
        src: this.templatePath('plugin/assets/src/plain'),
        dest: this.destinationPath('assets/dist')
      });

    }

    // Simple copy files
    copyFiles.forEach(o => this.fs.copy(o.src, o.dest));

    // Render and copy files
    copyTplFiles.forEach(o => this.fs.copyTpl(o.src, o.dest, this.props));
  }

  // Install project dependencies
  install() {
    if (this.fs.exists(this.destinationPath('package.json'))) {
      this.installDependencies({npm: true, bower: false, yarn: false});
    }
  }
};
