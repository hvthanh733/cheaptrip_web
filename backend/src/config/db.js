const mongoose = require("mongoose");

let cacheDb = null;

const connectDB = async () => {
    if (cacheDb && mongoose.connection.readyState === 1) {
        return cacheDb;
    }
    cacheDb = await mongoose.connect(process.env.MONGODB_URI, {
        bufferCommands: false,
    });

    return cacheDb;
};

module.exports = connectDB;
