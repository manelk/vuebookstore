const router = require('express').Router();
const bookModule = require('../module/book.module');
const Book = require('../model/book.model');
const response = require('ybha-response');
const multer = require('multer')
const mongoose = require('mongoose');
const moment = require("moment");
moment().format();



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file?
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post("/bookAdd", /*upload.single('bookImage'),*/ (req, res, next) => {
    console.log("##########", req.body)
    const newBook = new Book({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        author: req.body.author,
        price: req.body.price,
        quantity: req.body.quantity,
        bookImage: req.body.bookImage,
        createdAt: moment()
    });
    newBook
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created book successfully",
                createdProduct: {
                    name: result.name,
                    author: result.author,
                    price: result.price,
                    quantity: result.quantity,
                    createdAt: moment(),
                    //  bookImage: result.bookImage,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/api/book/bookAdd/" + result._id
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


// Edit book by given ID
router.post('/updateBook/:idBook', (req, res) => {
    idBook = req.params.idBook;
    Book.findByIdAndUpdate(req.params.idBook, req.body, {
        useFindAndModify: false
    }, function (err, data) {
        if (err) {
            response.badRequest(res, err);
            //console.log(err, "err");
        } else {
            response.json(res, data)
            //console.log("Data updated!", data);
        }
    });
});

// Delete book
router.delete('/deleteBook/:idBook', (req, res) => {
    idBook = req.params.idBook;
    Book.findByIdAndDelete(idBook, function (err, docs) {
        if (err) {
            response.badRequest(res, err);
        } else {
            res.status(201).json({
                message: "Deleted successfully",
                deletedBook: docs
            });

        }
    });
});

// Get all books from DB
router.get('/getAllBooks', (req, res) => {
    bookModule.getAllBooks().then(data => {
        response.json(res, data)
    }).catch(err => {
        //console.log("err", err)
        response.badRequest(res, err);
    })
});
module.exports = router;