'use strict';

const _ = require('lodash');
const path = require('path');
const chalk = require('chalk');
const WPGenerator = require('../../common/generator');

module.exports = class extends WPGenerator {

  constructor(args, opts) {
    super(args, opts);
  }

  // Get specific submodule details
  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'screen',
      message: 'The screen or screens on which to show the box (leave blank for default screen).',
      default: null
    }, {
      type: 'list',
      name: 'context',
      message: 'The context within the screen where the boxes should display:',
      choices: ['advanced', 'normal', 'side'],
      default: 0
    }, {
      type: 'list',
      name: 'priority',
      message: 'The priority within the context where the boxes should show:',
      choices: ['default', 'high', 'low'],
      default: 0
    }]).then((answers) => {
      _.assign(this.props, answers);
    });
  }

  // Set specific properties
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

  // Used internally to dinamic update the main class
  conflicts() {

    try {

      const ast = this.getMainClassFile();
      const classObject = ast.findClass(this.props.className);

      // Exit if the class object does not exist
      if (!classObject) {
        throw new Error(`The ${this.props.className} class does not exist.`);
      }

      // Get the metaboxes array
      const metaboxes = classObject.getProperty('metaboxes');

      // Exit if the widget property does not exist
      if (!metaboxes) {
        throw new Error('The $metaboxes array property was not found.');
      }

      const childClass = `${this.props.childClassName}_Metabox`;

      const index = metaboxes.ast.value.items.findIndex(e => {
        return e.key.value === childClass;
      });

      // Exit if entry is already in
      if( index > -1 ) {
        this.log(chalk.cyan('identical'), `class name ${childClass} inside metaboxes array.`)
        return;
      }

      // Add the new widget to the array
      metaboxes.ast.value.items.push({
        kind: 'entry',
        key: {
          kind: 'string',
          value: childClass,
          isDoubleQuote: false
        },
        value: {
          kind: 'string',
          value: `/metabox/class-${_.kebabCase(this.options.name)}.php`,
          isDoubleQuote: false
        }
      });

      // Write the file back
      this.setMainClassFile(ast.toString());

    } catch (err) {

      // Print the error
      this.log(chalk.bold.red(err.toString()));

      // Print extra informations
      this.log(
        chalk.bold.yellow('You should manually add'),
        `include_once(${this.props.definePrefix}_INCLUDE_DIR . '/metabox/class-${_.kebabCase(this.options.name)}.php');`,
        chalk.bold.yellow('to your plugin main class file.')
      );

    }

  }

  end() {
    super.end();
  }

};
