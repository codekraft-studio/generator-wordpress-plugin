'use strict';

const _ = require('lodash');

module.exports = {
  validateRequired(input) {
    if (input === '') {
      return 'This field is required, please enter a valid value.';
    }
    return true;
  },
  validateSlug(input) {
    if (!/^(?:[a-z]+-?[a-z]+)+$/g.test(input)) {
      return 'You should follow the WordPress plugin name standard.';
    }
    return true;
  },
  validateVersion(input) {
    if (!/[0-9]{1}\.([0-9]{1})\.([0-9]{1})/.test(input)) {
      return 'You should enter a valid version.';
    }
    return true;
  },
  validateNumber(input) {
    return isNaN(input) ? 'You must enter a valid number.' : true;
  }
};
