var express = require('express');
var findHashtags = require('find-hashtags');

module.exports = function(Article) {
  var router = express.Router();
  router.param('articleId', (req, res, next, articleId) => {
    Article
    .findOne({_id: articleId})
    .populate('_user')  
    .then(function(article){
      if(!article) throw new Error("Article not found.");
      req.article = article;
      next();
    })
    .catch(next);
  });

  router.get('/create', function(req, res) {
    res.render('create', res.model);
  });

  router.post('/', function(req, res){
    var article =  new Article();
    article.title = req.body.title;
    article.content = req.body.content;
    article.preview = req.body.preview;
    article._user = req.user._id;
    article.tags = findHashtags(req.body.tags);
    article.pubDate = Date.now();
    article.save()
    .then(function(){
      res.redirect(`/articles?userId=${req.user._id}`);
    })
    .catch(function(err){
      res.model.article = article;
      res.render('create', res.model);
    });    
  });

  router.get('/:articleId/edit', function(req, res){
    req.article.tags = req.article.tagsToView();
    res.model.article = req.article;    
    res.render('edit', res.model);
  });

  router.route('/:articleId') 
    .get(function(req, res) {
        res.model.article = req.article;
        res.render('article', res.model);
    })
    .put(function(req, res, next) {
        if(!req.article._user.equals(req.user)) {
          return next(new Error("You have no permitions"));
        }
        req.article.title = req.body.title;
        req.article.content = req.body.content;
        req.article.preview = req.body.preview;
        req.article.tags = findHashtags(req.body.tags);
        req.article.save()
        .then(function() {
          res.redirect('/');
        })
        .catch(next);
    })
    .delete(function(req, res, next) {
        if(!req.article._user.equals(req.user)) {
          return next(new Error("You have no permitions"));
        }
        req.article.remove()
        .then(function() {
          res.redirect('/');
        })
        .catch(next); 
    })

  return router;
};
