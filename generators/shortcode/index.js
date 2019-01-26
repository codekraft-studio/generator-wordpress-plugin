'use strict';

const _ = require('lodash');
const path = require('path');
const BaseGenerator = require('../../common/generator.js');

module.exports = class extends BaseGenerator {

  constructor(args, opts) {
    super(args, opts);

    // The subgenerator name
    this.name = path.basename(__dirname);

    this.option('enclosing', {
      alias: 'e',
      description: 'Create the shortcode as enclosing tag (enable content)',
      type: Boolean,
      default: false
    });

    this.option('filter', {
      alias: 'f',
      description: 'Allow the shortcode attributes to be filtered',
      type: Boolean,
      default: false
    });
  }

  // Try to get parent project config or exit
  initializing() {
    this.getParentProject();
  }

  prompting() {
    return super.prompting();
  }

  configuring() {
    this.props.filter = this.options.filter;
    this.props.enclosing = this.options.enclosing;

    // Sub generator properties overrides
    this.props.shortcodeName = _.upperFirst(_.camelCase(this.props.name));
    this.props.shortcodeTag = _.kebabCase(this.props.name);
  }

  writing() {
    super.writing()
  }

  // Try to update the main class code
  install() {
    super.updates({
      property: 'shortcodes'
    })
  }

};
