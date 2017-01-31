module.exports = /*@ngInject*/ function($http) {
    var profile = {
        user: null
    };

    this.get = function(){
        return profile;
    };

    this.signin = function(){
        return $http.get('auth/vk')
            .then(function(){
                return this.fetch();
            });
    }

    this.signout = function(){
        $http.get('auth/signout')
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
