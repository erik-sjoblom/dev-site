
require('../../../.templateCache/partials.js');

(function() {
  'use strict';
  
  angular
    .module('myApp', [
      require('angular-route'),
      'htmlPartials'
    ]);
  
})();

require('./router.js');
require('./global-content/header.js');
require('./global-content/footer.js');
require('./functional-components/top-link-button.js');

