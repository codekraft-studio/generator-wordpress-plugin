'use strict';

const _ = require('lodash');
const path = require('path');
const chalk = require('chalk');
const WPGenerator = require('../../common/generator');

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

  // Get specific submodule details
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'page_title',
        message: 'What is the page title?',
        default: this.options.name
      }, {
        type: 'input',
        name: 'menu_title',
        message: 'What is the menu title?',
        default: answers => _.upperFirst(answers.page_title)
      }, {
        type: 'input',
        name: 'capability',
        message: 'What is the menu page capability?',
        default: "administrator"
      }, {
        type: 'input',
        name: 'menu_slug',
        message: 'What is the menu unique slug?',
        default: answers => _.kebabCase(answers.menu_title)
      }, {
        type: 'input',
        name: 'icon',
        message: 'What icon do you want to use?',
        default: 'dashicons-admin-generic'
      }, {
        type: 'input',
        name: 'position',
        message: 'What is the menu unique slug?',
        default: 100
      }
    ]).then((answers) => {
      _.assign(this.props, answers);
    });
  }

  // Set specific properties
  configuring() {
    this.options.name = this.props.menu_slug;
    this.props.id = _.snakeCase(this.options.name);
    this.props.title = _.startCase(this.options.name);
    this.props.childClassName = _.upperFirst(_.camelCase(this.options.name));
  }

  // Call the parent writing method
  writing() {
    super.writing()
  }

  // Used internally to dinamic update the main class
  conflicts() {}

  end() {
    super.end();
  }

};
