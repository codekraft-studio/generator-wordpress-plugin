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


  }

  end() {
    super.end();
  }

};
