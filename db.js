const mongoose = require('mongoose');
require('dotenv').config();



async function connectToMongo() {
    try {
        const Mongo_url = process.env.MONGODB_URL

        await mongoose.connect(`${Mongo_url}`, {
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
