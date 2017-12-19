module.exports.add = (a, b) => a + b;

module.exports.asyncAdd = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 1000);
};

module.exports.square = x => x * x;

module.exports.asyncSquare = (x, callback) => {
  setTimeout(() => {
    callback(x * x);
  }, 1000);
};

module.exports.setName = (user, fullName) => {
  const names = fullName.split(' ');

  const [firstName, lastName] = names;

  user.firstName = firstName;
  user.lastName = lastName;

  return user;
};
