var express = require('express');

module.exports = function(Article) {
    var router = express.Router();
    router.get('*', function(req, res, next){
        var query = Article.find({}).select({title: 1, preview: 1, pubDate: 1, _user: 1});
        if(req.query.userId) {
            query = query.where('_user').equals(req.query.userId);
        }
        if(req.query.tags) {
            let tags = Array.isArray(req.query.tags) ? req.query.tags : [req.query.tags];
            query = query.where('tags').in([tags]);
        }
        query.populate('_user');
        query.then(function(articles) {
            res.model.articles = articles;
            res.render('index', res.model);
        })
        .catch(next);
    });

    return router;
};
