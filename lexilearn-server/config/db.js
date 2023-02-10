const mongoose = require('mongoose');
const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(db);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;