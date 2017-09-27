'use strict';

const _ = require('lodash');
const fs = require('fs');
const writer = require('php-writer');
const chalk = require('chalk');
const Generator = require('yeoman-generator');

module.exports = class WPGenerator extends Generator {

  constructor(args, opts) {
    super(args, opts);
    // Init a empty props object
    this.props = {};
    // Set the name argument as required
    this.argument('name', {type: String, required: true});
  }

  // Get the plugin main class file content
  getMainClassFile() {
    const mainClass = this.destinationPath('include/class-main.php');
    const content = fs.readFileSync( mainClass, 'utf8' );
    return new writer(content);
  }

  // Write the plugin main class file content
  setMainClassFile(content) {
    const mainClass = this.destinationPath('include/class-main.php');
    // Write the file back to disk
    fs.writeFileSync(mainClass, content, {
      encoding: 'utf8'
    });
  }

  defaults() {
    let config = this.config.getAll();
    if( _.isEmpty(config) ) {
      this.env.error("You must run this command inside a existing project.");
    }
    // Get the global project variables
    this.props = _.assignIn(config, this.props);
  }

  writing() {
    // Get filename from options
    const filename = _.kebabCase(this.options.name);

    // Render and write submodule template
    this.fs.copyTpl(
      this.templatePath('template.ejs'),
      this.destinationPath(`include/${this.name}/class-${filename}.php`),
      this.props
    );
  }

  // Print the end message
  end() {
    this.log( chalk.bold.yellow('The generator has finished his job.') );
  }

};
