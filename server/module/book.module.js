const bookModel = require("../model/book.model");
const dotenv = require('dotenv');

dotenv.config();

// Add a new book to DB
module.exports.bookAdd = (book) => {
    return new Promise((reject, resolve) => {
        let newBook = new Book(book);
        bookModel.collection.insertOne(newBook, function (err, docs) {
            if (docs) {
                resolve(docs.ops)
                console.log("Book inserted", docs.ops)
            } else {
                reject(err);
                return console.log("Book not inserted to Collection", err);
                //resolve(docs.ops)
                //console.log("Book inserted to Collection", docs.ops);
            }
        });
    });
}

//View all books
module.exports.getAllBooks = () => {
    return new Promise((resolve, reject) => {
        bookModel.find({}).then(bookSearched => {
            if (bookSearched != undefined && bookSearched != null) {
                resolve(bookSearched)
            } else {
                // No book in found in db!
                reject("No book were found in the db!")
            }
        })
    });
}

// module.exports.getAllBooks = () => {
//     return new Promise((resolve, reject) => {
//         bookModel.find({}).limit(1).then(bookSearched => {
//             if (bookSearched != undefined && bookSearched != null) {
//                 resolve(bookSearched)
//             } else {
//                 // No book in found in db!
//                 reject("No book were found in the db!")
//             }
//         })
//     });
// }
/*****
 * https: //medium.com/geekculture/creating-a-backend-for-crud-application-with-nodejs-expressjs-and-mongodb-part-2-of-2-d997d94dcbd2
 */