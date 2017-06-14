'use strict';
const _ = require('lodash');
const WPGenerator = require('../../common/generator.js');

module.exports = class extends WPGenerator {

  configuring() {
    // Get the project defaults
    this.defaults();
    this.props.name = _.upperFirst(_.camelCase(this.options.name));
    this.props.tag = _.kebabCase(this.options.name);
    this.props.className = _.upperFirst(_.camelCase(this.options.name));
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('shortcode.template'),
      this.destinationPath('include/shortcodes/class-' + _.kebabCase(this.options.name) + '.php'),
      this.props
    );
  }

};
