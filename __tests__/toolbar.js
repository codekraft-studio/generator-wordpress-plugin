'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const writer = require('php-writer');

const nameInput = 'Test';

describe('SubGenerator:toolbar', () => {
  describe('with a existing project', () => {

    let generator;

    beforeAll((done) => {
      const vars = {
        "projectName": "my-plugin",
        "projectVersion": "0.0.1",
        "projectAuthor": "codekraft-studio",
        "projectVersion": "0.0.1",
        "projectLicense": "Apache-2.0"
      };

      generator = helpers.run(path.join(__dirname, '../generators/toolbar'))
        .withArguments([nameInput])
        .withOptions({
          'filter': true,
          'enclosing': true
        });

      generator.on('ready', (generator) => {
        generator.config.set(vars);
        generator.config.save();
      });

      generator.on('end', done);
    });

    it('creates the toolbar class file', () => {
      assert.file(['include/toolbar/class-test.php']);
    });

    it('use the upper camel case class name based on input', () => {
      assert.fileContent('include/toolbar/class-test.php', `class ${nameInput}_Toolbar`);
    });

    it('set a protected property to hold main toolbar arguments', () => {
      assert.fileContent('include/toolbar/class-test.php', 'protected $toolbar');
    });

    it('has child menus enabled by default', () => {
      assert.equal(generator.generator.props.hasChild, true);
    });

    it('set a protected property to hold submenus arguments', () => {
      assert.fileContent('include/toolbar/class-test.php', 'protected $toolbarChildren');
    });

    it('create submenus array as per the childNumber property value', () => {
      assert.fileContent('include/toolbar/class-test.php', "'id' => 'test-submenu-0'");
      assert.fileContent('include/toolbar/class-test.php', "'parent' => 'test'");
    });
  });
});
