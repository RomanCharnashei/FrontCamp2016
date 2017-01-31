var express = require('express');

module.exports = function (passport) {
  var router = express.Router();
  
  router.route('/vk')
    .get(passport.authenticate('vk'));

  router.route('/vk/callback')
    .get(passport.authenticate('vk', {
      failureRedirect: '/login'
    }),
      function(req, res){
        if(req.is_json) {
          res.json({msg: 'User has successfully signin'});
        } else {
          res.redirect('/');
        }
      });

  router.route('/signout')
    .delete(function(req, res) {
      req.logout();
      if(req.is_json) {
        res.json({msg: 'User has successfully signout'});
      } else {
        res.redirect('/');
      }      
    });

  router.route('/me')
    .get(function(req, res) {
      res.json({user: req.user});
    });

  return router;
}
