// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create new Schema
const CommentSchema = new Schema ({
     name: {
          type: String
     },
     body: {
          type: String,
          required: true
     }
});

module.exports = mongoose.model('Comment', CommentSchema);
// module.exports = Comment;