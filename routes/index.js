var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/webhook', function(req, res, next) {

  var text = req.body.queryResult.parameters.mail | req.body.queryResult.parameters.message;
  res.json({
    fulfillmentText: text,
    fulfillmentMessages: [
      {
        "text": {
          "text": [
            text
          ]
        }
      }
    ],
    source: "webhook-echo-sample"
  });
});



module.exports = router;
