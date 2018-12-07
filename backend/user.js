const express = require('express');
var cors = require('cors');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/user');

router.post('/signup', (req,res,next) => {

    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
            isAdmin: 0,
        });
        user.save().then(result => {
            res.status(201).json({
                message: 'User Created'
            });
        }).catch(error => {
            console.log(error);
        });
    });

});

router.post('/login', (req,res,next) => {
    let fetchedUser;

  User.findOne({email: req.body.email}).then(user => {
      if (!user) {
          return res.status(401).json({
              message: 'Auth Failed'
          })
      }
      fetchedUser = user;


      return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
      console.log(result);
      if (!result) {
          return res.status(404).json({message: 'Auth Failed'});
      }
      var administrator;
      administrator = fetchedUser.isAdmin;
    const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 'secret', {expiresIn: '1h'});
      res.status(200).json({token: token, expiresIn: 3600, admin: administrator});
  }).catch(err => {
      return res.status(401).json({message: err})
  });
});

module.exports = router;