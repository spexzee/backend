const mongoose = require('mongoose');
require('dotenv').config();



async function connectToMongo() {
    try {
        const Mongo_url = "mongodb+srv://spexzee:Spexzee786@clusternote.jjk6c0u.mongodb.net/?retryWrites=true&w=majority"

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
