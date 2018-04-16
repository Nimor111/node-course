const expect = require('expect');
const faker = require('faker');

const {Users} = require('../utils/users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    const room = faker.lorem.word();
    users.users = [
      {
        id: faker.random.number(),
        name: faker.name.findName(),
        room: room,
      },
      {
        id: faker.random.number(),
        name: faker.name.findName(),
        room: faker.lorem.word(),
      },
      {
        id: faker.random.number(),
        name: faker.name.findName(),
        room: room,
      },
    ];
  });

  it('should add new user', () => {
    const users = new Users();

    const user = {
      id: faker.random.number(),
      name: faker.name.findName(),
      room: faker.lorem.word(),
    };

    const response = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names of users in first room', () => {
    const userList = users.getUserList(users.users[0].room);

    expect(userList).toEqual([users.users[0].name, users.users[2].name]);
  });

  it('should return names of users in second room', () => {
    const userList = users.getUserList(users.users[1].room);

    expect(userList).toEqual([users.users[1].name]);
  });

  it('should remove a user with valid id', () => {
    users.removeUser(users.users[0].id);

    expect(users.users.length).toBe(2);
  });

  it('should not remove user with id not in users list', () => {
    users.removeUser(faker.random.number());

    expect(users.users.length).toBe(3);
  });

  it('should get a user with valid id', () => {
    const user = users.getUser(users.users[0].id);

    expect(user.name).toBe(users.users[0].name);
    expect(user.room).toBe(users.users[0].room);
  });

  it('should not get a user with id not in users list', () => {
    const user = users.getUser(faker.random.number());

    expect(user).toBe(null);
  });
});
