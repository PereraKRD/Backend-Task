
const mongoose = require('mongoose');

//create function to connect database mongoDB
const connectDatabase = () => {
    try {
        mongoose.connect("mongodb+srv://Ryan:1234@cluster0.wllzopy.mongodb.net/loonlab", {});
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
}

module.exports = connectDatabase