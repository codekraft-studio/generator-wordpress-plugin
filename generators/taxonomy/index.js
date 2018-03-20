'use strict';

const _ = require('lodash');
const path = require('path');
const chalk = require('chalk');
const WPGenerator = require('../../common/generator.js');

module.exports = class extends WPGenerator {

  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    this.argument('taxname', { type: String, required: false });

    // The subgenerator name
    this.name = path.basename(__dirname);
  }

  // Try to get parent project config or exit
  initializing() {
    this.defaults();
  }

  prompting() {
    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the taxonomy key name?',
      default: this.options.name
    }, {
      type: 'input',
      name: 'description',
      message: 'What is the taxonomy description?',
      default: `The ${_.startCase(this.options.name)} taxonomy description.`
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
    }];

    return this.prompt(prompts).then(props => {
      this.props = _.merge(this.props, props);
    });
  }

  // Sub generator properties overrides
  configuring() {
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

    try {

      const ast = this.getMainClassFile();
      const classObject = ast.findClass(this.props.className);

      // Exit if the class object does not exist
      if (!classObject) {
        throw new Error(`The ${this.props.className} class does not exist.`);
      }

      // Get the taxonomies array
      const taxonomies = classObject.getProperty('taxonomies');

      // Exit if the widget property does not exist
      if (!taxonomies) {
        throw new Error('The $taxonomies array property was not found.');
      }

      const childClass = `${this.props.childClassName}_Widget`;

      const index = taxonomies.ast.value.items.findIndex(e => {
        return e.key.value === childClass;
      });

      // Exit if entry is already in
      if( index > -1 ) {
        this.log(chalk.cyan('identical'), `class name ${childClass} inside taxonomies array.`)
        return;
      }

      // Add the new widget to the array
      taxonomies.ast.value.items.push({
        kind: 'entry',
        key: {
          kind: 'string',
          value: `${this.props.childClassName}_Widget`,
          isDoubleQuote: false
        },
        value: {
          kind: 'string',
          value: `/widget/class-${_.kebabCase(this.options.name)}.php`,
          isDoubleQuote: false
        }
      });

      // Write the file back
      this.setMainClassFile(ast.toString());

    } catch (err) {
      this.log(chalk.bold.red(err.toString()));
      super.warningMessage();
    }

  }

  end() {
    super.end();
  }

};
