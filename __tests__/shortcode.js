'use strict';

const _ = require('lodash');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const subGenerator = path.basename(__filename, '.js');

const mock = require('./mock.json');

describe('SubGenerator:shortcode', () => {
  let generator;
  beforeAll((done) => {
    // Run the generator
    generator = helpers.run(path.join(__dirname, `../generators/${subGenerator}`))
      .withArguments([mock.input])
      .withOptions({
        'filter': true,
        'enclosing': true
      });

    // Use mock values
    generator.on('ready', (generator) => {
      generator.config.set(mock.config);
      generator.config.save();
    }).on('end', done);
  });

  it('create class file in directory named like subgenerator', () => {
    assert.file([`include/${subGenerator}/class-test.php`]);
  });

  it('set the class name of the file as input plus subgenerator name', () => {
    assert.fileContent(`include/${subGenerator}/class-test.php`, `class ${mock.input}_${_.capitalize(subGenerator)}`);
  });

  it('enable the shortcode attributes filter', () => {
    assert.fileContent(`include/${subGenerator}/class-test.php`, "), $atts, 'test' );");
  });

  it('has the content argument for encapsulated shortcodes', () => {
    assert.fileContent(`include/${subGenerator}/class-test.php`, "($atts, $content = null)");
  });
});
