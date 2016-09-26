const mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true,'Username is exits!'],
        trim: true,
        required: [true,'Username is required!'],
        min: [6,'Username must has min length 6!'],
        max: [20,'Username must has max length 20!']
    },
    password: {
        type: String,
        required: [true,'Password is required!']
    },
    email: {
        type: String,
        unique: [true,'Email is exits!'],
        sparse: true,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    },
    role: {
        type: mongoose.Schema.ObjectId,
        required: [true,'Role id is required!'],
        ref: 'Role'
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        required: [true,'Updated date is required!']
    }
},{
    collection: 'User'
});
module.exports = mongoose.model('User',UserSchema);