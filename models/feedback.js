const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    id: String,
    name: String,
    deleted: {
        type: Boolean,
        default: false
    }
});

// module.exports = contestSchema;
module.exports = mongoose.model('Feedback',feedbackSchema);
