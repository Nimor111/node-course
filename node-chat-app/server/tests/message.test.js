const expect = require('expect');
const faker = require('faker');

const {generateMessage, generateLocationMessage} = require('../utils/message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const longitude = faker.address.longitude();
    const latitude = faker.address.latitude();
    const name = faker.name.findName();

    const obj = generateLocationMessage(name, latitude, longitude);

    expect(obj.from).toBeTruthy();
    expect(obj.from).toBe(name);

    expect(obj.url).toBeTruthy();
    expect(obj.url).toBe(
      `https://www.google.com/maps?q=${latitude},${longitude}`,
    );

    expect(typeof obj.createdAt).toBe('number');
  });
});
