const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());

const bodyparser = require('body-parser');
app.use(bodyparser.json());




const mongoose = require('mongoose');
const uri = 'mongodb+srv://markos:XondkHMN6kIwvUot@cluster0-lzmav.mongodb.net/test?retryWrites=true';

mongoose.connect(uri,  { useNewUrlParser: true }).then(() => {console.log('Connected')}).catch((error) => {console.log(error)});


const userRoutes = require('./user');
const adminRoutes = require('./admin');



app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;