'use strict';
const _ = require('lodash');
const WPGenerator = require('../../common/generator.js');

module.exports = class extends WPGenerator {

  configuring() {
    // Get the project defaults
    this.defaults();
    this.options.name = _.upperFirst(_.camelCase(this.options.name));
    this.options.tag = _.kebabCase(this.options.name);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('shortcode.template'),
      this.destinationPath('include/shortcodes/class-' + _.kebabCase(this.options.name) + '.php'),
      this.options
    );
  }

};
