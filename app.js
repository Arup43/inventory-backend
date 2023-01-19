const bodyParser = require('body-parser');

//ENV file import
require('dotenv').config();

//Security middleware lib import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

//Database lib import
const mongoose = require('mongoose');

//Express lib import
const express = require('express');
const app = express();

//Security Middleware Implementation
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

//Body Parser Implementation
app.use(bodyParser.json());

//Request Rate limiting Implementation
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3000 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//Mongo DB Connection
let URI = process.env.MONGO_URI;
let OPTIONS = {user: 'arup', pass: 'ShuktiNusrat18', autoIndex: true};
mongoose.connect(URI, OPTIONS, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('MongoDB connected');
    }
});

module.exports = app;