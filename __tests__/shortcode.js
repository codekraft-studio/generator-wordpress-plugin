const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const subGenerator = path.basename(__filename, '.js');

const mock = require('./mock.json');

describe('SubGenerator:shortcode', () => {
  let generator;
  let outputPath;

  beforeAll((done) => {
    generator = helpers.run(path.join(__dirname, `../generators/${subGenerator}`))
      .withArguments([mock.input])
      .withOptions({
        'filter': true,
        'enclosing': true
      });

    // Use mock values
    generator.on('ready', (generator) => {
      outputPath = `include/${subGenerator}/class-test-${generator.name}.php`;
      generator.config.set(mock.config);
      generator.config.save();
    }).on('end', done);
  });

  it('enable the shortcode attributes filter', () => {
    assert.fileContent(outputPath, "), $atts, 'test' );");
  });

  it('has the content argument for encapsulated shortcodes', () => {
    assert.fileContent(outputPath, "($atts, $content = null)");
  });
});
