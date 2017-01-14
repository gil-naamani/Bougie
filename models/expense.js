var mongoose = require('mongoose');
var User     = mongoose.model('User');
var Category = mongoose.model('Category');

var Expense = new mongoose.Schema({
  description: { type : String , required : false },
  amt: Number,
  timestamp: {type: Date, default: Date.now},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Tag'
  }
});

mongoose.model('Expense', Expense);
