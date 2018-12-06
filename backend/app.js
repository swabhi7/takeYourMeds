const express = require('express');
const bodyParser = require('body-parser');
const Med = require('./models/med');
const mongoose = require('mongoose');
//qoITVu8Kxkajx4wJ
const app = express();

mongoose.connect('mongodb+srv://swabhi:qoITVu8Kxkajx4wJ@cluster0-mrfpl.mongodb.net/tymdb?retryWrites=true')
.then(() => {
    console.log('Connected to DB');
})
.catch(() => {
    console.log('Connection to DB failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*", "always");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
});

app.get('/api/meds', (req, res, next) => {
    /*
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
    */
    Med.find()
    .then((docs) => {
        res.status(200).json({
            message: 'Meds fetched!',
            meds: docs
        });
    })
    
});

app.post('/api/meds', (req, res, next) => {
    let med = new Med(req.body);
    console.log(med);
    med.save();
    res.status(201).json({
        message:'med added successfully',
        med:med
    });
});

app.delete('/api/meds/:id', (req, res, next) => {
    Med.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({message:'successfully deleted'});
    });
});

module.exports = app;


