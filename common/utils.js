'use strict';

const _ = require('lodash');

function validateRequired(input) {
  if (input === '') {
    return 'This field is required, please enter a valid value.';
  }
  return true;
}

module.exports = {
  toClassName(input) {
    return _.snakeCase(input).replace(
      /[a-zA-Z]+/g,
      t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
    )
  },
  validateRequired: validateRequired,
  validateSlug(input) {
    const req = validateRequired(input)
    if (req !== true) {
      return req
    }
    if (!/^(?:[a-z]+-?[a-z]+)+$/g.test(input)) {
      return 'You should follow the WordPress plugin name standard.';
    }
    return true;
  },
  validateVersion(input) {
    const req = validateRequired(input)
    if (req !== true) {
      return req
    }
    if (!/[0-9]{1}\.([0-9]{1})\.([0-9]{1})/.test(input)) {
      return 'You should enter a valid version.';
    }
    return true;
  },
  validateNumber(input) {
    return isNaN(input) ? 'You must enter a valid number.' : true;
  }
};
