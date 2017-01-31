var template = require('./index.html');

module.exports = {
    template: template,

    bindings: {
        article: '<'
    },

    controller: /*@ngInject*/ function(articleSvc){
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
            articleSvc.save(this.article)
            .then(this.goBack);
        }

        this.delete = function(){
            articleSvc.delete(this.article._id)
            .then(this.goBack);
        }
    }
};