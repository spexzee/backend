const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default :'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model('user', UserSchema);
// User.createIndexes();

module.exports = User;