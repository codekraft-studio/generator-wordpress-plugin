'use strict';

const _ = require('lodash');
const path = require('path');
const chalk = require('chalk');
const WPGenerator = require('../../common/generator.js');

module.exports = class extends WPGenerator {

  prompting() {
    const prompts = [{
      type: 'input',
      name: 'description',
      message: 'How you would describe this widget?',
      default: ['The', _.startCase(this.options.name), 'widget description.'].join(' ')
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

  informations() {
    this.log(
      chalk.bold.yellow('You should add'),
      'include_once(' + this.props.definePrefix + '_INCLUDE_DIR . \'widgets/class-' + _.kebabCase(this.options.name) + '.php\');',
      chalk.bold.yellow('to your plugin main class.')
    );
  }

};
