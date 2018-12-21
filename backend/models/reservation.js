
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = Schema({
    car_id: { type: Schema.Types.ObjectId, ref: 'Car' },
    from: Number,
    until: Number,
});


module.exports = mongoose.model('Reservation', reservationSchema);