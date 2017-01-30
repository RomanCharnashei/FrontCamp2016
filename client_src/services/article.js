module.exports = /*@ngInject*/ function($http) {
    this.list = function(tags){
        return $http.get('/articles', {params:{tags:tags}})
            .then(function(res){
                return res.data;
            });
    };

    this.one = function(id) {
        return $http.get('/article/' + id)
        .then(function(res){
            return res.data;
        });
    };
}
