const router = require('express').Router();
//const bookModule = require('../module/book.module');
const Contact = require('../model/contact.model');
const response = require('ybha-response');
const mongoose = require('mongoose');

router.get("/getAllContacts", (req, res, next) => {
    Contact.find()
        .select("firstName lastName subject topic email _id")
        .populate('firstName', 'subject')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                contacts: docs.map(doc => {
                    return {
                        _id: doc._id,
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                        subject: doc.subject,
                        topic: doc.topic,
                        email: doc.email,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/api/contact/getAllContacts" + doc._id
                        }
                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post("/contactAdd", (req, res, next) => {
    const newContact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        subject: req.body.subject,
        topic: req.body.topic,
        email: req.body.email,
    });
    newContact
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created contact successfully",
                createdProduct: {
                    firstName: result.firstName,
                    lastName: result.lastName,
                    subject: result.subject,
                    topic: result.topic,
                    email: result.email,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/api/contact/contactAdd" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
module.exports = router;