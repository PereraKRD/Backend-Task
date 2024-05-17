const mongoose = require('mongoose');

const validator = require('validator');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please enter your firstname'],
        maxLength: [15,'firstname name cannot exceed 15 characters']
    },
    lastname:{
        type: String,
        required: [true, 'Please enter your lastname'],
        maxLength: [15,'lastname name cannot exceed 15 characters']
    },
    mobile:{
        type: String,
        unique: true,
        validate: [validator.isMobilePhone, 'Please enter a valid mobile number']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Please enter your email'],
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password:{
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    avatar:{
        url: {
            type: String,
        }
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
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });           
} 


const User = mongoose.model('User', userSchema);

module.exports = User;