var template = require('./index.html');

module.exports = {
    template: template,
    
    bindings: {
        article: '<'
    },

    controller: /*@ngInject*/ function(userProfile){
        this.userProfile = userProfile.get();
        
        this.goBack = function() {
            window.history.back();
        }

        this.IamAuthor = function(){
            return this.userProfile.user && this.article._user._id == this.userProfile.user._id;
        }
    }
};
