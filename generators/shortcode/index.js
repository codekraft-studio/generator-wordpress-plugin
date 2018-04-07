'use strict';

const _ = require('lodash');
const path = require('path');
const chalk = require('chalk');
const WPGenerator = require('../../common/generator.js');

module.exports = class extends WPGenerator {

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
    this.defaults();
  }

  configuring() {
    // Set command line options
    this.props.filter = this.options.filter;
    this.props.enclosing = this.options.enclosing;

    // Sub generator properties overrides
    this.props.name = _.upperFirst(_.camelCase(this.options.name));
    this.props.tag = _.kebabCase(this.options.name);
    this.props.childClassName = _.upperFirst(_.camelCase(this.options.name));
  }

  // Call the parent writing method
  writing() {
    super.writing()
  }

  // Used internally to dinamic update the main class
  conflicts() {

    try {

      const ast = this.getFileAST();
      const classObject = ast.findClass(this.props.className);

      // Exit if the class object does not exist
      if (!classObject) {
        throw new Error(`The ${this.props.className} class does not exist.`);
      }

      // Get the shortcodes array
      const shortcodes = classObject.getProperty('shortcodes');

      // Exit if the widget property does not exist
      if (!shortcodes) {
        throw new Error('The $shortcodes array property was not found.');
      }

      const childClass = `${this.props.childClassName}_Shortcode`;

      const index = shortcodes.ast.value.items.findIndex(e => {
        return e.key.value === childClass;
      });

      // Exit if entry is already in
      if( index > -1 ) {
        this.log(chalk.cyan('identical'), `class name ${childClass} inside shortcodes array.`)
        return;
      }

      // Add the new widget to the array
      shortcodes.ast.value.items.push({
        kind: 'entry',
        key: {
          kind: 'string',
          value: `${this.props.childClassName}_Shortcode`,
          isDoubleQuote: false
        },
        value: {
          kind: 'string',
          value: `/shortcode/class-${_.kebabCase(this.options.name)}.php`,
          isDoubleQuote: false
        }
      });

      // Write the file back
      this.writeFileAST(ast.toString());

    } catch (err) {
      this.log(chalk.bold.red(err.toString()));
      super.warningMessage();
    }

  }

  end() {
    super.end();
  }

};
