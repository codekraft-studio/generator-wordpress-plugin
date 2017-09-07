'use strict';

const _ = require('lodash');
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

  end() {
    // TODO: Put some post-setup message
  }

};
