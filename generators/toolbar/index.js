'use strict';

const _ = require('lodash');
const path = require('path');
const chalk = require('chalk');

// Custom extended generator
const WPGenerator = require('../../common/generator.js');

// Common functions
const utils = require('../../common/utils');

module.exports = class extends WPGenerator {

  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {

    const prompts = [{
      type: 'input',
      name: 'title',
      message: 'What is the title for this toolbar (shown in the bar)?',
      default: `${_.startCase(this.options.name)} Toolbar`
    }, {
      type: 'confirm',
      name: 'hasChild',
      message: 'This toolbar will have submenus?',
      default: true
    }, {
      type: 'input',
      name: 'childNumber',
      message: 'How many submenus do you want to create?',
      default: 1,
      filter: (value) => parseInt(value),
      validate: utils.validateRequired,
      when: (answers) => answers.hasChild
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

  // Used internally to dinamic update the main class
  conflicts() {

    try {

      const ast = this.getMainClassFile();
      const classObject = ast.findClass(this.props.className);

      // Exit if the class object does not exist
      if (!classObject) {
        throw new Error(`The ${this.props.className} class does not exist.`);
      }

      // Get the toolbars array
      const toolbars = classObject.getProperty('toolbars');

      // Exit if the widget property does not exist
      if (!toolbars) {
        throw new Error('The $toolbars array property was not found.');
      }

      const childClass = `${this.props.childClassName}_Toolbar`;

      const index = toolbars.ast.value.items.findIndex(e => {
        return e.key.value === childClass;
      });

      // Exit if entry is already in
      if( index > -1 ) {
        this.log(chalk.cyan('identical'), `class name ${childClass} inside toolbars array.`)
        return;
      }

      // Add the new widget to the array
      toolbars.ast.value.items.push({
        kind: 'entry',
        key: {
          kind: 'string',
          value: `${this.props.childClassName}_Toolbar`,
          isDoubleQuote: false
        },
        value: {
          kind: 'string',
          value: `/${this.name}/class-${_.kebabCase(this.options.name)}.php`,
          isDoubleQuote: false
        }
      });

      // Write the file back
      this.setMainClassFile(ast.toString());

    } catch (err) {
      this.log(chalk.bold.red(err.toString()));
      super.warningMessage();
    }

  }

  end() {
    super.end();
  }

};
