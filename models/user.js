var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  email: {type: String, lowercase: true, required: true},
  username: {type: String, lowercase: true, require: true, unique: true},
  password: String,
});


//compares the two passwords (one from the candidate user object, one from the login form) to ensure they are the same on signin, due to bcrypt
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  var pwd = this.password
  bcrypt.compare(candidatePassword, pwd, function(err, isMatch) {
    if (err) {return cb(err); }
    cb(null, isMatch);
  });
}

var USER = mongoose.model('user', userSchema);
module.exports = USER;
