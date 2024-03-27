const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
})

let User =  mongoose.model('User' , userSchema);

module.exports = User;