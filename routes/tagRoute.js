var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var responseObj = require('../res').responseObj;
var Tag = mongoose.model('Tag')
var User = mongoose.model('User');


//* GET routes
//****************

router.get('/', function(req, res, next) {
  Tag.find(function(err, categories){
    if(err){
      res.send(responseObj.failure({}, err));
    }

    res.send(responseObj.success(categories));
  });
});

router.get('/:id', function(req, res, next) {

  Tag.findOne({_id:req.params.id},function(err, cat){
    if(err){
      res.send(responseObj.failure(cat, err));
    }

    res.send(responseObj.success(cat));
  });

});

//* POST routes
//****************

router.post('/', function(req, res, next) {

  var tag = new Tag(req.body);

  tag.save(function(err, cat){
    if(err){
        res.send(responseObj.failure({}, err));
     }

    res.send(responseObj.success(cat));
  });
});

//* PUT routes
//****************

router.put('/', function(req, res, next) {

  var query = {_id: req.body.id},
      update = { title: req.body.title },
      options = { upsert: true };

  // Find the category and update
  Tag.findOneAndUpdate(query, update, options, function(err, tag) {
      if (!err) {
          // send error if the user doesn't exist
          if (!tag) {
            res.send(responseObj.failure({}, 'tag not found'));
          }
          tag.save(function(err, tag) {
            if(err){ return next(err); }

            res.send(responseObj.success(update));
          });
      }
  });
});

//* DELETE routes
//****************

router.delete('/:id', function(req, res, next){

  Tag.remove({ _id: req.params.id }, function(err) {
    if (!err) {
      res.send(responseObj.success());
    }
    else {
      res.send(responseObj.failure({ id : req.params.id }, 'error deleting tag'));
    }
  });
});

module.exports = router;
