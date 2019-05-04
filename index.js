"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());


restService.post("/echoV2", function(req, res) {
  var speech = "";
  if(req.body.queryResult && req.body.queryResult.parameters)
  {
    if(req.body.queryResult.parameters.mail)
      speech = req.body.queryResult.parameters.mail;
    if(req.body.queryResult.parameters.message)
      speech +=req.body.queryResult.parameters.message; 
    
  }else{
      speech = "Seems like some problem. Speak again.";
  }
  
 console.log(speech);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vibhutinarayan95@gmail.com',
      pass: '8299471901'
    }
  });
  
  var mailOptions = {
    from: 'saheb.bhowmick039@gmail.com',
    to: 'vibhutinarayan995@gmail.com',
    to: 'samir251290@gmail.com',
    subject: 'Hello from!!',
    text: speech
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });   
  return res.json({
    fulfillmentText: speech,
    fulfillmentMessages: [
      {
        "text": {
          "text": [
            speech
          ]
        }
      }
    ],
    source: "webhook-echo-sample"
  });
});



restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
