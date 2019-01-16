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
    this.defaults();
  }

  prompting() {
    return super.prompting([{
      type: 'input',
      name: 'description',
      message: 'How you would describe this widget?',
      default: answers => `The ${_.startCase(answers.name || this.options.name)} widget description.`
    }]);
  }

  writing() {
    super.writing()
  }

  // Try to update the main class code
  install() {
    super.updates({
      property: 'widgets'
    })
  }

};
