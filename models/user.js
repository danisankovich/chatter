var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  email: {type: String, lowercase: true, required: true},
  username: {type: String, lowercase: true, require: true},
  password: String,
  aboutMe: String,
  avatar: String, //default to gravatar????
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  var pwd = this.password
  bcrypt.compare(candidatePassword, pwd, function(err, isMatch) {
    if (err) {return cb(err); }
    cb(null, isMatch);
  });
}
var USER = mongoose.model('user', userSchema);
module.exports = USER;
