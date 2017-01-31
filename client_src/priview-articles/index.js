var template = require('./index.html');

module.exports = {
    template: template,

    bindings: {
        articles: '<'
    },

    controller: /*@ngInject*/ function(userProfile) {
        this.userProfile = userProfile.get();
    }
};