// brin in express
const express = require('express');

// bring in bcryptjs
const bcrypt = require('bcryptjs');

// create express router
const router = express.Router();

// bring in model
const Users = require('../modelInfo/usersModel');


// REGISTER A NEW USER
router.post('/register', (req, res) => {
    let user = req.body;

    // hash password
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Users.add(user)
      .then(saved => {
          res.status(201).json(saved)
      })
      .catch(error => {
          res.status(500).json(error)
      })
})

// USER LOGIN
router.post('/login', (req, res) => {
    let {username, password} = req.body 
    
    Users.findBy({username})
     .first()
     .then(user => {
         if(user && bcrypt.compareSync(password, user.password)){
             req.session.username = user.username /* only successful logins with this username will be added
                                                     req.session.username sent to restricted middleware */
                                                     console.log(req.session.username)
             res.status(200).json({ message: `Welcome ${user.username}!`})
         } else {
             res.status(401).json({ message: 'Invalid Credentials'})
         }
     })
});


// GET USERS
router.get('/users', restricted, (req, res) => {
    Users.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => res.send(err))
})

// Restricted Middleware
function restricted (req, res, next){
    if(req.session && req.session.username) { /* If there is a session go to next */
        next();
    } else {
        res.status(401).json({ message: "You do not get to pass"})
    }
}


// LOGOUT


// function restricted (req, res, next) {
//     const {username, password} = req.headers;

//     if(username && password) {

//         Users.findBy({username})
//         .first()
//         .then(user => {
//             if(user && bcrypt.compareSync(password, user.password)){
//                 res.status(200).json({ message: `Welcome ${user.username}!`})
//             } else {
//                 res.status(401).json({ message: 'Invalid Credentials'})
//             }
//         })
//         .catch(error => {
//             res.status(500).json(error)
//         });
//    } else {
//     res.status(400).json({ message: 'Please provide credentials'})
//   }
// }

module.exports = router;