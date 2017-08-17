var express = require('express');
var Keytool = require('node-keytool');
var router = express.Router();
var https = require('https');
var fs = require('fs');
var certName;
var keyName;



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profiles',function(request,response,next) {
  var profile = {"name":"Jason","id":"787","Title":"Manager"};

  var store = Keytool('./certificate/KeyServerClientAuthKeyStore.jks', 'changeit', {debug: false, storetype: 'JKS'});

  store.list(function(err, res) {
    printlist(err, res);
});

  response.send(JSON.stringify(profile));

});

var printlist = function printlist(err, res) {
    if (err) {
        console.log('Error listing keystore content', err);
        return;
    }

    console.log('Keystore type: ' + res.storetype + ' Provider: ' + res.provider + ' (' + res.certs.length + ' certificates)');
    for (var certidx = 0; certidx < res.certs.length; certidx++) {
        var resobj = res.certs[certidx];
        console.log('#' + certidx, resobj.certtype, '(' + resobj.issued + ')', resobj.alias, resobj.algorithm, resobj.fingerprint);
    }

    certName = res.certs[0];
    var requestData = {"getProfileByIdRequest" : {"profileId":"8186b1c5-801c-4662-b876-9e05ec0d1e1b"}};
    keyName = res.certs[1];

    console.log('------Key Name------'+keyName);
    console.log('------Cert Name------'+certName);

  var options = {
    key:   keyName,  // Secret client key
    cert:  certName,  // Public client key
    // rejectUnauthorized: false,              // Used for self signed server
    host: "https://qa-api.apolloglobalqa.com/servicegateway/rest/profile/v2/getProfileById",
    method : "POST",
    body: JSON.stringify(requestData)                    // Server hostname
    //port: 8443                                 // Server port
};

callback = function(response) {
  var str = '';    
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log('-----------'+str);
  });
}

https.request(options, callback).end();


};

module.exports = router;
