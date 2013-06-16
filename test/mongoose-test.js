var should = require('should')
var path = require('path')
var configFilePath = path.join(__dirname, 'config.json')
var nconf = require('nconf').file({
  file: configFilePath
})
var mongo = nconf.get('mongo')
var UserificMongoose = require('../')
var backend = new UserificMongoose(mongo)
var User = backend.User
should.exist(User, 'user object not found')

var testSuite = require('userific-test')
describe('Userific Mongoose Backend', function() {
  this.timeout('100s')
  before(function(done) {
    User.find({}, done)
  })
  beforeEach(function(done) {
    User.collection.drop(function(err) {
      if (err && err.message != 'ns not found') done(err)
      done(null)
    })
  })
  it('should find user', function() {
    User.find({})
  })
  testSuite(backend)
})
