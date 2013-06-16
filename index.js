/**
 * Userfic Backend which uses a mongoose model and a MongoDB datastore
 * @return {[type]} [description]
 */
var UserificInterface = require('userific')
var Userific = function(config) {
  var models = require('./lib/models/index')(config)
  this.User = models.User
  this.register = require('./lib/register').bind(this)
  this.authenticate = require('./lib/authenticate').bind(this)
  this.changePassword = require('./lib/changePassword').bind(this)
  this.changeEmail = require('./lib/changeEmail').bind(this)
  Userific.super_.call(this)
}
Userific.prototype = Object.create(UserificInterface.prototype)
Userific.super_ = UserificInterface
module.exports = Userific
