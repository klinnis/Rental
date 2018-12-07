const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Number},
});

module.exports = mongoose.model('User', userSchema);