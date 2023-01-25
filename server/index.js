// create express server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config({ path: './config.env' });
const DB = process.env.DATABASE
const passport = require('passport');

// define model schema (come first)
require('./model/userModel');
const passportConfig = require('./script/passportConfig');


// Mongo DB Atlas cconnection
mongoose.connect(DB).then(() => {
    console.log("connection successfull")
}).catch((err) => console.log(`no connection, error: ${err}`));

passportConfig.authLocalStrategy(passport);

//middlewares
app.use(express.json())
app.use(cors());
// store a session variable
app.use(require('express-session')({
    secret: "sessionsecretkey",
    resave: true,
    saveUninitialized: true
}));

// initialise passport and session
app.use(passport.initialize());
app.use(passport.session());

app.use('/account', require('./controller/Account'));


app.get('/', (req, res) => {
    res.send('success')
})

app.listen(8000, () => {
    console.log(`server running on 8000`);
});