var inspect = require('eyespect').inspector()
var path = require('path')
var configFilePath = path.join(__dirname,'config.json')
var nconf = require('nconf').file({file: configFilePath})
var UserificMongoose = require('../')
var backend = new UserificMongoose()
var should = require('should')

var User = require('../lib/models/index').User
var testSuite = require('userific-test')


describe('Userific Mongoose Backend', function() {
  this.timeout('100s')

before(function(done) {
  User.find({}, done)
})
  beforeEach(function(done) {
    User.collection.drop(function(err) {
      should.not.exist(err, 'error dropping user collection')
      done()
    })
  })
  testSuite(backend)
})
