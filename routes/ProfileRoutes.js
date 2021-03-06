var express = require('express');
var router = express.Router();
var https = require('https');
var fs = require('fs');
var profileConst = require('../util/ProfileConst');
var cors = require('cors');

//var oracledb = require('oracledb');


//Base welcome page Profile TEST Call
router.get('/index',cors(), function(request,response) {

    console.log('Profiles Service Call - /index')
  	response.send('Welcome to Profiles API Call');

});

//Router to get the profile details
router.get('/v1/profile/:profileId',cors(),function(request,response) {

	var profileId = request.params.profileId;
	console.log('Profile Id----'+profileId);
	var profileObj = {"firstName":"James","lastName":"Mark","email":"James@apl.com","phone":"5432212345"};
 
  console.log('-----Before Performing the service call----');


	if(profileObj != null) {
    console.log(JSON.stringify(profileObj));
		response.send(JSON.stringify(profileObj));
	}

});


//POST call to perform Profile Creation
//Sample JSON - {"firstName":"Philip","lastName":"Toman","email":"Philip@aol.com","phone":"3124454321"}
router.post('/v1/profile',cors(),function(req,res,next) {


   console.log('------Inside POST---------------');
   var str = JSON.stringify(req.body);
   console.log('Body JSON Request----'+str)
   var firstName = req.body.firstName;
   var lastName = req.body.lastName;
   var lastName = req.body.lastName;
   var email = req.body.email;
   var phone = req.body.phone;
   console.log('First Name----'+firstName);
   console.log('Last Name----'+lastName);
   console.log('Email----'+email);
   console.log('Phone----'+phone);

   var profileObj = {"firstName" : "James","lastName":"Mark","email":"James@apl.com","phone":"5432212345"};
   console.log('Reading Constant File--->'+profileConst.profileId);
	if(profileObj != null) {
		console.log('Sending Back');
		res.send(JSON.stringify(profileObj));
	}

});

/*
 *  Delete API Call Sample 
 */
router.delete('/v1/profile/:id',cors(),function(req,res,next) {
   console.log('------Inside DELETE---------------');
   var profileId = req.params.profileId;
   console.log('Profile Id----'+profileId);
   var profileObj = {"isProfileDeleted" : "Yes"};
   console.log('Reading Constant File--->'+profileConst.profileId);
  if(profileObj != null) {
    console.log('Sending Back');
    res.send(JSON.stringify(profileObj));
  }

});

/*
 *  Method to update the Profile
 */
router.put('/v1/profile/:id',cors(),function(req,res,next) {
  
   console.log('------Inside UPDATE Method---------------');
   var str = JSON.stringify(req.body);
   console.log('Body JSON Request----'+str)
   var firstName = req.body.firstName;
   var lastName = req.body.lastName;
   var lastName = req.body.lastName;
   var email = req.body.email;
   var phone = req.body.phone;
   console.log('First Name----'+firstName);
   console.log('Last Name----'+lastName);
   console.log('Email----'+email);
   console.log('Phone----'+phone);


   
  if(profileObj != null) {
    console.log('Sending Back');
    res.send(JSON.stringify(profileObj));
  }

});



module.exports = router;