'use strict';

const _ = require('lodash');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const subGenerator = path.basename(__filename, '.js');

const mock = require('./mock.json');

describe('SubGenerator:toolbar', () => {
  let generator;
  let outputPath;

  beforeAll((done) => {
    generator = helpers.run(path.join(__dirname, `../generators/${subGenerator}`))
      .withArguments([mock.input]);

    // Use mock values
    generator.on('ready', (generator) => {
      outputPath = `include/${subGenerator}/class-test-${generator.name}.php`;
      generator.config.set(mock.config);
      generator.config.save();
    }).on('end', done);
  });

  it('create class file in directory named like subgenerator', () => {
    assert.file([outputPath]);
  });

  it('set the class name of the file as input plus subgenerator name', () => {
    assert.fileContent(outputPath, `class ${mock.input}_${_.capitalize(subGenerator)}`);
  });

  it('set a protected property to hold main toolbar arguments', () => {
    assert.fileContent(outputPath, 'protected $toolbar');
  });

  it('has child menus enabled by default', () => {
    assert.equal(generator.generator.props.hasChild, true);
  });

  it('set a protected property to hold submenus arguments', () => {
    assert.fileContent(outputPath, 'protected $toolbarChildren');
  });

  it('create submenus array as per the childNumber property value', () => {
    assert.fileContent(outputPath, "'id' => 'test-submenu-0'");
    assert.fileContent(outputPath, "'parent' => 'test'");
  });
});
