const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required:true,
        min:6
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:8
    }
});

// middleware
UserSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        // hash password before save in DB
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
  });

module.exports = mongoose.model('User', UserSchema)
