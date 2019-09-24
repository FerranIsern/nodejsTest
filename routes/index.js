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
  console.log("get clients");
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

    if (req.query.id && req.query.id != "")
      clients = clients.filter(item => item.id.includes(req.query.id));
    
    if (req.query.name && req.query.name != "")
      clients = clients.filter(item => item.name.includes(req.query.name));

    res.render('clients', {clients: clients, sort: req.query.sort, id: req.query.id, name: req.query.name});
  });
});

router.get('/policiesByClient', function(req, res, next) {
  console.log("get policies by username");
  request('http://www.mocky.io/v2/580891a4100000e8242b75c5', { json: true }, (err, resp, body) => {
    if (err) {
      console.log(err);
      res.render('error', {});
    }
    var policies = body.policies;

    if (req.query.name && req.query.name != "") {
      request('http://www.mocky.io/v2/5808862710000087232b75ac', { json: true }, (err, resp, body2) => {
        if (err) {
          console.log(err);
          res.render('error', {});
        }
        let client = body2.clients[body2.clients.map(function(x) {return x.name; }).indexOf(req.query.name)];
        console.log(client);
        console.log("---------------------------");
        console.log(policies);
        policies = policies.filter(item => item.clientId == client.id);

        res.render('policiesByUser', {policies: policies, name: client.name});
      });
    }
    else { 
      res.render('policiesByUser', {});
    }
  });
});

router.get('/userOfPolicy', function(req, res, next) {
  console.log("get user of policy");
  if (req.query.id && req.query.id != "") {
    request('http://www.mocky.io/v2/580891a4100000e8242b75c5', { json: true }, (err, resp, body) => {
      if (err) {
        console.log(err);
        res.render('error', {});
      }
      let policy = body.policies[body.policies.map(function(x) {return x.id; }).indexOf(req.query.id)];

        request('http://www.mocky.io/v2/5808862710000087232b75ac', { json: true }, (err, resp, body2) => {
          if (err) {
            console.log(err);
            res.render('error', {});
          }
          let client = body2.clients[body2.clients.map(function(x) {return x.id; }).indexOf(policy.clientId)];
          console.log(client);

          res.render('userOfPolicy', {client: client, policyId: policy.id});
        });
      });
    }
  else { 
    res.render('userOfPolicy', {});
  }
});

module.exports = router;
