var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var responseObj = require('../res').responseObj;
var User = mongoose.model('User');

//* GET routes
//****************

router.get('/', function(req, res, next) {
  User.find().populate([
    'categories',
    'tags',
    {path: 'expenses', populate: {path: 'category', model: 'Category'}},
    {path: 'expenses', populate: {path: 'tag', model: 'Tag'}}
  ]).exec(function(err, users){
    if(err){
      res.send(responseObj.failure({}, err));
    }

    res.send(responseObj.success(users));
  });
});

router.get('/:usr', function(req, res, next) {
  User.findOne({username:req.params.usr}).populate([
    'categories',
    'tags',
    {path: 'expenses', populate: {path: 'category', model: 'Category'}},
    {path: 'expenses', populate: {path: 'tag', model: 'Tag'}}
  ]).exec(function(err, user){
    if(err){
      res.send(responseObj.failure(user, err));
    }
    res.send(responseObj.success(user));
  });

});

//* POST routes
//****************

router.post('/', function(req, res, next) {

  //generate a token and hash the password
  req.body['token'] = newToken(req.body.username);
  req.body['password'] = md5hash(req.body.password);

  var user = new User(req.body);

  user.save(function(err, user){
    if(err){
        res.send(responseObj.failure({}, err));
     }

    res.send(responseObj.success(user));
  });
});

//* PUT routes
//****************

router.put('/', function(req, res, next) {

  //generate a token and hash the password
  req.body['token'] = newToken(req.body.username);
  req.body['password'] = md5hash(req.body.password);

  var query = {$and: [{username: req.body.username}, {password: req.body.password}]},
      update = { token: req.body.token, last_login: Date.now()},
      options = { upsert: true };

  // Find the user
  User.findOneAndUpdate(query, update, options, function(err, user) {
      if (!err) {
          // send error if the user doesn't exist
          if (!user) {
            res.send(responseObj.failure({ username : username, token : null}, 'invalid username or password'));
          }
          // update the user's token
          user.save(function(err, user) {
            if(err){
              responseObj.failure({}, err);
            }

            User.findOne({_id : user._id}).populate([
              'categories',
              'tags',
              {path: 'expenses', populate: {path: 'category', model: 'Category'}},
              {path: 'expenses', populate: {path: 'tag', model: 'Tag'}}
            ]).exec(function(err, user){
              res.send(responseObj.success(user));
            });
          });
      }
  });
});

router.put('/categories', function(req, res, next) {

  var userId = req.body.id;
  var categoryId = req.body.category;
  // Find the user
  User.findOne({_id : userId}).populate('categories').exec(function(err, user){
    if(err){
      res.send(responseObj.failure(user, err));
    }

    if (!user) {
      res.send(responseObj.failure({ id : userId }, 'user not found'));
    }
    user.categories.push(mongoose.Types.ObjectId(categoryId));
    user.save(function(err, user) {
      if(err){
        responseObj.failure({}, err);
      }

      User.findOne({_id : user._id}).populate([
        'categories',
        'tags',
        {path: 'expenses', populate: {path: 'category', model: 'Category'}},
        {path: 'expenses', populate: {path: 'tag', model: 'Tag'}}
      ]).exec(function(err, user){
        res.send(responseObj.success(user));
      });
    });
  });
});

router.put('/tags', function(req, res, next) {

  var userId = req.body.id;
  var tagId = req.body.tag;
  // Find the user
  User.findOne({_id : userId}).populate('tags').exec(function(err, user){
    if(err){
      res.send(responseObj.failure(user, err));
    }

    if (!user) {
      res.send(responseObj.failure({ id : userId }, 'user not found'));
    }
    user.tags.push(mongoose.Types.ObjectId(tagId));
    user.save(function(err, user) {
      if(err){
        responseObj.failure({}, err);
      }

      User.findOne({_id : user._id}).populate([
        'categories',
        'tags',
        {path: 'expenses', populate: {path: 'category', model: 'Category'}},
        {path: 'expenses', populate: {path: 'tag', model: 'Tag'}}
      ]).exec(function(err, user){
        res.send(responseObj.success(user));
      });
    });
  });
});

router.put('/expenses', function(req, res, next) {

  var userId = req.body.id;
  var expenseId = req.body.expense;
  // Find the user
  User.findOne({_id : userId}).populate('expenses').exec(function(err, user){
    if(err){
      res.send(responseObj.failure(user, err));
    }

    if (!user) {
      res.send(responseObj.failure({ id : userId }, 'user not found'));
    }
    user.expenses.push(mongoose.Types.ObjectId(expenseId));
    user.save(function(err, user) {
      if(err){
        responseObj.failure({}, err);
      }

      User.findOne({_id : user._id}).populate([
        'categories',
        'tags',
        {path: 'expenses', populate: {path: 'category', model: 'Category'}},
        {path: 'expenses', populate: {path: 'tag', model: 'Tag'}}
      ]).exec(function(err, user){
        res.send(responseObj.success(user));
      });
    });
  });
});

router.put('/:id/amt', function(req, res, next) {

  var query = {_id: req.params.id},
      update = { token: req.params.amt },
      options = { upsert: true };

  // Find the user
  User.findOneAndUpdate(query, update, options, function(err, user) {
      if (!err) {
          // send error if the user doesn't exist
          if (!user) {
            res.send(responseObj.failure({}, 'user not found'));
          }
          // update the user's token
          user.save(function(err, user) {
            if(err){
              responseObj.failure({}, err);
            }

            res.send(responseObj.success(user));
          });
      }
  });
});

//* DELETE routes
//****************

router.delete('/:username', function(req, res, next){

  User.remove({ username: req.params.username }, function(err) {
    if (!err) {
      res.send(responseObj.success());
    }
    else {
      res.send(responseObj.failure({ username : req.params.username }, 'error deleting user'));
    }
  });
});

//* Helpers
//****************

var newToken = function(username){
  return jwt.sign({user : username}, process.env.JWT_SECRET, { expiresIn: '1h' });
};

var md5hash = function(password){
  return crypto.createHash('md5').update(password).digest('hex');
};

module.exports = router;
