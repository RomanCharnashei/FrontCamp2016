var config = require('../config');
module.exports = function (passport, AuthVKStrategy, User) {
    passport.use('vk', new AuthVKStrategy({
            clientID: config.VK_CLIENT_ID,
            clientSecret: config.VK_CLIENT_SECRET,
            callbackURL: config.PASSPORT_CB_URI
        },
        function (accessToken, refreshToken, params, profile, done) {

            User.findOne({vk_id: profile.id})
            .then(function(user){
                var _user = user || new User({created: Date.now()});
                _user.vk_id = profile.id;
                _user.name = profile.displayName;
                _user.photo_uri = profile.photos[0].value;
                _user.vk_profile = profile.profileUrl;
                return _user.save();                
            })
            .then(function(user){
                done(null, user); 
            })
            .catch(done)
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });


    passport.deserializeUser(function (id, done) {
        User.findById(id)
        .then(function (user) { 
            done(null, user); 
        })
        .catch(done);
    });
};