const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

const data = {
  id: 10,
};

// second arg is string
const token = jwt.sign(data, '123abc');
console.log(token);

const decoded = jwt.verify(token, '123abc');
console.log(decoded);

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
