var Article = require('./article.js');
module.exports = function(req, res, next) {
  Article.find(function(err, articles){
    if(err) return console.error(err);
    if(articles.length) return;
    var article = {
        title: "Lorem ipsum dolor.",
        preview: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil qui, earum adipisci culpa consectetur hic necessitatibus tenetur quod itaque vel voluptatum at, recusandae rerum, quaerat sint dignissimos totam minima ipsam quibusdam. Quos dolorum, facere autem officia perferendis culpa. Iusto nemo vitae ullam sunt magni corporis eveniet, magnam, et culpa obcaecati.",
        content: ""
    };

    new Article(article).save();
    new Article(article).save();
    new Article(article).save();
    new Article(article).save();
    new Article(article).save();
  });
}