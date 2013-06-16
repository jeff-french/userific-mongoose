var mongoose = require('mongoose')
module.exports = function(mongo) {
  var User = require('./user')
  var should = require('should')
  var connStr = buildConnectionString(mongo)
  mongoose.connect(connStr)
  // mongoose.connect(connStr, function(err) {
  //   should.not.exist(err, 'error connecting to mongodb console')
  //   console.log('Successfully connected to MongoDB')
  // })
  return {
    User: User
  }
}


  function buildConnectionString(mongo) {
    var connStr = 'mongodb://'
    var db = mongo.db
    var host = mongo.host
    var port = mongo.port
    var user = mongo.user
    var pass = mongo.pass
    var server = [host, port].join(':')
    if (user && pass) {
      connStr += user + ':' + pass + '@'
    }
    connStr += server + '/' + db
    return connStr
  }
