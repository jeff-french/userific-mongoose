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
        message: 'failed to change user email, user not found',
        error: err,
        stack: new Error().stack
      })
    }

    var newEmail = userData.newEmail
    user.email = newEmail
    user.save(function(err) {
      if (err) {
        return cb({
          message: 'failed to change user email',
          error: err,
          stack: new Error().stack
        })
      }
      return cb(null, user)
    })
  })
}
