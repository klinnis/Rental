const mongoose = require('mongoose');

const carSchema = mongoose.Schema({

    name: String,
    brand: String,
    power: String,
    seats: Number,
    office: {officename: String, city: String, telephone: String}

});

module.exports = mongoose.model('Car', carSchema);