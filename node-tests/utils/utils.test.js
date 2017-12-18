const expect = require('expect');

const utils = require('./utils');

it('should add two numbers', () => {
  const res = utils.add(33, 11);

  expect(res)
    .toBe(44)
    .toBeA('number');
});

it('should square a number', () => {
  const res = utils.square(11);

  expect(res)
    .toBe(121)
    .toBeA('number');
});

it('should expect some values', () => {
  expect(12).toNotBe(11);
  // toNotEqual
  expect({name: 'George'}).toEqual({name: 'George'});
  expect([2, 3, 4]).toInclude(4);
  expect([2, 3, 4]).toExclude(5);
  expect({name: 'George'}).toInclude({name: 'George'});
  expect({name: 'George'}).toExclude({name: 'Ivan'});
});

it('should update user', () => {
  const user = {firstName: 'Ivan', lastName: 'Rakitic'};

  expect(utils.setName(user, 'George Bozhinov')).toInclude({
    firstName: 'George',
    lastName: 'Bozhinov',
  });
});
