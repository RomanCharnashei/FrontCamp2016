var angular = require('angular');

angular.module('blog', ['ui.router'])
    .config(require('./config'))
    .component('priviewArticles', require('./priview-articles'))
    .component('priviewArticle', require('./priview-article'))
    .component('priviewUser', require('./priview-user'))
    .component('article', require('./article'))
    .service('articleSvc', require('./services/article'));

angular.element(function() {
    angular.bootstrap(document, ['blog']);
});