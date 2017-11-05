'use strict';

const _ = require('lodash');
const fs = require('fs');
const writer = require('php-writer');
const chalk = require('chalk');
const Generator = require('yeoman-generator');

const writerOptions = {
  writer: {
    indent: false,
    shortArray: false,
    bracketsNewLine: false,
    collapseEmptyLines: false
  }
};

module.exports = class WPGenerator extends Generator {

  constructor(args, opts) {
    super(args, opts);
    // Init a empty props object
    this.props = {};
    // All the submodules has a required name property
    // that identify the class name and is the seed for building other informations
    this.argument('name', {type: String, required: true});
  }

  // Get the plugin main class file content
  getMainClassFile() {
    const mainClass = this.destinationPath('include/class-main.php');
    const content = fs.readFileSync( mainClass, 'utf8' );
    return new writer(content, writerOptions);
  }

  // Write the plugin main class file content
  setMainClassFile(content) {
    const mainClass = this.destinationPath('include/class-main.php');
    this.log('  ', chalk.green('update'), 'include/class-main.php file with new class')
    // Write the file back to disk
    fs.writeFileSync(mainClass, content, {
      encoding: 'utf8'
    });
  }

  defaults() {
    let config = this.config.getAll();
    if( _.isEmpty(config) ) {
      this.env.error("You must run this command inside an existing project.");
    }
    // Get the global project variables
    this.props = _.assignIn(config, this.props);
  }

  // Write subgenerator template to include folder
  writing() {
    this.log('\nNow I\'ll start to create the files:\n');
    // Name is an option that has been set inside the subgenerator class
    // in the configuring method that is called before writing
    const filename = _.kebabCase(this.options.name);
    this.fs.copyTpl(
      this.templatePath('template.ejs'),
      this.destinationPath(`include/${this.name}/class-${filename}.php`),
      this.props
    );
  }

  // Print extra informations about the writing failure
  // and the manual updates to perform to main class file
  warningMessage() {
    this.log(
      chalk.bold.yellow('You should manually add'),
      `include_once(${this.props.definePrefix}_INCLUDE_DIR . '/${this.name}/class-${_.kebabCase(this.options.name)}.php');`,
      chalk.bold.yellow('to your plugin main class file.')
    );
  }

  // Print the end message
  end() {
    this.log( '\nAll the job', chalk.bold.yellow('was done'), 'see ya next.\n' );
  }

};
