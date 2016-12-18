var mongoose = require('mongoose');
var schema = mongoose.Schema({
    title: String,
    preview: String,
    content: String
});
module.exports = mongoose.model('Article', schema);