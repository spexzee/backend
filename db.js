const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://spexzee:Spexzee786@clusternote.jjk6c0u.mongodb.net/?retryWrites=true&w=majority'



async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI, {
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