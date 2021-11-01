const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    active: {
        type: Boolean
    },
    completed: {
        type: Boolean
    }
})

module.exports = mongoose.model('Item', itemSchema)