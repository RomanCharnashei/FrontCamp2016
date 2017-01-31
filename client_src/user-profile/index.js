var template = require('./index.html');

module.exports = {
    template: template,
    
    bindings: {

    },

    controller: /*@ngInject*/ function(userProfile){
        this.userProfile = userProfile.get();
        this.signout = userProfile.signout;
        this.signin = userProfile.signin;
    }
};
