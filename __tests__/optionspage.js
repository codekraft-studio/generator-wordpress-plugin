'use strict';

const _ = require('lodash');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const subGenerator = path.basename(__filename, '.js');

const mock = require('./mock.json');

describe('SubGenerator:optionspage', () => {
  let generator;
  let outputPath;

  beforeAll((done) => {
    generator = helpers.run(path.join(__dirname, `../generators/${subGenerator}`))
      .withPrompts({
        page_title: 'Test',
        menu_title: 'Test'
      })
      .withArguments([mock.input]);

    // Use mock values
    generator.on('ready', (generator) => {
      outputPath = `include/admin/pages/class-test-${generator.name}.php`;
      generator.config.set(mock.config);
      generator.config.save();
    }).on('end', done);
  });

  it('create class file in directory named like subgenerator', () => {
    assert.file([outputPath]);
  });

  it('set the class name of the file as input plus subgenerator name', () => {
    assert.fileContent(outputPath, `class ${mock.input}_Options_Page`);
  });
});
