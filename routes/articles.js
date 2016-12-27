var express = require('express');
var referrer = require('../middlewares/referrer_handler');

module.exports = function(Article) {
    var router = express.Router();
    router.get('*', referrer.save_referrer, function(req, res, next){
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
            if(req.is_json) {
                return res.json(articles);
            }
            res.model.articles = articles;
            res.model.referrer = referrer.get_referrer(req);
            res.render('index', res.model);
        })
        .catch(function(err){
            if(req.is_json) {
                return res.status(500).send(err.message);
            }
            next(err);
        });
    });

    return router;
};
