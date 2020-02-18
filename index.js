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


restService.post("/send", function(req, res) {
  var speech = "";
  if(req.body.queryResult && req.body.queryResult.parameters)
  {
    if(req.body.queryResult.parameters.mail)
      speech = req.body.queryResult.parameters.mail;
    if(req.body.queryResult.parameters.message)
      speech +=req.body.queryResult.parameters.message; 
    if(req.body.queryResult.parameters.device)
      speech +=req.body.queryResult.parameters.device+" "; 
    if(req.body.queryResult.parameters.status)
      speech +=req.body.queryResult.parameters.status;
    
  }else{
      speech = "Seems like some problem. Speak again.";
  }

  
 console.log(speech);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'saheb.bhowmick039@gmail.com',
      pass: 'passwd@gmail19'
    }
  });
 
  var mailOptions = {
    from: 'saheb.bhowmick039@gmail.com',
    to: 'bhowmicksamir126@yahoo.com',
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
//
restService.get("/send", function(req,res){
  var text1 ="hello i am Samir!!!";

  var transporter1 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'saheb.bhowmick039@gmail.com',
      pass: 'Samir@arun!23'
    }
  });
  
  var mailOption = {
    from: 'saheb.bhowmick039@gmail.com',
    to: 'bhowmicksamir126@yahoo.com',
    to: 'samir251290@gmail.com',
    subject: 'Hello from !!',
    text: text1
  };
  
  transporter1.sendMail(mailOption, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return res.json({
    "status":"sent"
  });
});
//



restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
