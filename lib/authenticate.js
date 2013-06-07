var User = require('./user')
module.exports = function(userData, cb) {
  // fetch user and test password verification
  var email = userData.email
  var params = {
    email: email
  }
  User.findOne(params, function(err, user) {
    if (err) {
      return cb({
        message: 'failed to authenticate user',
        error: err,
        stack: new Error().stack
      })
    }

    var password = userData.password
    // test a matching password
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return cb({
          message: 'failed to authenticate user',
          error: err,
          stack: new Error().stack
        })
      }
      if (isMatch) {
        return cb(null, user)
      }
      if (err) {
        return cb({
          message: 'failed to authenticate user',
          error: 'password is incorrect',
          stack: new Error().stack
        })
      }
    })
  })
}
