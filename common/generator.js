'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const writer = require('php-writer');
const chalk = require('chalk');
const Generator = require('yeoman-generator');

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

module.exports = class WPGenerator extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.props = {};
    this.argument('name', {
      type: String,
      required: false
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
    this.sourceRoot(path.join(__dirname, '../generators/templates/'));

    // Name is an option that has been set inside the subgenerator class
    // in the configuring method that is called before writing
    const fileName = _.kebabCase(this.options.name);
    const directoryName = this.directory || this.name;
    const destination = path.join('include', directoryName, `class-${fileName}-${this.name}.php`);

    // TODO: Get the template from common source
    this.fs.copyTpl(
      this.templatePath(`${this.name}/template.php`),
      this.destinationPath(`include/${this.name}/class-${filename}.php`),
      this.props
    );
  }

  // If the php file writing fails show to the user how to manually add the code
  warningMessage() {
    this.log(
      chalk.bold.yellow('You should manually add'),
      `include_once(${this.props.definePrefix}_INCLUDE_DIR . '/${this.name}/class-${_.kebabCase(this.options.name)}.php');`,
      chalk.bold.yellow('to your plugin main class file.')
    );
  }

  end() {
    this.log('\nEverything', chalk.bold.green('was good'), 'see ya next my friend.\n');
  }

};
