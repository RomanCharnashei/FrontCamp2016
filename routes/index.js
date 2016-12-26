var express = require('express');

module.exports = function(Article) {
  var router = express.Router();
  router.route('/')  
    .get(function(req, res, next){
      Article.find({})
      .populate('_user')
      .then(function(articles){
        res.model.articles = articles;
        res.render('index', res.model);
      })
      .catch(next);
    });

  return router;  
};
