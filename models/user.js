const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const ContestDetails = require('./contest');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    handle: {
        type: String,
        required: true
    },
    collegeName: {
        type: String,
        default: 'NP'
    },
    contestsList: [{
        contestName: {
            type: String
        },
        startedAt: {
            type: String
        },
        testLink: {
            type: String
        },
        rank: {
            type: Number
        },
        score: {
            type: Number
        },
        maxScore: {
            type: Number
        },
        timeTaken: {
            type: String
        },
        percentage: {
            type: Number
        },
        effectiveTimeTaken: {
            type: String
        },
        problemsList:  [{
            name: String,
            score: Number,
            maxScore: Number
        }]
    }],
    profileUrl: {
        type: String,
        default: "NP"
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

// userSchema.statics.hashPassword = (password) => {
//     return bcrypt.hashSync(password, 10);
// }

// userSchema.methods.isValid = (hashedPassword, password) => {
//     // console.log('model = ', password, hashedPassword);
//     return bcrypt.compareSync(password, hashedPassword);
// }

module.exports = mongoose.model('Users',userSchema);