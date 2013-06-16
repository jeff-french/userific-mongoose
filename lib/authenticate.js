module.exports = function(userData, cb) {
  var User = this.User
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
    if (!user) {
      return cb()
    }
    var password = userData.password
    // test a matching password
    user.comparePassword(password, function(err, isMatch) {
      var clientUser
      if (err) {
        return cb({
          message: 'failed to authenticate user',
          error: err,
          stack: new Error().stack
        })
      }
      if (isMatch) {
        clientUser = user.toClient()
        return cb(null, clientUser)
      }
      return cb({
        message: 'failed to authenticate user',
        error: 'password is incorrect',
        stack: new Error().stack
      })
    })
  })
}
