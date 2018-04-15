// Jan 1st 00:00:00 am - first moment

const moment = require('moment');

// const date = new Date();
// console.log(date.getMonth());

// const date = moment();
// date.add(100, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));

// 10:35 am
// 6:01 am

const someTimestamp = moment().valueOf();
console.log(someTimestamp);

const createdAt = 1234;
const date = moment(createdAt);
console.log(date.format('HH:mm a'));
console.log(date.format('hh:mm a'));
