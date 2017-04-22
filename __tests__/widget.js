'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-wp-plugin:widget', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/widget'))
      .withPrompts({name: 'Test'});
  });

  it('creates files', () => {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
