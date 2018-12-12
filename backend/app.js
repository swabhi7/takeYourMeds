const express = require('express');
const bodyParser = require('body-parser');
const Med = require('./models/med');
const mongoose = require('mongoose');
var schedule = require('node-schedule');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dashswabhimaan@gmail.com',
    pass: '?wolfpack...'
  }
});



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

schedule.scheduleJob('0 0 * * *', () => {
    Med.find().then(docs => {
        for(let doc of docs){
            for(let dose of doc.toBeTakenAt){
                dose.taken = false;
                dose.msgSent = false;
            }
            doc.save();
        }
    });
});

function calTimeRem(time){

    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let currentMin = currentTime.getMinutes();
    
    let totalMin, totalCurrentMin = currentHour * 60 + currentMin;
    if(time.amorpm == 'am'){
      if(time.hh == 12){
        totalMin = time.mm;
      }
      else{
        totalMin = time.hh * 60 + time.mm;
      } 
    }
    if(time.amorpm == 'pm'){
      if(time.hh == 12){
        totalMin = 12*60 + time.mm;
      }
      else{
        totalMin = ((time.hh + 12) * 60) + (time.mm);
      }     
    }
    if(totalMin - totalCurrentMin <= 0){
      time.timeup = true;
    }
    else{
      time.timeup = false;
      let minRem = totalMin - totalCurrentMin;
      time.hourRem = Math.floor(minRem / 60);
      time.minRem = minRem % 60;
    }
    return time;
}

function calEverythingAndRemindIfNeeded(){
    //console.log('-------------------------------------------------------------');
    Med.find().then((docs) => {
        for(let doc of docs){
            for(let dose of doc.toBeTakenAt){
                if(dose.taken == false){
                    dose = calTimeRem(dose);
                    //console.log(dose);
                    if(dose.timeup){
                        if(dose.msgSent == false){
                            var mailOptions = {
                                from: 'dashswabhimaan@gmail.com',
                                to: 'sudhosil@gmail.com',
                                subject: 'TYM Reminder',
                                text: 'You have not taken your med - ' + doc.name + ' scheduled at - ' + dose.hh + '-' + dose.mm + ' ' + dose.amorpm
                            };
                                
                            transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                            });
                            dose.msgSent = true;
                        }
                    }
                }
            }
            doc.save();
        }
    });
}

setInterval(calEverythingAndRemindIfNeeded, 300000);

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


