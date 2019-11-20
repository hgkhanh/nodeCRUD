const User = require("./user.model.js");

const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Personal', 'Group'],
        default: 'Personal'
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    ],
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);
