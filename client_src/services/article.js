module.exports = /*@ngInject*/ function($http) {
    this.list = function(stateParams){
        return $http.get('/articles', {params:stateParams})
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

    this.create = function(article) {
        return $http.post('/article', article);
    };

    this.save = function(article) {
        return $http.put('/article/' + article._id, article);
    };

    this.delete = function(id){
        return $http.delete('/article/' + id);
    };
}
