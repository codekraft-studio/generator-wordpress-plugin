'use strict';

const _ = require('lodash');
const path = require('path');
const BaseGenerator = require('../../common/generator.js');

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
      name: 'description',
      message: 'What is the taxonomy description?',
      default: answers => `The ${_.startCase(answers.name || this.options.name)} taxonomy description.`
    }, {
      type: 'input',
      name: 'singular_name',
      message: 'What is the taxonomy singular name?',
      default: (answers) => _.startCase(answers.name)
    }, {
      type: 'input',
      name: 'plural_name',
      message: 'What is the taxonomy plural name?',
      default: (answers) => `${answers.singular_name}s`
    }, {
      type: 'confirm',
      name: 'hierarchical',
      message: 'Do you want the taxonomy to be hierarchical?',
      default: false
    },  {
      type: 'input',
      name: 'post_types',
      message: 'Which post_types do you want to link to this taxonomy?',
      default: ['post'],
      filter: v => Array.isArray(v) ? v : v.split(',')
    }, {
      type: 'confirm',
      name: 'public',
      message: 'Do you want the taxonomy to be public?',
      default: true
    }, {
      type: 'confirm',
      name: 'show_ui',
      message: 'Do you want the taxonomy to be shown in UI?',
      default: true
    }]);
  }

  writing() {
    super.writing()
  }

  // Try to update the main class code
  install() {
    super.updates({
      property: 'taxonomies'
    })
  }

};
