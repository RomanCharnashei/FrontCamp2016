require('angular-ui-router');

module.exports = /*@ngInject*/ function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            component: 'priviewArticles',
            resolve: {
                articles: /*@ngInject*/ function(articleSvc){
                    return articleSvc.list();
                }
            }
        })
        .state('articles', {
            url: '/articles?tags',
            component: 'priviewArticles',
            resolve: {
                articles: /*@ngInject*/ function(articleSvc, $stateParams) {
                    return articleSvc.list($stateParams.tags);
                }
            }
        })
        .state('article', {
            url: '/article/:id',
            component: 'article',
            resolve: {
                article: /*@ngInject*/ function(articleSvc, $stateParams) {
                    return articleSvc.one($stateParams.id);
                },
                previousSate: /*@ngInject*/ function($q, $state) {
                    console.log('State: ', $state.previous);
                    return $q.when($state.previous);
                }
            }
        });

        $urlRouterProvider.otherwise('/');
}
