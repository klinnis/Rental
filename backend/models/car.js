const mongoose = require('mongoose');

const carSchema = mongoose.Schema({

    brand: String,
    model: String,
    power: String,
    seats: Number,

});

module.exports = mongoose.model('Car', carSchema);