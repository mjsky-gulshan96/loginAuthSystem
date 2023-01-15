// create express server
const express = require('express');
const mongoose = require('mongoose');
const cors  = require('cors');
const dotenv = require('dotenv');
const app = express();
const PORT = 8000;
dotenv.config({path: './config.env'});
const DB = process.env.DATABASE
const User = require('./model/userModel');

//middlewares
app.use(express.json())
app.use(cors())
app.use('/account', require('./controller/Account'));

// Mongo DB Atlas cconnection
mongoose.connect(DB).then(()=>{
    console.log("connection successfull")
}).catch((err)=>console.log(`no connection, error: ${err}`));

app.get('/', (req, res)=>{
    res.send('success')
})

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
});