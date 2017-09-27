'use strict';

const _ = require('lodash');
const path = require('path');
const WPGenerator = require('../../common/generator.js');

module.exports = class extends WPGenerator {

  configuring() {
    // Get the project defaults
    this.defaults();

    // The subgenerator name
    this.name = path.basename(__dirname);

    // Sub generator properties overrides
    this.props.name = _.upperFirst(_.camelCase(this.options.name));
    this.props.tag = _.kebabCase(this.options.name);
    this.props.childClassName = _.upperFirst(_.camelCase(this.options.name));
  }

  // Call the parent writing method
  writing() {
    super.writing()
  }

};
