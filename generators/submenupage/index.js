'use strict';

const _ = require('lodash');
const path = require('path');
const WPGenerator = require('../../common/generator');

module.exports = class extends WPGenerator {

  constructor(args, opts) {
    super(args, opts);

    this.option('parent', {
      description: 'The slug of the parent menupage',
      type: String,
      alias: 'p',
      // TODO: Add a config option saved in the yo-rc file with the top level menupage
      // since in most of cases a plugin has only one top level page
      default: ''
    });

    // The subgenerator name
    this.name = path.basename(__dirname);
  }

  // Try to get parent project config or exit
  initializing() {
    this.defaults();
  }

  // Get specific submodule details
  prompting() {
    return this.prompt([ {
      type: 'input',
      name: 'parent_slug',
      message: 'What is the slug of the parent page?',
      default: this.options.parent || ''
    },{
      type: 'input',
      name: 'page_title',
      message: 'What is the sub menu page title?',
      default: _.upperFirst(this.options.name)
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
    }]).then((answers) => {
      _.assign(this.props, answers);
    });
  }

  // Set specific properties
  configuring() {

    // Sub generator properties overrides
    this.options.name = this.props.menu_slug;
    this.props.id = _.snakeCase(this.options.name);
    this.props.title = _.startCase(this.options.name);
    this.props.childClassName = _.upperFirst(_.camelCase(this.options.name));
  }

  // Call the parent writing method
  writing() {
    super.writing()
  }

  // Used internally to dinamic update the main class
  conflicts() {

  }

  end() {
    super.end();
  }

};
