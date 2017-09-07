'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const prompts = {
  projectName: 'my-plugin',
  projectTitle: 'My Plugin',
  projectVersion: '1.0.0'
};

describe('generator-wordpress-plugin:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts(prompts)
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

  it('set the project details in the configuration file', () => {
    assert.fileContent('.yo-rc.json', `"projectName": "${prompts.projectName}"`);
    assert.fileContent('.yo-rc.json', `"projectTitle": "${prompts.projectTitle}"`);
    assert.fileContent('.yo-rc.json', `"projectVersion": "${prompts.projectVersion}"`);
  });
});
