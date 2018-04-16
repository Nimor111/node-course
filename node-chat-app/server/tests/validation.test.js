const expect = require('expect');
const faker = require('faker');

const {isRealString} = require('../utils/validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const str = 123;
    expect(isRealString(str)).toBe(false);
  });

  it('should reject string with only spaces', () => {
    const str = '   ';
    expect(isRealString(str)).toBe(false);
  });

  it('should allow string with not only space characters', () => {
    const str = faker.lorem.word();
    expect(isRealString(str)).toBe(true);
  });
});
