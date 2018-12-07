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



app.use('/api/user', userRoutes);

module.exports = app;