// bring in express
const express = require('express');

// other tools
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session)

// create server
const server = express();

const sessionConfig = {
    name: 'kyle',   // default is sid. change for security
    secret: 'precious',
    resave: false, // if no changes to session, don't save it
    saveUninitialized: true, // if no session, create one automatically and send to client. must be false in prod
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false, // send cookie only over https. set to true in production. In this example, no
        httpOnly: true, // prevents JS access in browser
    },
    store: new KnexSessionStore({
        knex: require('./database/dbConfig'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 10, // remove sessions after a specified time. every hr goes to db and  
   }) // removes session.  Remember this is a constructor therefore the 'new'
}


// middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger);
server.use(session(sessionConfig));

// router
const AuthRouter = require('./routerInfo/usersRouter');

server.use('/auth', AuthRouter);

// test output
server.get('/', (req, res) => {
    res.send('This is a test page')
});

function logger(req, res, next) {
    console.log(`${req.method} Request`)
    next();
}

module.exports = server;