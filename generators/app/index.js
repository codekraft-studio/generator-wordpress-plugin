'use strict';

const _ = require('lodash');
const mkdirp = require('mkdirp');
const path = require('path');
const chalk = require('chalk');
const yosay = require('yosay');
const Generator = require('yeoman-generator');

// Common functions
const utils = require('../../common/utils');

// The main generator is indipendent from all
// it initiate the project creating also a configuration file
// for later submodules generation -- all the submodules requires this file
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

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
  }

  // Ask user for project details
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to ' + chalk.bold.redBright('wordpress-plugin') + ' generator!'));

    // Main project setup prompt questions
    // this details are stored into yo-rc config file
    const prompts = [
      {
        type: 'text',
        name: 'projectName',
        message: 'What slug do you want to use for this project?',
        default: _.kebabCase(this.options.appname || this.appname),
        validate: utils.validateSlug
      },
      {
        name: 'projectTitle',
        message: 'What is the full name for this project?',
        default: function (answers) {
          return _.startCase(_.toLower(answers.projectName));
        },
        validate: utils.validateRequired
      },
      {
        type: 'text',
        name: 'projectDescription',
        message: 'What is the project description?',
        default: function (answers) {
          return 'This is the ' + answers.projectTitle + ' description.';
        }
      },
      {
        type: 'list',
        name: 'projectManager',
        message: 'What do you want to use a project manager?',
        default: 'grunt',
        choices: ['grunt', 'gulp'],
        validate: utils.validateProjectManager
      },
      {
        type: 'text',
        name: 'projectVersion',
        message: 'The version to initialize this project.',
        default: '0.0.1',
        validate: utils.validateVresion
      },
      {
        type: 'text',
        name: 'projectAuthor',
        message: 'The name of the author for this project?',
        default: this.user.git.name() || ''
      },
      {
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
    // Create the root folder if not exists
    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.projectName + '\n' +
        'I\'ll automatically create this folder.'
      );

      // Try to create the folder
      if( !mkdirp.sync(this.props.projectName) ) {
        // Exit with error since project root can't be created
      }

      // Change the project root to newly created directory
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }

    // Build project prefixes/namespaces
    this.props.className = _.upperFirst(_.camelCase(this.props.projectName));
    this.props.definePrefix = this.props.className.toUpperCase();

    // Init an empty repository
    this.spawnCommandSync('git', ['init', '--quiet']);
  }

  // Save the project details into configuration file
  savings() {
    // Store the main project configurations
    this.config.set(this.props);
    // Create a configuration file
    this.config.save();
  }

  // Compile and write the project files
  writing() {
    this.fs.copyTpl(
      this.templatePath('plugin/include/*'),
      this.destinationPath('include/'),
      this.props
    );

    // Copy all dotfiles
    this.fs.copy(
      this.templatePath('plugin/.*'),
      this.destinationPath()
    );

    // Render and copy main plugin file
    this.fs.copyTpl(
      this.templatePath('plugin/_plugin.php'),
      this.destinationPath(this.props.projectName + '.php'),
      this.props
    );

    // Write the project manager files
    switch (this.props.projectManager) {
      case 'grunt':
        this.fs.copyTpl(
          this.templatePath('grunt/_package.json'),
          this.destinationPath('package.json'),
          this.props
        );
        this.fs.copy(
          this.templatePath('grunt/_Gruntfile.js'),
          this.destinationPath('Gruntfile.js')
        );
        break;
      case 'gulp':
        this.fs.copyTpl(
          this.templatePath('gulp/_package.json'),
          this.destinationPath('package.json'),
          this.props
        );
        this.fs.copy(
          this.templatePath('gulp/_gulpfile.js'),
          this.destinationPath('gulpfile.js')
        );
        break;
    }
  }

  // Install project dependencies
  install() {
    this.installDependencies({
      bower: false,
      npm: true
    });
  }
};
