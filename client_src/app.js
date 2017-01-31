var angular = require('angular');

angular.module('blog', ['ui.router'])
    .config(require('./config'))
    .component('priviewArticles', require('./priview-articles'))
    .component('priviewArticle', require('./priview-article'))
    .component('priviewUser', require('./priview-user'))
    .component('article', require('./article'))
    .component('userProfile', require('./user-profile'))
    .component('articleCreator', require('./article-editor/create'))
    .component('articleEditor', require('./article-editor/edit'))
    .service('articleSvc', require('./services/article'))
    .service('userProfile', require('./services/userProfile'))
    .directive('blogLength', require('./directives/bloglength'))
    .run(/*@ngInject*/function(userProfile){
        userProfile.fetch();
    });

angular.element(function() {
    angular.bootstrap(document, ['blog']);
});