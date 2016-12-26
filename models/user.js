var mongoose = require('mongoose');
var schema = mongoose.Schema({
    name: String,
    vk_id: String,
    vk_profile: String,
    photo_uri: String,
    created: Date,

});
module.exports = mongoose.model('User', schema);