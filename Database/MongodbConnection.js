const mongoose = require("mongoose")
require("dotenv").config();

const connectDb = async () => {

    try {

        await mongoose.connect(process.env.MONGOSE_URL);

        console.log(" MongoDB connected successfully ");
        
        
    } catch (error) {
      console.error(" ❌ MongoDB connection failed:", error.message);
      process.exit(1); // Exit on failure
    }

}

module.exports = connectDb ;