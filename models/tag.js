var mongoose = require('mongoose');

var Tag = new mongoose.Schema({
  title: { type : String , required : true },
});

Tag.pre('remove', function(callback) {
    // Cascage delete from all the docs that refered to this record
    this.model('User').remove({ tag: this._id }, callback);
    this.model('Expense').remove({ tag: this._id}, callback);
});

mongoose.model('Tag', Tag);
