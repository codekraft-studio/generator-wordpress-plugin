'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');

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
      assert.file(['include/metaboxes/class-test.php']);
    });

    it('should have the correct class name', () => {
      assert.fileContent('include/metaboxes/class-test.php', 'class Test_Metabox');
    });

  });

});
