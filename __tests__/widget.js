'use strict';

const _ = require('lodash');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const subGenerator = path.basename(__filename, '.js');

const mock = require('./mock.json');

describe('SubGenerator:widget', () => {
  let generator;
  let outputPath;
  
  beforeAll((done) => {
    generator = helpers.run(path.join(__dirname, `../generators/${subGenerator}`))
      .withPrompts({ description: 'The widget test.' })
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

  it('set the widget description as per prompt value', () => {
    assert.fileContent(outputPath, `'description' => esc_html__( 'The widget test.', '${mock.config.projectName}' )`);
  });
});
