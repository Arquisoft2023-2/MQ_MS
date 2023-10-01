const mongoose = require("mongoose");
require('dotenv').config(); // Carga las variables de entorno desde .env

async function dbConnect() {
    const MONGO_URI = process.env.MONGO_URI.toString();
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Db connected!");
        return true;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return false;
    }
}

module.exports = dbConnect;