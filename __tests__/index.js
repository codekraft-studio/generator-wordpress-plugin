const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const blackList = [
  'app',
  'templates',
  'command'
]

describe("Subgenerators Test", function() {

  const generatorsPath = path.resolve(__dirname, '../generators');
  const subgenerators = fs.readdirSync(generatorsPath).filter(name => {
    return fs.lstatSync(path.resolve(generatorsPath, name)).isDirectory()
  }).filter(name => blackList.includes(name) === false)

  for (var i = 0; i < subgenerators.length; i++) {
    const subgenerator = subgenerators[i]

    // Create subgenerator generic test
    describe(subgenerator, () => {
      let generator, outputPath;

      beforeAll((done) => {
        const generatorPath = path.join(generatorsPath, subgenerator);
        generator = helpers.run(generatorPath).withArguments(["Test"]);

        // Use mock parent values
        generator.on('ready', (generator) => {
          outputPath = `${generator.directory}/${generator.name}/class-test-${generator.name}.php`;
          generator.config.set({
            "projectName": "my-plugin",
            "projectVersion": "0.0.1",
            "projectAuthor": "codekraft-studio",
            "projectLicense": "Apache-2.0"
          });
          generator.config.save();
        }).on('end', done);
      });

      it('create class file in directory named like subgenerator', () => {
        assert.file([outputPath]);
      });

      it('set the class name of the file as input plus subgenerator name', () => {
        const className = _.startCase(subgenerator.replace(/page$/, '-page')).replace(' ', '_');
        assert.fileContent(outputPath, `class Test_${className}`);
      });
    });
  }

});
