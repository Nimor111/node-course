module.exports.add = (a, b) => a + b;

module.exports.square = x => x * x;

module.exports.setName = (user, fullName) => {
  const names = fullName.split(' ');

  const [firstName, lastName] = names;

  user.firstName = firstName;
  user.lastName = lastName;

  return user;
};
