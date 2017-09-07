'use strict';

const _ = require('lodash');
const enabledProjectManagers = [
  'grunt',
  'gulp'
];

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
  validateProjectManager(input) {
    if (enabledProjectManagers.indexOf(input) === -1) {
      return 'You must use grunt or gulp.';
    }
    return true;
  },
  validateVersion(input) {
    if (!/[0-9]{1}\.([0-9]{1})\.([0-9]{1})/.test(input)) {
      return 'You should enter a valid version.';
    }
    return true;
  }
};
