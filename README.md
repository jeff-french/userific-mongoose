# Userfic Mongoose backend

Manage users using mongoose and MongoDB. This module implements the abstract [Userific](https://github.com/nisaacson/userific) interface

# Installation

```bash
npm install -S userific-mongoose
```

# Usage

```javascript
var UserificMongoose = require('userific-mongoose')
var config = {
  host: 'localhost',              // the host of the MongoDB server
  port: '27017',                  // the port of the MongoDB server
  db: 'userific-mongoose-test'    // the mongodb database to use
  user: 'mongodb username here',  // optional
  pass: 'mongodb username here',  // optional
}


var backend = new UserificMongoose(config)
// backend implements all the interface methods of the abstract Userific module
var registerData = {
    email: 'foo@example.com',
    password: 'barPassword'
}
backend.register(registerData, function(err, user) {
  if (err) {
    inspect(err, 'error registering user via the userific mongoose backend')
    return
  }
  inspect(user, 'registered user correctly')
})
```


# Test

```bash
# install development dependencies
npm install
# run tests
npm test
```
