const mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    quantity: Number,
    bookImage: String,
    createdAt: Date,
});

let Book = mongoose.model('Book', bookSchema);
module.exports = Book