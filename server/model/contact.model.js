const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    subject: String,
    topic: String,
    email: String,
});
let Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact
//User.collection.dropIndex(User.firstName);