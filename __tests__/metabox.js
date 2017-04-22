'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-wp-plugin:metabox', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/metabox'))
      .withPrompts({name: 'Test'});
  });

  it('creates files', () => {
    assert.file(['include/widgets/class-test.php']);
  });

  it('should have the correct class name', () => {
    assert.fileContent('include/widgets/class-test.php', '/class Test_Widget extends WP_Widget/');
  });
});
