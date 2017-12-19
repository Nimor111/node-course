const db = require('./db');

module.exports.handleSignup = (email, password) => {
  // Check if email exists
  db.saveUser({
    email,
    password,
  });
  // Save user to db
  // Send welcome email
};
