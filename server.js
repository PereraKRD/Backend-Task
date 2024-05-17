// fetch things from app,js
const app = require('./app');

const connectDatabase = require('./config/database');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary')

// Handle uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting Down server due to uncaught exceptions");
    process.exit(1);
})

dotenv.config({ path: './config/config.env' });

//Connecting Database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`server started on PORT ${process.env.PORT}.....`)
});

process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('shutting down the server due to unhhandled promisse rejections');
    server.close(() => {
        process.exit(1)
    })
})