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

  end() {
    this.log('\n', 'Everything is', chalk.green('ready'), '!');
  }

};
