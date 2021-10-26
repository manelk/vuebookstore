const cors = require('cors');
const express = require('express');
const app = express();
//var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Register our router book in index.js
const bookRoutes = require('./routes/book.router')
const authRoutes = require('./routes/auth.router')
const contactRoutes = require('./routes/contact.router')

const PORT = process.env.PORT || 3000;

dotenv.config();

mongoose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

app.use(express.static('uploads'))
app.use(cors());

app.use(express.json());

app.use('/api/book', bookRoutes);
app.use('/api/contact', contactRoutes);
//app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server up and running at ${PORT}`));