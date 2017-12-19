const expect = require('expect');
const rewire = require('rewire');

const app = rewire('./app');

describe('App', () => {
  const db = {
    saveUser: expect.createSpy(),
  };
  app.__set__('db', db);

  it('should call the spy correctly', () => {
    const spy = expect.createSpy();
    spy('George', 21);

    expect(spy).toHaveBeenCalledWith('George', 21);
  });

  it('should call saveUser with user object', () => {
    const email = 'george.example.com';
    const password = 'asdf';

    app.handleSignup(email, password);
    expect(db.saveUser).toHaveBeenCalledWith({email, password});
  });
});
