'use strict';

const _ = require('lodash');
const path = require('path');
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
    this.defaults();
  }

  // Get specific submodule details
  prompting() {
    return super.prompting([ {
      type: 'input',
      name: 'page_title',
      message: 'What is the management page title?',
      default: _.upperFirst(this.options.name)
    },{
      type: 'input',
      name: 'menu_title',
      message: 'What is the management page menu title?',
      default: answers => _.upperFirst(answers.page_title)
    }, {
      type: 'input',
      name: 'capability',
      message: 'What is the management page capability?',
      default: "administrator"
    }, {
      type: 'input',
      name: 'menu_slug',
      message: 'What is the management page menu unique slug?',
      default: answers => _.kebabCase(`${answers.menu_title}`)
    }]);
  }

  writing() {
    super.writing()
  }

};
