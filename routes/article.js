var express = require('express');
var findHashtags = require('find-hashtags');
var referrer = require('../middlewares/referrer_handler');
var check_permissions = require('../middlewares/check_permissions');

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

  router.get('/create', referrer.save_referrer, function(req, res) {
    if(req.is_json) {
      return res.json(req.article);
    }
    res.model.referrer = referrer.get_referrer(req);
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
    .then(function(article){
      if(req.is_json) {
        return res.status(201).json(article);
      }
      referrer.go_to_referrer(req, res);
    })
    .catch(function(err){
      if(req.is_json) {
        return res.status(500).send(err.message);
      }
      article.tags = article.tagsToView();
      res.model.article = article;
      res.model.msgs = ['Something went wrong'];
      res.model.referrer = referrer.get_referrer(req);
      res.render('create', res.model);
    });    
  });

  router.get('/:articleId/edit', referrer.save_referrer, function(req, res){
    req.session.referer = req.header('Referer') || '/';
    req.article.tags = req.article.tagsToView();
    res.model.article = req.article;
    res.model.referrer = referrer.get_referrer(req);
    res.render('edit', res.model);
  });

  router.route('/:articleId') 
    .get(referrer.save_referrer, function(req, res) {
        if(req.is_json) {
          return res.json(req.article);
        }
        res.model.article = req.article;
        res.model.referrer = referrer.get_referrer(req);
        res.render('article', res.model);
    })
    .put(check_permissions, function(req, res, next) {
        req.article.title = req.body.title;
        req.article.content = req.body.content;
        req.article.preview = req.body.preview;
        req.article.tags = findHashtags(req.body.tags);
        req.article.save()
        .then(function(article) {
          if(req.is_json) {
            return res.status(201).json(article);
          }
          referrer.go_to_referrer(req, res);
        })
        .catch(function(err) {
          if(req.is_json) {
            return res.status(500).send(err.message);
          }
          req.article.tags = article.tagsToView();
          res.model.article = req.article;
          res.model.msgs = ['Something went wrong'];
          res.model.referrer = referrer.get_referrer(req);
          res.render('edit', res.model);
        });
    })
    .delete(check_permissions, function(req, res, next) {
        req.article.remove()
        .then(function(data) {
          if(req.is_json) {
            return res.status(200).json({data: data});
          }
          referrer.go_to_referrer(req, res);
        })
        .catch(function(err){
          if(req.is_json) {
            return res.status(500).send(err.message);
          }
          referrer.go_to_referrer(req, res);
        }); 
    })

  return router;
};
