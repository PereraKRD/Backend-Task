// fetch things from app,js
const app = require('./app');

const connectDatabase = require('./config/database');
const dotenv = require('dotenv');

// Handle uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting Down server due to uncaught exceptions");
    process.exit(1);
})

dotenv.config({ path: 'backend/config/config.env' });

//Connecting Database
connectDatabase();

const PORT = 4000;

const server = app.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}.....`)
});

process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('shutting down the server due to unhhandled promisse rejections');
    server.close(() => {
        process.exit(1)
    })
})