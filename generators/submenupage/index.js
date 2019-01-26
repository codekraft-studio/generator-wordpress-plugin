'use strict';

const _ = require('lodash');
const path = require('path');
const BaseGenerator = require('../../common/generator');

module.exports = class extends BaseGenerator {

  constructor(args, opts) {
    super(args, opts);

    this.option('parent', {
      description: 'The slug of the parent menupage',
      type: String,
      alias: 'p',
      default: ''
    });

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
    return super.prompting([
      {
        type: 'input',
        name: 'parent_slug',
        message: 'What is the slug of the parent page?',
        default: this.options.parent || ''
      }, {
        type: 'input',
        name: 'page_title',
        message: 'What is the sub menu page title?',
        default: answers => _.upperFirst(answers.name || this.options.name)
      }, {
        type: 'input',
        name: 'menu_title',
        message: 'What is the sub menu title in admin panel?',
        default: answers => _.upperFirst(answers.page_title)
      }, {
        type: 'input',
        name: 'capability',
        message: 'What is the sub menu page capability?',
        default: "administrator"
      }, {
        type: 'input',
        name: 'menu_slug',
        message: 'What is the sub menu page unique slug?',
        default: answers => _.kebabCase(`${answers.parent_slug}-${answers.menu_title}`)
      }
    ]);
  }

  writing() {
    super.writing()
  }

};
