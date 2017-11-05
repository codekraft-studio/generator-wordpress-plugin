'use strict';

const _ = require('lodash');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const subGenerator = path.basename(__filename, '.js');

const nameInput = 'Test';

const vars = {
  "projectName": "my-plugin",
  "projectVersion": "0.0.1",
  "projectAuthor": "codekraft-studio",
  "projectVersion": "0.0.1",
  "projectLicense": "Apache-2.0"
};

describe('SubGenerator:widget', () => {
  let generator;
  beforeAll((done) => {
    // Run the generator
    generator = helpers.run(path.join(__dirname, `../generators/${subGenerator}`))
      .withPrompts({ description: 'The widget test.' })
      .withArguments([nameInput]);

    // Use mock values
    generator.on('ready', (generator) => {
      generator.config.set(vars);
      generator.config.save();
    }).on('end', done);
  });

  // Default stuff that happen always
  describe('default subgenerator tests', () => {
    it('create subgenerator class file in directory named like subgenerator', () => {
      assert.file([`include/${subGenerator}/class-test.php`]);
    });

    it('set the class name of the file as input plus subgenerator name', () => {
      assert.fileContent(`include/${subGenerator}/class-test.php`, `class ${nameInput}_${_.capitalize(subGenerator)}`);
    });
  });

  it('set the widget description as per prompt value', () => {
    assert.fileContent(`include/${subGenerator}/class-test.php`, `'description' => esc_html__( 'The widget test.', '${vars.projectName}' )`);
  });
});
