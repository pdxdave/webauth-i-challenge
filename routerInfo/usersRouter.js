// bring in express
const express = require('express');

// bring in bcryptjs
const bcrypt = require('bcryptjs')

// create express router
const router = express.Router();

// bring in model
const UsersModel = require('../modelInfo/usersModel')


router.post('/register', async (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash;
    try {
        const newUser = await UsersModel.add(user)
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({
            message: "There was a problem"
        })
    }
})

router.post('/login', async (req, res) => {
    let {username, password} = req.body
    try {
        const user = await UsersModel.findBy({username})
        if(user && bcrypt.compareSync(password, user.password)){
            res.status(200).json({ message: `Welcome ${user.username}`})
        }else{
            res.status(401).json({ message: "Invalid Credentials"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('./users', restricted, async (req, res) => {
    try {
        const users = await UsersModel.find()
        console.log('get', users)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})


// middleware 
async function restricted() {
    const {username, password} = req.headers;

    if(username && password) {
        try{
            const user = await UsersModel.findBy({username})
            if(user && bcrypt.compareSync(password, user.password)){
                next();
            } else {
                res.status(401).json({message: "Invalid Credentials"})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(400).json({ message: "Please provide credentials"})
    }
}

module.exports = router;