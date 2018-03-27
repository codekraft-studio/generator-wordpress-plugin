'use strict';

const _ = require('lodash');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const subGenerator = path.basename(__filename, '.js');

const mock = require('./mock.json');

describe('SubGenerator:menupage', () => {
  let generator;

  // Run the generator
  beforeAll((done) => {
    generator = helpers.run(path.join(__dirname, `../generators/${subGenerator}`))
      .withPrompts({
        page_title: 'Test',
        menu_title: 'Test'
      })
      .withArguments([mock.input]);

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
    assert.fileContent(`include/${subGenerator}/class-test.php`, `class ${mock.input}_Menu_Page`);
  });

  it('set the menu page properties with prompt values', () => {
    assert.fileContent(`include/${subGenerator}/class-test.php`, `add_menu_page`);
    assert.fileContent(`include/${subGenerator}/class-test.php`, `"Test"`);
    assert.fileContent(`include/${subGenerator}/class-test.php`, `"administrator"`);
    assert.fileContent(`include/${subGenerator}/class-test.php`, `"test"`);
  });

  it('set the default icon for administrator menu page', () => {
    assert.fileContent(`include/${subGenerator}/class-test.php`, `"dashicons-admin-generic"`);
  });

  it('set the default position at bottom', () => {
    assert.fileContent(`include/${subGenerator}/class-test.php`, `100`);
  });

});
