const mongoose = require('mongoose');
let RoleSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true,'Role name is required!'],
            unique: [true,'Role name is exits!']
        },
        description: {
            type: String,
            default: null
        },
        active: {
            type: Boolean,
            default: true
        },
        created_at: {
            type: Date,
            default: Date.now()
        },
        updated_at: {
            type: Date,
            required: [true,'Updated date is required!']
        }
    }, {
        collection: 'Role'
    }
);
module.exports = mongoose.model('Role',RoleSchema);