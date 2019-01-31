'use strict';

const _ = require('lodash');
const path = require('path');
const utils = require('../../common/utils');
const BaseGenerator = require('../../common/generator');

module.exports = class extends BaseGenerator {

  constructor(args, opts) {
    super(args, opts);

    // The subgenerator name
    this.name = path.basename(__dirname);

    // Where to place the files
    this.directory = 'admin/pages';
  }

  // Try to get parent project config or exit
  initializing() {
    this.getParentProject();
  }

  // Get specific submodule details
  prompting() {
    return super.prompting([{
      type: 'input',
      name: 'page_title',
      message: 'What is the theme page title?',
      default: answers => _.upperFirst(answers.name || this.options.name),
      validate: utils.validateRequired
    },{
      type: 'input',
      name: 'menu_title',
      message: 'What is the theme page menu title?',
      default: answers => _.upperFirst(answers.page_title),
      validate: utils.validateRequired
    }, {
      type: 'input',
      name: 'capability',
      message: 'What is the theme page capability?',
      default: "administrator",
      validate: utils.validateRequired
    }, {
      type: 'input',
      name: 'menu_slug',
      message: 'What is the theme page menu unique slug?',
      default: answers => _.kebabCase(`${answers.menu_title}`),
      validate: utils.validateRequired
    }])
  }

  writing() {
    super.writing()
  }

};
