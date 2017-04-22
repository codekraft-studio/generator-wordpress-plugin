'use strict';
const _ = require('lodash');
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
    this.props.id = _.snakeCase(this.options.name);
    this.props.title = _.startCase(this.options.name);
    this.props.className = _.upperFirst(_.camelCase(this.options.name));
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('widget.template'),
      this.destinationPath('include/widgets/class-' + _.kebabCase(this.options.name) + '.php'),
      this.props
    );
  }

  informations() {
    this.log(
      chalk.bold.yellow('You should add'),
      'include_once(' + this.props.definePrefix + '_INCLUDE_DIR . \'widgets/class-' + _.kebabCase(this.options.name) + '.php\');',
      chalk.bold.yellow('to your plugin main class.')
    );

    // Say goodbye
    this.end();
  }

};
