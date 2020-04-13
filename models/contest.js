const mongoose = require('mongoose');

const contestSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    url: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    // problemsSolved: {
    //     type: Number,
    //     required: true
    // },
    // rating: {
    //     type: Number,
    //     required: true
    // },
    participants: {
        type: [String],
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

// module.exports = contestSchema;
module.exports = mongoose.model('Contest',contestSchema);
