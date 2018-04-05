const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

const hashedPassword =
  '$2a$10$VdBj3q3lH13/M6j3FTpAe.8nW1TCNA5o86xn7zxFPf2H.U99qUUx2';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// const data = {
//   id: 10,
// };

// // second arg is string
// const token = jwt.sign(data, '123abc');
// console.log(token);

// const decoded = jwt.verify(token, '123abc');
// console.log(decoded);

// const message = 'I am user number 1';

// const hash = SHA256(message).toString();

// console.log(`Msg: ${message}\nHash: ${hash}`);

// const data = {
//   id: 4,
// };

// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString(),
// };

// const resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();

// // man in the middle, will break if no salt on hash - 'somesecret in this case'
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log("Data was changed. Don't trust!");
// }
//   console.log("Data was changed. Don't trust!");
// }
