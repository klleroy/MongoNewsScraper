const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: false,
        unique: false
    },
    byline: {
        type: String,
        required: false,
        unique: false
    },
    isSaved: {
        type: Boolean,
        default: false,
        required: false,
        unique: false
    },
    notes: {
        type: [{
            type: Schema.Types.ObjectId, ref: 'Notes'
        }]
    }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;