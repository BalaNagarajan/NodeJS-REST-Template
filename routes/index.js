var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profiles',function(request,response,next) {
  var profile = {"name":"Jason","id":"787","Title":"Manager"};
  response.send(JSON.stringify(profile));

});

module.exports = router;
