require('dotenv').config();

const mongoose = require('mongoose');

// Check if MONGODB_URL is defined
if (!process.env.MONGODB_URL) {
    console.error("Error: MONGODB_URL is not defined in the environment.");
    process.exit(1); // Exit the script with a non-zero status code
}

mongoose.connect(process.env.MONGODB_URL, {
    // Options
}).then(() => {
    console.log("Connected to MongoDB successfully!");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});
