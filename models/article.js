var mongoose = require('mongoose');
    Schema = mongoose.Schema,
    schema = Schema({
        title: {type: String},
        preview: {type: String},
        content: {type: String},
        pubDate: {type: Date},
        tags: {type: [String]},
        _user: {type: Schema.Types.ObjectId, ref: 'User'}
    });

schema.methods.tagsToView = function() {
    return this.tags.map(function(item) {
        return `#${item}`;
    });
}
module.exports = mongoose.model('Article', schema);