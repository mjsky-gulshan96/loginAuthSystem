const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });

// middleware to authorize the current user with jwt
function authorize(req, res, next) {
    var header = req.headers;
    var token = header.jwttoken;
    try {
        var decode =  jwt.verify(token , process.env.PRIVATE_ACCESS_KEY)
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'not authorised',
            error: error
        })
    }
    if (decode) {
        // set to res header
        res.set('currentUser', decode.user)
    }
    next();
}

// authenticate user with passport 
function isAuthenticate(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    } else {
       return res.status(400).json({message:'not authenticated'});
    }
}

module.exports = {
    authorize:authorize,
    isAuthenticate:isAuthenticate
}