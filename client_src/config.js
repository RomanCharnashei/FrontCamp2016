require('angular-ui-router');

module.exports = /*@ngInject*/ function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            component: 'priviewArticles',
            resolve: {
                articles: /*@ngInject*/ function(articleSvc, $q){

                    //#if isNotTesting
                        return articleSvc.list();
                    //#else
                        return $q.when([]);                
                    //#endif
                    
                }
            }
        })
        .state('articles', {
            url: '/articles?tags&userId',
            component: 'priviewArticles',
            resolve: {
                articles: /*@ngInject*/ function(articleSvc, $stateParams) {
                    return articleSvc.list($stateParams);
                }
            }
        })
        .state('article', {
            url: '/article/:id',
            component: 'article',
            resolve: {
                article: /*@ngInject*/ function(articleSvc, $stateParams) {
                    return articleSvc.one($stateParams.id);
                }
            }
        })
        .state('createArticle', {
            url: '/article/create',
            component: 'articleCreator'
        })
        .state('editArticle', {
            url: '/article/:id',
            component: 'articleEditor',
            resolve: {
                article: /*@ngInject*/ function(articleSvc, $stateParams) {
                    return articleSvc.one($stateParams.id);
                }
            }
        });

        $urlRouterProvider.otherwise('/');
}
