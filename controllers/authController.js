const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');


// Register a user   => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { firstname, lastname, mobile, email, password } = req.body;

    const user = await User.create({
        firstname,
        lastname,
        mobile,
        email,
        password
    })

    sendToken(user, 200, res)

})



// Login User => /api/v1/login
exports.loginUser = catchAsyncErrors( async (req, res, next) => {
    // user have to provide email and password to login
    const { email, password } = req.body;

    // Check whether email and password are entered or not by user
    if (!email || !password){
        return next(new ErrorHandler('Please entter email and password', 400))
    } 

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user){
        return next(new ErrorHandler('Invalid email or password', 401))
    }
    
    // check the password 
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 200, res)
})


// Get the details of currently logged user
exports.getUserProfile = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Logout User
exports.logoutUser = catchAsyncErrors( async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })
})