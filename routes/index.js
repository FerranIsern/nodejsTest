var express = require('express');
var router = express.Router();

const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cool, huh!', condition: true, anyArray: [1,2,3] });
});

router.get('/clients', function(req, res, next) {
  console.log("get users by id");
  request('http://www.mocky.io/v2/5808862710000087232b75ac', { json: true }, (err, resp, body) => {
    if (err) {
      console.log(err);
      res.render('error', {});
    }
    var clients = body.clients;
    clients.sort((a, b) => a.id.localeCompare(b.id));
    res.render('test', {clients: clients});
  });
});

module.exports = router;
