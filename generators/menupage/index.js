'use strict';

const _ = require('lodash');
const path = require('path');
const BaseGenerator = require('../../common/generator');

module.exports = class extends BaseGenerator {

  constructor(args, opts) {
    super(args, opts);

    // The subgenerator name
    this.name = path.basename(__dirname);
  }

  // Try to get parent project config or exit
  initializing() {
    this.getParentProject();
  }

  // Get specific submodule details
  prompting() {
    return super.prompting([
      {
        type: 'input',
        name: 'page_title',
        message: 'What is the page title?',
        default: answers => _.upperFirst(answers.name || this.options.name)
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
    ]);
  }

  writing() {
    super.writing()
  }

};
