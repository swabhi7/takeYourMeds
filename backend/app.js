const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Controll-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Controll-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
});

app.use('/api/meds', (req, res, next) => {
    let meds = [
        {
            id: 'fdafadds',
            name: 'Medicine 110',
            purpose: 'Keeps Blood Pressure in controllfadada',
            composition: 'paracetamoldfs, nice',
            toBeTakenAt: [{
              hh: 9,
              mm: 0,
              amorpm: 'am',
              taken: false
            }],
            myReview: 'Works FSFS great!'
        },
        {
            id: 'NFDKSJDK',
            name: 'blue 110',
            purpose: 'dewkjn dnlwdnel Pressure in controllfadada',
            composition: 'nice',
            toBeTakenAt: [
                {
                    hh: 11,
                    mm: 45,
                    amorpm: 'am',
                    taken: false
                },
                {
                    hh: 7,
                    mm: 15,
                    amorpm: 'pm',
                    taken: false
                }
            ],
            myReview: 'Works FSFS great!'
        }
    ];
    res.status(200).json({
        message: 'Meds fetched!',
        meds: meds
    });
});

module.exports = app;


