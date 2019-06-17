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

module.exports = router;