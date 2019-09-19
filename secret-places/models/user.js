'use strict';

const mongoose = require('mongoose');
const Object = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true
  },
  _favorites:[{
    type: Object,
    ref: "Places"
  }]
});

const signInStatic = require('./user-login');
const signUpStatic = require('./user-signup');

userSchema.statics.signIn = signInStatic;
userSchema.statics.signUp = signUpStatic;

userSchema.statics.findByEmail = function(email) {
  const Model = this;
  return Model.findOne({ email })
    .then(user => {
      return Promise.resolve(user);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
