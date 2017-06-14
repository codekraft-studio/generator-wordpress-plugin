'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');
const mkdirp = require('mkdirp');
const path = require('path');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the first-rate ' + chalk.green('wordpress-plugin') + ' generator!'
    ));

    // The project details prompting
    const prompts = [
      {
        type: 'text',
        name: 'projectName',
        message: 'What slug do you want to use for this project?',
        default: _.kebabCase(this.appname),
        validate: function (input) {
          if (!/^(?:[a-z]+-?[a-z]+)+$/g.test(input)) {
            return 'You should follow the WordPress plugin name standard.';
          }
          return true;
        }
      },
      {
        name: 'projectTitle',
        message: 'What is the full name for this project?',
        default: function (answers) {
          return _.startCase(_.toLower(answers.projectName));
        },
        validate: function (value) {
          if (value === '') {
            return 'This field is required, please enter a valid value.';
          }
          return true;
        }
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
        type: 'text',
        name: 'projectManager',
        message: 'Do you want to use grunt or gulp as your build system?',
        default: 'grunt',
        validate: function (input) {
          if (['grunt', 'gulp'].indexOf(input) === -1) {
            return 'You must use grunt or gulp.';
          }
          return true;
        }
      },
      {
        type: 'text',
        name: 'projectVersion',
        message: 'The version to initialize this project.',
        default: '0.0.1',
        validate: function (input) {
          if (!/[0-9]{1}\.([0-9]{1})\.([0-9]{1})/.test(input)) {
            return 'You should enter a valid version.';
          }
          return true;
        }
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
        validate: function (value) {
          if (value === '') {
            return 'This field is required, please enter a valid value.';
          }
          return true;
        }
      }
    ];

    // Get details from user
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  configuring() {
    // Create the root folder if not exists
    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.projectName + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.projectName);
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }

    this.props.className = _.upperFirst(_.camelCase(this.props.projectName));
    this.props.definePrefix = this.props.className.toUpperCase();
  }

  savings() {
    // Store the main project configurations
    this.config.set(this.props);
    // Create a configuration file
    this.config.save();
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('plugin/include/*'),
      this.destinationPath('include/'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('plugin/_plugin.php'),
      this.destinationPath(this.props.projectName + '.php'),
      this.props
    );
  }

  install() {
    this.installDependencies();
  }

};
