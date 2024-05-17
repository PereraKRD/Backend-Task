// Create and send token and save in the cookie
const sendToken = (user, statusCode, res) => {
    // Jwt token
    const token = user.getJwtToken();

    // optns for cookie
    const optionns = {
        expires: new Date(
            Date.now() + (process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000)
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, optionns).json({
        success: true,
        token,
        user
    })
}

module.exports = sendToken;