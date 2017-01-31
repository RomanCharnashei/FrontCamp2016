var template = require('./index.html');

module.exports = {
    template: template,

    bindings: {
        article: '<',
        userProfile: '<'
    },

    controller: function(){
        this.IamAuthor = function(){
            return this.userProfile.user && this.article._user._id == this.userProfile.user._id;
        }        
    }
};
