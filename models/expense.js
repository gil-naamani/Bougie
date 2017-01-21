var mongoose = require('mongoose');
var User     = mongoose.model('User');
var Category = mongoose.model('Category');

var Expense = new mongoose.Schema({
  description: { type : String , required : false },
  amt: Number,
  timestamp: {type: Date, default: Date.now},
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Tag'
  }
});

Expense.pre('remove', function(callback) {
    // Cascage delete from all the docs that refered to this record
    this.model('User').remove({ expenses: this._id }, callback);
});

mongoose.model('Expense', Expense);
