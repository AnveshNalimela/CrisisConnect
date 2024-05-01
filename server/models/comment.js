const mongoose = require('mongoose');

// Define the schema for the Comment collection
const commentSchema = new mongoose.Schema({
    disasterId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create a model from the schema
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
