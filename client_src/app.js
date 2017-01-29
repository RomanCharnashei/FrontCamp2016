var angular = require('angular');

angular.module('blog', [require('angular-ui-router')])
    .config(require('./config'))
    .controller('priviewListCtrl', require('./priview_list/ctrl'));

angular.element(function() {
    angular.bootstrap(document, ['blog']);
});