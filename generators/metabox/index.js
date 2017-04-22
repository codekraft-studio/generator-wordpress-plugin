'use strict';
const _ = require('lodash');
const WPGenerator = require('../../common/generator.js');

module.exports = class extends WPGenerator {

  configuring() {
    // Get the project defaults
    this.defaults();
    this.props.id = _.snakeCase(this.options.name);
    this.props.title = _.startCase(this.options.name);
    this.props.className = _.upperFirst(_.camelCase(this.options.name));
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('metabox.template'),
      this.destinationPath('include/metaboxes/class-' + _.kebabCase(this.options.name) + '.php'),
      this.props
    );
  }

};
