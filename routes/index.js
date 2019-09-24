var express = require('express');
var router = express.Router();

const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

// clients    http://www.mocky.io/v2/5808862710000087232b75ac

// policies   http://www.mocky.io/v2/580891a4100000e8242b75c5

router.get('/clients', function(req, res, next) {
  console.log("get users by id");
  request('http://www.mocky.io/v2/5808862710000087232b75ac', { json: true }, (err, resp, body) => {
    if (err) {
      console.log(err);
      res.render('error', {});
    }
    var clients = body.clients;
    if (req.query.sort == "id")
      clients.sort((a, b) => a.id.localeCompare(b.id));
    else if (req.query.sort == "name")
      clients.sort((a, b) => a.name.localeCompare(b.name));
    res.render('test', {clients: clients});
  });
});


module.exports = router;
