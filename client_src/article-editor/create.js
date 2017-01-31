var template = require('./index.html');

module.exports = {
    template: template,

    bindings: {

    },

    controller: /*@ngInject*/ function(articleSvc){
        this.article = {};

        this.showError = function(ngModelController, error) {
            return ngModelController.$error[error];
        }

        this.canSave = function() {
            return this.articleForm.$dirty && this.articleForm.$valid;
        }

        this.goBack = function() {
            window.history.back();
        }

        this.submit = function() {
            articleSvc.create(this.article)
            .then(this.goBack);
        }
    }
};