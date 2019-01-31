'use strict';

const _ = require('lodash');
const path = require('path');

// Custom extended generator
const BaseGenerator = require('../../common/generator.js');

// Common functions
const utils = require('../../common/utils');

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

  prompting() {
    return super.prompting([{
      type: 'input',
      name: 'title',
      message: 'What is the title for this toolbar (shown in the bar)?',
      default: answers => `${_.startCase(answers.name || this.options.name)} Toolbar`
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
    }]);
  }

  writing() {
    super.writing()
  }

  // Try to update the main class code
  install() {
    super.updates({
      property: 'toolbars'
    })
  }

};
