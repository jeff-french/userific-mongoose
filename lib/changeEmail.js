var User = require('./models/index').User
module.exports = function(changeData, cb) {
  // fetch user and test password verification
  var currentEmail = changeData.currentEmail
  var params = {
    email: currentEmail
  }
  User.findOne(params, function(err, user) {
    if (err) {
      return cb({
        message: 'failed to change user email, user not found',
        error: err,
        stack: new Error().stack
      })
    }

    var newEmail = changeData.newEmail
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
