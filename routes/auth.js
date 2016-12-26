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
        res.redirect('/');
      });

  router.route('/signout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/');
    });

  return router;
}
