var mongoose = require('mongoose');

var Category = new mongoose.Schema({
  title: { type : String , required : true },
  amt: Number
});

Category.pre('remove', function(callback) {
    // Cascage delete from all the docs that refered to this record
    this.model('User').remove({ categories: this._id }, callback);
    this.model('Expense').remove({ category: this._id}, callback);
});

mongoose.model('Category', Category);
