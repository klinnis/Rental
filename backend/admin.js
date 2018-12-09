

const express = require('express');
const Car = require('./models/car');
const router = express.Router();
const User = require('./models/user');

router.get('/users', (req,res,next) => {
    User.find().then(user => {
        if(!user) {
            res.status(404).json({message: 'No users Found'})
        }
        res.status(201).json(user);
    }).catch(error =>{
        console.log(error);
    });
});




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