var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt-nodejs')
var SALT_WORK_FACTOR = 10;
var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    var progressCallback = function(err, progress) {}
    bcrypt.hash(user.password, salt, progressCallback, function(err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });


});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
var UserModel = mongoose.model('User', UserSchema);
UserModel.prototype.toClient = function() {
  var self = this

  var clientUser = this.toObject();
  clientUser._id = clientUser._id.toString();
  delete clientUser.password;
  return clientUser
}
module.exports = UserModel
