'use strict';

const _ = require('lodash');
const path = require('path');
const chalk = require('chalk');
const WPGenerator = require('../../common/generator.js');

module.exports = class extends WPGenerator {

  prompting() {
    const prompts = [{
      type: 'input',
      name: 'description',
      message: 'How you would describe this widget?',
      default: ['The', _.startCase(this.options.name), 'widget description.'].join(' ')
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
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

  // Update the main class instance
  end() {

    try {

      const ast = this.getMainClassFile();
      const classObject = ast.findClass(this.props.className);

      // Exit if the class object does not exist
      if (!classObject) {
        throw new Error(`The ${this.props.className} class does not exist.`);
      }

      // Get the widgets array
      const widgets = classObject.getProperty('widgets');

      // Exit if the widget property does not exist
      if (!widgets) {
        throw new Error('The $widgets array property was not found.');
      }

      // Add the new widget to the array
      widgets.ast.value.items.push({
        kind: 'entry',
        key: {
          kind: 'string',
          value: `${this.props.childClassName}_Widget`,
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
        `include_once(${this.props.definePrefix}_INCLUDE_DIR . '/widgets/class-${_.kebabCase(this.options.name)}.php');`,
        chalk.bold.yellow('to your plugin main class.')
      );

    } finally {
      // Call the parent end method
      super.end();
    }

  }

};
