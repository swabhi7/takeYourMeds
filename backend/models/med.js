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
        taken: Boolean
    }],
    myReview: String
});

module.exports = mongoose.model('Med', medSchema);