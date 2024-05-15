const mongoose = require('mongoose');

const validator = require('validator');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname:{
        type: String,
    },
    mobile:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})
// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}
// return JWT tokens
userSchema.methods.getJwtToken = function(){
    return jwt.sign({ id: this._id }, "NJCEFOWER840WFJICM0CW49R0W93RKF039KF03FK", {
        expiresIn: 3600*60
    });          
} 


const User = mongoose.model('User', userSchema);

module.exports = User;