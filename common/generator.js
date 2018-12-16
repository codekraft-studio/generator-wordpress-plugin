'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const writer = require('php-writer');
const chalk = require('chalk');
const Generator = require('yeoman-generator');

const utils = require('./utils')

// Try to keep the output unhaltered as much as possible
// from the source file that the user is editing
const writerOptions = {
  writer: {
    indent: true,
    shortArray: false,
    dontUseWhitespaces: false,
    bracketsNewLine: false,
    collapseEmptyLines: true,
    forceNamespaceBrackets: false
  },
  parser: {
    debug: false,
    locations: false,
    extractDoc: true,
    suppressErrors: false
  },
  lexer: {
    all_tokens: true,
    comment_tokens: true,
    mode_eval: true,
    asp_tags: true,
    short_tags: true
  },
  ast: {
    withPositions: true
  }
};

module.exports = class BaseGenerator extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.argument('name', {
      type: String,
      required: false
    });

    this.questions = [{
      type: 'input',
      name: 'name',
      message: () => `What is the name for this ${this.name}?`,
      default: (this.options.name || '').toLowerCase(),
      filter: v => v.toLowerCase(),
      validate: utils.validateRequired,
      when: !this.options.name || this.options.name === ''
    }]
  }

  prompting(questions = []) {
    questions = _.unionBy(this.questions, questions, 'name');
    return this.prompt(questions).then(props => {
      this.props = _.merge({
        name: this.options.name
      }, this.props, props);

      // Set custom properties based on input name
      this.props.id = _.snakeCase(this.props.name);
      this.props.title = _.startCase(this.props.name);
      this.props.childClassName = _.upperFirst(_.camelCase(this.props.name));

      this.fileName = _.kebabCase(`class-${this.props.name}-${this.name}`) + '.php';
      this.fileRelativePath = `/${this.directory || this.name}/${this.fileName}`;
      this.filePath = path.join('include', this.fileRelativePath);
    });
  }

  // Get the AST rapresentation of the php class file that should
  // be modified during the execution of the subgenerator
  getFileAST() {
    const fileSource = this.destinationPath('include/class-main.php');
    const content = fs.readFileSync(fileSource, 'utf8');
    return new writer(content, writerOptions);
  }

  // Write the plugin main class file content
  writeFileAST(content) {
    const filePath = this.destinationPath('include/class-main.php');
    this.log('  ', chalk.green('update'), 'include/class-main.php file with new class')

    // Write the file back to disk
    fs.writeFileSync(filePath, content, {
      encoding: 'utf8'
    });
  }

  // Try to get the parent project configuration settings
  defaults() {
    let config = this.config.getAll();
    if( _.isEmpty(config) ) {
      this.env.error("You must run this command inside an existing project.");
    }
    this.props = _.assignIn(config, this.props);
  }

  // Write subgenerator template to a dinamic generated destination
  writing() {
    this.log('\n  Updating the project:')
    this.sourceRoot(path.join(__dirname, '../generators/templates/'));

    // Name is an option that has been set inside the subgenerator class
    // in the configuring method that is called before writing
    const fileName = _.kebabCase(this.props.name);
    const directoryName = this.directory || this.name;
    const destination = path.join('include', directoryName, `class-${fileName}-${this.name}.php`);

    this.fs.copyTpl(
      this.templatePath(`${this.name}/template.php`),
      this.destinationPath(destination),
      this.props
    );
  }

  updates({property}) {

    try {
      const ast = this.getFileAST();
      const classObject = ast.findClass(this.props.className);
      if (!classObject) {
        throw new Error(`The ${this.props.className} class does not exist.`);
      }

      const classProp = classObject.getProperty(property);
      if (!classProp) {
        throw new Error(`The ${property} array property was not found.`);
      }

      const childClass = `${this.props.childClassName}_${_.upperFirst(this.name)}`;
      const index = classProp.ast.value.items.findIndex(e => e.key.value === childClass);
      if( index > -1 ) {
        this.log(chalk.cyan('identical'), `class name ${childClass} inside ${property} array.`)
        return;
      }

      classProp.ast.value.items.push({
        kind: 'entry',
        key: {
          kind: 'string',
          value: childClass,
          isDoubleQuote: false
        },
        value: {
          kind: 'string',
          value: this.fileRelativePath,
          isDoubleQuote: false
        }
      });

      this.writeFileAST(ast.toString());
    } catch (e) {
      this.log(chalk.bold.red(e.toString()));
      this.warningMessage();
    } finally {
      this.end()
    }

  }

  // If the php file writing fails show to the user how to manually add the code
  warningMessage() {
    this.log(
      chalk.bold.yellow('You should manually add'),
      `include_once(${this.props.definePrefix}_INCLUDE_DIR . ${this.fileRelativePath}`,
      chalk.bold.yellow('to your plugin main class file.')
    );
  }

  end() {
    this.log('\nEverything', chalk.bold.green('was good'), 'see ya next my friend.\n');
  }

};
