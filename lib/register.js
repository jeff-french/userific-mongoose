var User = require('./user')
module.exports = function(userData, cb) {
  var email = userData.email
  var params = {
    email: email
  }
  User.findOne(params, function(err, user) {
    if (err) {
      return cb({
        message: 'failed to register user, error checking if user with given email already exists',
        error: err,
        stack: new Error().stack
      })
    }
    if (user) {
      return cb({
        message: 'failed to register',
        error: 'user with given email already exists',
        stack: new Error().stack
      })
    }
    user = new User(userData)
    var callback = function(err, user) {
      if (err) {
        return cb({
          message: 'failed to register user',
          error: err,
          stack: new Error().stack
        })
      }
      return cb(null, user)
    }
    user.save(callback);
  })
}
