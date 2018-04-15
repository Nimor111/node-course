const expect = require('expect');
const faker = require('faker');

const {generateMessage} = require('../utils/message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const name = faker.name.findName();
    const text = faker.lorem.text();

    const obj = generateMessage(name, text);

    expect(obj.from).toBeTruthy();
    expect(obj.from).toBe(name);

    expect(obj.text).toBeTruthy();
    expect(obj.text).toBe(text);

    expect(typeof obj.createdAt).toBe('number');
  });
});
