var register = require('./lib/register')
var authenticate = require('./lib/authenticate')
var changePassword = require('./lib/changePassword')
var changeEmail = require('./lib/changeEmail')
var UserificInterface = require('userific')

var models = require('./lib/models/index')
var UserModel = models.User
/**
 * Userfic Backend which uses a mongoose model and a MongoDB datastore
 * @return {[type]} [description]
 */
var Userific = function() {
  Userific.super_.call(this)
}
Userific.prototype = Object.create(UserificInterface.prototype)
Userific.super_ = UserificInterface

Userific.prototype.register = register
Userific.prototype.authenticate = authenticate
Userific.prototype.changePassword = changePassword
Userific.prototype.changeEmail = changeEmail

Userific.UserModel = UserModel

module.exports = Userific
