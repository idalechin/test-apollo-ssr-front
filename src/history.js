import canUseDom from 'can-use-dom'

if (canUseDom) {
  module.exports = require('./history/browser');
} else {
  module.exports = require('./history/server');
}
