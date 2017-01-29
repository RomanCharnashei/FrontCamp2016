module.exports = /*@ngInject*/ function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/views/priview_list/index.html',
            controller: 'priviewListCtrl'
        });

        $urlRouterProvider.otherwise('/');
}
