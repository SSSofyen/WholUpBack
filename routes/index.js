var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var options = {
  server: {
    socketOptions: {
      connectTimeoutMS: 30000
    }
  }
};
mongoose.connect('mongodb://sofyen:aaaa1234@ds141813.mlab.com:41813/wholup', options, function(err) {
  console.log(err);
});

 var userSchema = mongoose.Schema({first_name: String, last_name: String, email: String, password: String});
var userModel = mongoose.model("users", userSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signin', function(req, res, next) {
  userModel.find(
    {email:req.query.email, password:req.query.password},
    function(err, user){
      if (user.length == 1) {
         var isUserExist = true;
        res.json({user, isUserExist})
      }else{
        var isUserExist = false;
        res.json(isUserExist)
      }
    }
  )
});

router.post('/signup', function(req, res, next) {

  var user = new userModel({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: req.body.password});

  user.save(function(error, user) {
    res.json({user});
  });
});

module.exports = router;
