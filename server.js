// bring in express
const express = require('express');

// other tools
const cors = require('cors')
const helmet = require('helmet')

// create server
const server = express();

// middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger)

// router
// const AuthenticateRouter = require('./someplace/someplace', AuthenticateRouter);

// server.use('/someplace/someplace', AuthenticateRouter);

// test output
server.get('/', (req, res) => {
    res.send("This is a test")
})


function logger(req, res, next) {
    console.log(`${req.method} Reqest`)
    next();
}

module.exports = server;