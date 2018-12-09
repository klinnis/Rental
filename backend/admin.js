const express = require('express');
const Car = require('./models/car');
const router = express.Router();


router.post('/create-car', (req,res,next) => {
   const car = new Car({
       brand: req.body.brand,
       model: req.body.model,
       power: req.body.power,
       seats: req.body.seats
   });
   car.save().then(response => {
        res.status(201).json({message: 'Car Inserted'});
    }).catch(error => {console.log(error)});


});


module.exports = router;