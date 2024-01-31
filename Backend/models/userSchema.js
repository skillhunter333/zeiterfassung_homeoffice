const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema Arbeitszeitblock
const worktimeSchema = new Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date
    }
}, { _id: false });

// User komplett

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
        required: true,
    },
    lastName: {
        type: String,
        default: null,
        required: true
    },
    worktime: [worktimeSchema]
});

const UserCollection = mongoose.model('User', userSchema);

module.exports = UserCollection;