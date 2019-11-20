const Group = require("./group.model.js");

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    address: String,
    phoneNumber: String,
    groups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group'
        }
    ],
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
