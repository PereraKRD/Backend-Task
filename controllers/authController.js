const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

const cloudinary = require('cloudinary');

// Register a user   => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    })

    const { firstname, lastname, mobile, email, password } = req.body;

    const user = await User.create({
        firstname,
        lastname,
        mobile,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    sendToken(user, 200, res)

})



// Login User => /api/v1/login
exports.loginUser = catchAsyncErrors( async (req, res, next) => {

    const { email, password } = req.body;


    if (!email || !password){
        return next(new ErrorHandler('Please entter email and password', 400))
    } 


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


// Get the details of currently logged user => /api/v1/me
exports.getUserProfile = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Logout User => api/v1/logout
exports.logoutUser = catchAsyncErrors( async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'User have Successfully Logged Out'
    })
})