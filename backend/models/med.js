const mongoose = require('mongoose');

const medSchema = mongoose.Schema({
    name: String,
    purpose: String,
    composition: String,
    toBeTakenAt: [{
        hh: Number,
        mm: Number,
        amorpm: String,
        timeup: Boolean,
        hourRem: Number,
        minRem: Number,
        taken: Boolean,
        msgSent: Boolean
    }],
    myReview: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    creatorEmail: String
});

module.exports = mongoose.model('Med', medSchema);