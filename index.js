
//1. import   packages from packages.json 


const express = require('express');                        // right 
const bodyParser = require('body-parser');                 // right            
const cors = require('cors');                             // right 
const mongoose = require('mongoose');                    // right pour connect with mongo db 
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

//2.   declare function  express();

const app = express();

// 3. middle ware    i do not understand 

//?Middle wair
app.use(cors({ origin: '*' }))

// body-parser middle ware
app.use(bodyParser.json());





 


 






//? setting static folder path
app.use('/image/products', express.static('public/products'));
app.use('/image/category', express.static('public/category'));
app.use('/image/poster', express.static('public/posters'));


//4. connection with mongo db 

const URL = process.env.MONGO_URL;
mongoose.connect(URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));



//5. Routes  moddle ware 

app.use('/categories', require('./routes/category'));
app.use('/subCategories', require('./routes/subCategory'));
app.use('/brands', require('./routes/brand'));
app.use('/variantTypes', require('./routes/variantType'));
app.use('/variants', require('./routes/variant'));
app.use('/products', require('./routes/product'));
app.use('/couponCodes', require('./routes/couponCode'));
app.use('/posters', require('./routes/poster'));
app.use('/users', require('./routes/user'));
app.use('/orders', require('./routes/order'));
app.use('/payment', require('./routes/payment'));
app.use('/notification', require('./routes/notification'));


// Example route using asyncHandler directly in app.js
app.get('/', asyncHandler(async (req, res) => {
    res.json({ success: true, message: 'API working successfully', data: null });
}));


// NB: définit un gestionnaire d'erreurs global pour une application Express. 

// Global error handler
app.use((error, req, res, next) => {
    res.status(500).json({ success: false, message: error.message, data: null });
});


// start server ou run server 

app.listen(process.env.PORT,'0.0.0.0', () => {
    console.log(`Server running on port ${process.env.PORT}`);
});


