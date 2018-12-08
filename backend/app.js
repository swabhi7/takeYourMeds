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
    Med.find()
    .then((docs) => {
        res.status(200).json({
            message: 'Meds fetched!',
            meds: docs
        });
    })
    
});

app.get('/api/meds/:id', (req, res, next) => {
    Med.findOne({_id:req.params.id}).then(doc => {
        res.status(200).json({
            message: 'Med fetched',
            med: doc
        });
    });
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

app.put('/api/meds/:id', (req, res, next) => {
    const updatedMed = new Med({
        _id: req.body._id,
        name: req.body.name,
        purpose: req.body.purpose,
        composition: req.body.composition,
        toBeTakenAt: req.body.toBeTakenAt,
        myReview: req.body.myReview
        
    });
    Med.updateOne({_id: req.params.id}, updatedMed).then(result => {
        res.status(200).json({
            message: 'Update successful',
            data: result
        });
    });
});

app.delete('/api/meds/:id', (req, res, next) => {
    Med.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({message:'successfully deleted'});
    });
});

module.exports = app;


