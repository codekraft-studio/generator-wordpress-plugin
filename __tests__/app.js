'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const prompts = {
  projectName: 'my-plugin',
  projectTitle: 'My Plugin',
  projectVersion: '1.0.0'
};

describe('Generator:app', () => {
  // Default generator execution
  describe('default options', () => {
    beforeAll(() => helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts(prompts));

    it('creates and move in a folder named like the projectName', () => {
      assert.equal(path.basename(process.cwd()), 'my-plugin');
    });

    it('creates a project configuration file', () => {
      assert.file('.yo-rc.json');
    });

    it('creates the main plugin class file', () => {
      assert.file('include/class-main.php');
    });

    it('creates the plugin readme file', () => {
      assert.file('readme.txt');
    });

    it('copy the plugin template dot files', (done) => {
      fs.readdir(path.join(__dirname, '../generators/app/templates/plugin'), (err, files) => {
        expect(err).toBeNull();
        files.forEach(f => {
          if (f.startsWith('.')) {
            assert.file(f);
          }
        })
        done();
      });
    });

    it('copy the assets source files', () => {
      assert.file([
        'assets/src/scss/user.scss',
        'assets/src/scss/admin.scss',
        'assets/src/js/admin/admin.js',
        'assets/src/js/user/user.js'
      ]);
    });

    it('set the project details in the configuration file', () => {
      assert.fileContent('.yo-rc.json', `"projectName": "${prompts.projectName}"`);
      assert.fileContent('.yo-rc.json', `"projectTitle": "${prompts.projectTitle}"`);
      assert.fileContent('.yo-rc.json', `"projectVersion": "${prompts.projectVersion}"`);
    });

    it('set the assets path', () => {
      assert.fileContent('include/class-main.php', `/assets/dist/user.css`);
      assert.fileContent('include/class-main.php', `/assets/dist/user.js`);
      assert.fileContent('include/class-main.php', `/assets/dist/admin.css`);
      assert.fileContent('include/class-main.php', `/assets/dist/admin.js`);
    });
  });

  // Custom prompts and options
  describe('custom options: no project manager', () => {
    let cPrompts = Object.assign({}, prompts, { projectManager: false });

    // Run the generator
    beforeAll(() => helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts(cPrompts));

    it('wont create the project package file', () => {
      assert.noFile('package.json');
    });

    it('copy the assets without src dir', () => {
      assert.file([
        'assets/dist/user.css',
        'assets/dist/admin.css',
        'assets/dist/admin.js',
        'assets/dist/user.js'
      ]);
    });

    it('set the assets path', () => {
      assert.fileContent('include/class-main.php', `/assets/dist/user.css`);
      assert.fileContent('include/class-main.php', `/assets/dist/admin.css`);
      assert.fileContent('include/class-main.php', `/assets/dist/user.js`);
      assert.fileContent('include/class-main.php', `/assets/dist/admin.js`);
    });
  });

  // Using custom command line flags
  describe('custom flags', () => {
    it('disable git package with --no-git', (done) => {
      let tmpDirectory;
      helpers.run(path.join(__dirname, '../generators/app'))
        .inTmpDir(dir => { tmpDirectory = dir; })
        .withPrompts(prompts)
        .withOptions({
          'git': false
        })
        .then(() => {
          fs.stat(path.join(tmpDirectory, '.git'), (err) => {
            expect(err).toBeDefined();
            expect(err).toBeTruthy();
            done();
          });
        });
    });
  });
});
