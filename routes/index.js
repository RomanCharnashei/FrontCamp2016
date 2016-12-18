var express = require('express');

module.exports = function(Article) {
  var router = express.Router();
  router.route('/')  
    .get(function(req, res){
      Article.find({}, function(err, articles) {
        if(err) return console.error(err);
        res.render('index', {articles: articles});
      });      
    });

  return router;  
};
