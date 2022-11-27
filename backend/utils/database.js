const mongoose = require('mongoose');

const connectDB = async ()=>{
    const DATABASE_URL = 'mongodb://localhost:27017/authentication';
    try {
        mongoose.connect(DATABASE_URL)
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB