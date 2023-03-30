'use strict';

module.exports = {
  name: require('./package').name,
  included() {
    let app = this._findHost();
    if (app.__emberPowerSelectIncludedInvoked) {
      this._super.included.apply(this, arguments);
      return;
    }
    app.__emberPowerSelectIncludedInvoked = true;
  },
};
