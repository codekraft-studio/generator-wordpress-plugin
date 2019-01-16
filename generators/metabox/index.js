'use strict';

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
    this.defaults();
  }

  prompting() {
    return super.prompting([{
      type: 'input',
      name: 'screen',
      message: 'The screen or screens on which to show the box (leave blank for default screen).',
      default: null
    }, {
      type: 'list',
      name: 'context',
      message: 'The context within the screen where the boxes should display:',
      choices: ['advanced', 'normal', 'side'],
      default: 0
    }, {
      type: 'list',
      name: 'priority',
      message: 'The priority within the context where the boxes should show:',
      choices: ['default', 'high', 'low'],
      default: 0
    }]);
  }

  // Call the parent writing method
  writing() {
    super.writing()
  }

  // Try to update the main class code
  install() {
    super.updates({
      property: 'metaboxes'
    })
  }

};
