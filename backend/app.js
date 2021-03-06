const express = require('express');
const bodyParser = require('body-parser');
const Med = require('./models/med');
const User = require('./models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var schedule = require('node-schedule');
var nodemailer = require('nodemailer');
const checkAuth = require('./check-auth');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'takeyourmeds.swabhi@gmail.com',
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
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
});

schedule.scheduleJob('30 18 * * *', () => {
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
    var currentOffset = currentTime.getTimezoneOffset();

    var ISTOffset = 330;   // IST offset UTC +5:30 

    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

    // ISTTime now represents the time in IST coordinates
    let currentHour = ISTTime.getHours();
    let currentMin = ISTTime.getMinutes();
    
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
                                from: 'takeyourmeds.swabhi@gmail.com',
                                to: doc.creatorEmail,
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

calEverythingAndRemindIfNeeded();

setInterval(calEverythingAndRemindIfNeeded, 300000);

app.get('/api/meds', checkAuth, (req, res, next) => {
    
    Med.find({creator: req.userData.userId})
    .then((docs) => {
        calEverythingAndRemindIfNeeded();
        res.status(200).json({
            message: 'Meds fetched!',
            meds: docs
        });
    })
    
});



app.get('/api/meds/:id', checkAuth, (req, res, next) => {
    Med.findOne({_id:req.params.id}).then(doc => {
        res.status(200).json({
            message: 'Med fetched',
            med: doc
        });
    });
});

app.post('/api/meds', checkAuth, (req, res, next) => {
    let med = new Med(req.body);
    med.creator = req.userData.userId;
    med.creatorEmail = req.userData.email;
    console.log(med);
    med.save();
    calEverythingAndRemindIfNeeded();
    res.status(201).json({
        message:'med added successfully',
        med:med
    });
});

app.put('/api/meds/:id', checkAuth, (req, res, next) => {
    const updatedMed = new Med({
        _id: req.body._id,
        name: req.body.name,
        purpose: req.body.purpose,
        composition: req.body.composition,
        toBeTakenAt: req.body.toBeTakenAt,
        myReview: req.body.myReview,
        creator: req.userData.userId,
        creatorEmail: req.userData.email
    });
    Med.updateOne({_id: req.params.id}, updatedMed).then(result => {
        calEverythingAndRemindIfNeeded();
        res.status(200).json({
            message: 'Update successful',
            data: result
        });
    });
});

app.delete('/api/meds/:id', checkAuth, (req, res, next) => {
    Med.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({message:'successfully deleted'});
    });
});

app.post('/api/users/signup', (req, res, next) => {
    
    const user = new User({
        email: req.body.email,
        phone: req.body.phone,
        name: req.body.name,
        password: req.body.password
    });
    user.save();
    res.status(201).json({
        message: 'New User Created',
    });
    

    /*
    const hashedPassword = bcrypt.hash(req.body.password, 10);
    const user = new User({
        email: req.body.email,
        phone: req.body.phone,
        name: req.body.name,
        password: hashedPassword
    });
    user.save();
    res.status(201).json({
        message: 'New User Created',
    });*/
});

app.post('/api/users/login', (req, res, next) => {
    User.findOne({email: req.body.email}).then(user => {
        if(!user){
            return res.status(401).json({message: 'User not found'});
        }
        if(user.password != req.body.password){
            return res.status(401).json({message: 'Incorrect password'});
        }
        const token = jwt.sign({email: user.email, userId: user._id}, 'secret_this_should_be_longer', {expiresIn: '1h'});
        res.status(200).json({
            message: 'Login token generated',
            token: token
        });
    });
});

app.get('/api/user', checkAuth, (req, res, next) => {
    User.findOne({_id:req.userData.userId}).then(doc => {
        res.status(200).json({
            message: 'User fetched',
            user: doc
        });
    });
});

module.exports = app;


