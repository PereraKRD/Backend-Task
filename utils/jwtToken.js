// Create and send token and save in the cookie
const sendToken = (user, statusCode, res) => {
    // create Jwt token
    const token = user.getJwtToken();

    // options for cookie
    const optionns = {
        //  set expire datte
        expires: new Date(
            Date.now() + (7 * 24 * 60 * 60 * 1000)
        ),
        // set http only cookie
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, optionns).json({
        success: true,
        token,
        user
    })
}

module.exports = sendToken;