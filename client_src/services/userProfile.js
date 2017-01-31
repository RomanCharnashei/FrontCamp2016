module.exports = /*@ngInject*/ function($http, $window) {
    var profile = {
        user: null
    };

    this.get = function(){
        return profile;
    };

    this.signin = function(){
         $window.open('auth/vk');
    }

    this.signout = function(){
        $http.delete('auth/signout')
        .then(function(){
            profile.user = null;
        });
    }

    this.fetch = function(){
        return $http.get('/auth/me')
            .then(function(res){
                profile.user = res.data.user;
            });
    };
}
