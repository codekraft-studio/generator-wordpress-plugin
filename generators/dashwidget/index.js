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
  }

  // Try to get parent project config or exit
  initializing() {
    this.defaults();
  }

  // Sub generator properties overrides
  configuring() {
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

      // Get the dashWidgets array
      const dashWidgets = classObject.getProperty('dashWidgets');

      // Exit if the dashwidget property does not exist
      if (!dashWidgets) {
        throw new Error('The $dashWidgets array property was not found.');
      }

      const childClass = `${this.props.childClassName}_DashWidget`;

      const index = dashWidgets.ast.value.items.findIndex(e => {
        return e.key.value === childClass;
      });

      // Exit if entry is already in
      if( index > -1 ) {
        this.log(chalk.cyan('identical'), `class name ${childClass} inside dashWidgets array.`)
        return;
      }

      // Add the new dashwidget to the array
      dashWidgets.ast.value.items.push({
        kind: 'entry',
        key: {
          kind: 'string',
          value: `${this.props.childClassName}_DashWidget`,
          isDoubleQuote: false
        },
        value: {
          kind: 'string',
          value: `/dashwidget/class-${_.kebabCase(this.options.name)}.php`,
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
