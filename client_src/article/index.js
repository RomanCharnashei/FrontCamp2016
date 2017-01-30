var template = require('./index.html');

module.exports = {
    template: template,
    
    bindings: {
        article: '<',
        previousSate: '<'
    },

    controller: function(){
        this.goBack = function() {
            window.history.back();
        }
    }
};
