var User = require('../lib/user')
var should = require('should')
var UserificMongoose = require('../')
var testSuite = require('userific-test')
var mongoose = require('mongoose')
describe('Userific Mongoose Backend', function() {
  before(function(done) {
    var connStr = 'mongodb://localhost:27017/mongoose-bcrypt-test';
    mongoose.connect(connStr, function(err) {
      should.not.exist(err, 'error connecting to mongodb console')
      console.log('Successfully connected to MongoDB')
      done()
})
  })
  beforeEach(function(done) {
    User.collection.drop(done);
  })
  var backend = new UserificMongoose()
  testSuite(backend)
})
