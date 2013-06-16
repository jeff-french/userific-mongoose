module.exports = function(changeData, cb) {
  var User = this.User
  // fetch user and test password verification
  var email = changeData.email
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

    var password = changeData.currentPassword
    // test a matching password
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return cb({
          message: 'changePassword failed, error authenticating user with old password',
          error: err,
          stack: new Error().stack
        })
      }
      if (!isMatch) {
        return cb({
          message: 'failed to authenticate user',
          error: 'password is incorrect',
          stack: new Error().stack
        })
      }
      user.password = changeData.newPassword
      user.save(function(err) {
        if (err) {
          return cb({
            message: 'failed to change user password',
            error: err,
            stack: new Error().stack
          })
        }
        return cb(null, user.toClient())
      })
    })
  })
}
