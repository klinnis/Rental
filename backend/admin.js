

const express = require('express');
const multer = require('multer');
const Car = require('./models/car');
const Reservation = require('./models/reservation');
const router = express.Router();
const User = require('./models/user');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage
});





router.get('/users', (req,res,next) => {
    User.find({}, 'email isAdmin').then(user => {
        if(!user) {
            res.status(404).json({message: 'No users Found'})
        }
        res.status(201).json(user);
    }).catch(error =>{
        console.log(error);
    });
});

router.post('/delete-user', (req, res, next) => {

User.deleteOne({_id: req.body._id}).then(user => {
    res.status(201).json(user);
}).catch(error => {
    console.log(error);
});
});

router.post('/admin-user', (req,res,next) => {
    User.findOneAndUpdate({ _id: req.body._id }, { $set: { isAdmin: 1 } }, { new: true }).then(user => {
       res.status(201).json(user);
    }).catch(error => console.log(error));
});

router.post('/save-image',  upload.single('file'), (req,res) => {

    const filename = req.file.filename;
    const path = req.file. path;
    res.status(201).json({});


});




router.post('/create-car', (req,res,next) => {
   const car = new Car({
       brand: req.body.brand,
       model: req.body.model,
       power: req.body.power,
       seats: req.body.seats,
       imgUrl: req.body.imgUrl,
   });
   car.save().then(response => {
        res.status(201).json({message: 'Car Inserted'});
    }).catch(error => {console.log(error)});
});

router.post('/cars', (req,res,next) => {

    Reservation.find().or([{$and: [{from: {$lte: req.body.from}}, {until: {$gte: req.body.from}}]},
        {$and: [{from: {$lte: req.body.until}}, {until: {$gte: req.body.until}}]},
        {$and: [{from: {$gt: req.body.from}}, {until: {$lt: req.body.until}}]}])
        .then(cars => {
            if(cars[0] === undefined) {
                Car.find().then(car => {
                    res.status(200).json(car);
                }).catch(error => {console.log(error)});
            } else {
                Car.find({_id: {$ne: cars[0].car_id}}).then(car3 => {
                    res.status(201).json(car3);
                } ).catch(error => {console.log(error)});
            }
        }).catch(error => {console.log(error)});
});

router.post('/rent', (req,res,next) => {
   const reserve = new Reservation({
        car_id: req.body.id,
        from: req.body.from,
        until: req.body.until,
    });
   reserve.save().then( user => {
       res.status(200).json({message: 'Rent OK'});
   }).catch(error => {console.log(error)});
});




module.exports = router;