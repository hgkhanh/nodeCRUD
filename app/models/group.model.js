const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    owner: { 
        type: Object, 
        required: true 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Group', GroupSchema);
