const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: '{value} is not a valid email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  tokens: [
    {
      access: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// instance methods
UserSchema.methods.toJSON = function() {
  const user = this;

  const userObject = user.toObject();

  // do not return password or tokens
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt
    .sign({_id: user._id.toHexString(), access}, 'abc123')
    .toString();

  user.tokens = user.tokens.concat([{access, token}]);
  return user
    .save()
    .then(() => token)
    .catch(err => err);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};
