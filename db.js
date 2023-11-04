const mongoose = require('mongoose');
require('dotenv').config();



async function connectToMongo() {
    try {

        await mongoose.connect(`${process.env.MONGO_URI}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}


module.exports = connectToMongo;
