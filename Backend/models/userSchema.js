const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: { 
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100,
        select: false  
    },
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    }
});

const UserCollection = mongoose.model('User', userSchema);

module.exports = UserCollection;
