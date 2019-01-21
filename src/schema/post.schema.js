/*
* Schema for Post
* v1.0
*  2018-11-1
@C 2018, Prakash Rai
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({ 
    title: { type: String, unique : [true, 'The title already exists'], required : [true, 'Title is required']},
    author: { type: String,  required : [true, 'Author is required']},
    tags: [String],
    post: { type: String,  required : [true, 'Post is required']},
    views: { type: Number, default: 0},
    comments: JSON,
    createdDateTime: {type: Date, required: [true, 'CreatedDate is required']},
    modifiedDateTime: { type: Date,  required : [true, 'Modified is required']}
});

module.exports = mongoose.model('Posts', postSchema);

