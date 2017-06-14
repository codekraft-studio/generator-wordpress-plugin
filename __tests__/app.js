'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-wordpress-plugin:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({projectName: 'my-plugin'})
      .withOptions({
        'skip-welcome-message': true,
        'skip-message': true
      });
  });

  it('creates and move in a folder named like the projectName', () => {
    assert.equal(path.basename(process.cwd()), 'my-plugin');
  });

  it('creates a project configuration file', () => {
    assert.file('.yo-rc.json');
  });

  it('set the project variable in the configuration file', () => {
    assert.fileContent('.yo-rc.json', '"projectName": "my-plugin"');
    assert.fileContent('.yo-rc.json', '"projectTitle": "My Plugin"');
    assert.fileContent('.yo-rc.json', '"projectVersion": "0.0.1"');
    assert.fileContent('.yo-rc.json', '"className": "MyPlugin"');
  });
});
