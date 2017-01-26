var angular = require('angular');
require('angular-ui-router');
angular.module('blog', ['ui.router'])
    .controller('mainCtrl', require('./mainCtrl.js'));