const assert = require('yeoman-assert');
const utils = require('../common/utils');

describe('SubGenerator:app', () => {

  it('validate a required input', () => {
    assert.equal( utils.validateRequired('test-plugin'), true );
    assert.equal( utils.validateRequired(''), 'This field is required, please enter a valid value.' );
  });

  it('validate WordPress slug like input', () => {
    assert.equal( utils.validateSlug('test-plugin'), true );
    assert.equal( utils.validateSlug('Test Plugin'), 'You should follow the WordPress plugin name standard.' );
    assert.equal( utils.validateSlug('test_plugin'), 'You should follow the WordPress plugin name standard.' );
  });

  it('validate the project version number with semver standards', () => {
    assert.equal( utils.validateVersion('0.0.1'), true );
    assert.equal( utils.validateVersion('0.0.1-alpha'), true );
    assert.equal( utils.validateVersion('t.051-84.31'), 'You should enter a valid version.' );
  });

  it('validate a input as a number', () => {
    assert.equal( utils.validateNumber(12), true );
    assert.equal( utils.validateNumber('12'), true );
    assert.equal( utils.validateNumber('not-number'), 'You must enter a valid number.' );
  });

});
