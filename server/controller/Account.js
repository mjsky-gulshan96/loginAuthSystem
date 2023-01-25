const route = require('express').Router();
const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });
var authorize = require('../middleware/authorizeJWT');
const passport = require('passport');

// register user
route.post('/Register', async (req, res) => {

    var { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({
            success: false,
            message: 'please fill all the details'
        })
    }

    // check if user already register
    try {
        var isExist = await UserModel.findOne({ email: email })
        if (isExist) {
            res.status(422).json({ error: 'user already exist' })
            return;
        } else {
            var newUser = new UserModel({
                username: username, email: email, password: password
            });
            await newUser.save()
        }
    } catch (error) {
        res.status(500).json({ error: error })
        return;
    }

    res.status(200).json({ success: 'user created successfully' })
});

// login user

// route.post('/Login', async (req, res) => {
//     var { email, password } = req.body;

//     try {
//         var isUserExist = await UserModel.findOne({ email: email })
//         if (!isUserExist) {
//             return res.status(404).json({ error: 'user not found' });
//         } else {
//             bcrypt.compare(password, isUserExist.password, function (err, data) {
//                 if (err) { return res.status(500).json({ success: false }) };
//                 if (data) {
//                     // create JWT signature asynchronous
//                     jwt.sign({ user: email }, process.env.PRIVATE_ACCESS_KEY, function (err, token) {
//                         if (err) return;
//                         if (token) {
//                             res.status(200).json({
//                                 success: true,
//                                 message: 'successfully logged in',
//                                 token: token
//                             });
//                         }
//                     })
//                 } else {
//                     return res.status(401).json({
//                         success: false,
//                         message: 'Incorrect password',
//                     });
//                 }
//             });
//         }

//     } catch (error) {
//         return res.status(500).json({ error: error })
//     }
// })


// login user via passport

route.post('/Login', passport.authenticate("local", { failureMessage: 'error', successMessage: "success" }), (req, res) => {
    // create JWT signature asynchronous
    jwt.sign({ user: req.body.email }, process.env.PRIVATE_ACCESS_KEY, function (err, token) {
        if (err) return;
        if (token) {
            res.status(200).json({
                success: true,
                message: 'successfully logged in',
                token: token
            });
        }
    })
})

route.get('/Profile', authorize, function (req, res) {
    res.json({ success: true })
})

module.exports = route;