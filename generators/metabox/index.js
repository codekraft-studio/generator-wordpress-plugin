'use strict';

const _ = require('lodash');
const path = require('path');
const WPGenerator = require('../../common/generator');

module.exports = class extends WPGenerator {

  constructor(args, opts) {
    super(args, opts);
  }

  configuring() {
    // Get the project defaults
    this.defaults();

    // The subgenerator name
    this.name = path.basename(__dirname);

    // Sub generator properties overrides
    this.props.id = _.snakeCase(this.options.name);
    this.props.title = _.startCase(this.options.name);
    this.props.childClassName = _.upperFirst(_.camelCase(this.options.name));
  }

  // Call the parent writing method
  writing() {
    super.writing()
  }

};
