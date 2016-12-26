var Article = require('../models/article');
var User = require("../models/user");
var util = require('util');
var mongoose = require('mongoose');

module.exports = function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);

    if (articles.length) return next();
    let userId = mongoose.Types.ObjectId();
    let article = {
      _user: userId,
      pubDate: Date.now(),
      preview: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil qui, earum adipisci culpa consectetur hic necessitatibus tenetur quod itaque vel voluptatum at, recusandae rerum, quaerat sint dignissimos totam minima ipsam quibusdam. Quos dolorum, facere autem officia perferendis culpa. Iusto nemo vitae ullam sunt magni corporis eveniet, magnam, et culpa obcaecati.",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, sint ipsam, quae voluptatum cumque voluptates similique nostrum aut delectus nisi totam quisquam explicabo veniam? Porro dolores quo ipsam, optio doloremque nemo laudantium labore placeat iste reiciendis non, mollitia quaerat tempora dolorum id officia eos dolorem nesciunt ducimus debitis! Facere totam corrupti atque repudiandae eligendi, minima exercitationem debitis labore ad iste excepturi sapiente, ipsam aut laboriosam qui alias praesentium consectetur distinctio laborum nisi eaque veritatis ratione, vel. Voluptas id, a et debitis sit, impedit modi provident eveniet nostrum illo autem, perferendis tempore est, ex quis atque rerum dolore. Adipisci laboriosam mollitia quam, sint quis sequi optio nobis rerum culpa perferendis odio porro excepturi molestias et alias qui quibusdam, eveniet est aspernatur, voluptatum. Quibusdam minus saepe cum incidunt earum odio similique nisi provident nulla unde, ex laudantium rem modi nobis numquam, possimus deleniti quidem. Enim rem nulla, ab consequuntur dolor reprehenderit tempore recusandae. Sint veniam unde consequatur praesentium mollitia earum incidunt itaque nostrum laudantium excepturi a maxime perspiciatis repellat aperiam saepe tenetur, hic ea iste quod animi vitae. Ea, minima laboriosam sapiente possimus repellat, pariatur necessitatibus eaque nesciunt fugit. Quo cum consequatur molestias esse, corporis laborum quas, dolore, non rem, neque nam?"
    };

    Promise
      .all([
        new User({ _id: userId,
          name: 'Roman Charnashei',
          vk_id: '6477085',
          vk_profile: 'https://vk.com/id6477085',
          photo_uri: 'https://pp.vk.me/c417816/v417816784/834f/ahVINnRsns8.jpg',
          created: Date.now() 
        }).save()]),
        new Article(util._extend({tags: ['politics'], title: 'Politics'}, article)).save(),
        new Article(util._extend({tags: ['economy'], title: 'Economy'}, article)).save(),
        new Article(util._extend({tags: ['sports'], title: 'Sports'}, article)).save(),
        new Article(util._extend({tags: ['art'], title: 'Art'}, article)).save(),
        new Article(util._extend({tags: ['entertainment'], title: 'Entertainment'}, article)).save()       
      .then(function (results) {
        next();
      })
      .catch(next);
  });
};