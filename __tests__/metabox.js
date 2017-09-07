'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs');

describe('generator-wordpress-plugin:metabox', () => {

  describe('with a existing project', () => {

    beforeAll((done) => {
      let vars = {
        "projectName": "my-plugin",
        "projectVersion": "0.0.1",
        "projectAuthor": "codekraft-studio",
        "projectVersion": "0.0.1",
        "projectLicense": "Apache-2.0"
      };

      let generator = helpers.run(path.join(__dirname, '../generators/metabox'))
        .withArguments(['Test']);

      generator.on('ready', (generator) => {
        generator.config.set(vars);
        generator.config.save();
      });

      generator.on('end', done);

    });

    it('creates files', () => {
      assert.file(['include/metabox/class-test.php']);
    });

    it('should have the correct class name', () => {
      assert.fileContent('include/metabox/class-test.php', 'class Test_Metabox');
    });

  });

});
