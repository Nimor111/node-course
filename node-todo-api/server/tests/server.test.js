const expect = require('expect');
const {app} = require('../server');

const request = require('supertest').agent(app.listen());

const {ObjectID} = require('mongodb');

const {Todo} = require('../models/todo');
const {User} = require('../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', done => {
    const text = 'testerino';
    Todo.count({}, (err, todo_count) => {
      if (err) {
        done(err);
      }

      request
        .post('/todos')
        .send({text})
        .expect(200)
        .expect(res => {
          expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.find()
            .then(todos => {
              expect(todos.length).toBe(todo_count + 1);
              expect(todos[todo_count].text).toBe(text);
              done();
            })
            .catch(err => done(err));
        });
    });
  });

  it('should not create a new todo with invalid data', done => {
    Todo.count({}, (err, todo_count) => {
      request
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.find()
            .then(todos => {
              expect(todos.length).toBe(todo_count);
              done();
            })
            .catch(err => done(err));
        });
    });
  });
});

describe('GET /todos', () => {
  it('should get all todos', done => {
    request
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should get todo with valid id', done => {
    const id = todos[0]._id.toHexString();

    request
      .get(`/todos/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 on non-existent todo', done => {
    const non_existent_id = new ObjectID().toHexString();

    request
      .get(`/todos/${non_existent_id}`)
      .expect(404)
      .end(done);
  });

  it('should return 400 for malformed ids', done => {
    const fakeID = '123';

    request
      .get(`/todos/${fakeID}`)
      .expect(400)
      .end(done);
  });
});

describe('DELETE todos/:id', () => {
  it('should delete todo with valid id', done => {
    const id = todos[0]._id.toHexString();

    Todo.count({}, (err, todo_count) => {
      request
        .delete(`/todos/${id}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.find()
            .then(todos => {
              expect(todos.length).toBe(todo_count - 1);
              done();
            })
            .catch(err => done(err));
        });
    });
  });

  it('should return 404 on non-existing but valid id', done => {
    const non_existent_id = new ObjectID().toHexString();

    request
      .delete(`/todos/${non_existent_id}`)
      .expect(404)
      .end(done);
  });

  it('should return 400 on invalid id', done => {
    const invalid_id = '123';

    request
      .delete(`/todos/${invalid_id}`)
      .expect(400)
      .end(done);
  });
});

describe('PATCH todos/:id', () => {
  it('should update todo successfully with valid data', done => {
    const id = todos[0]._id.toHexString();
    const newObject = {text: 'New Text', completed: true};

    request
      .patch(`/todos/${id}`)
      .send(newObject)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(id)
          .then(todo => {
            expect(todo.text).toBe('New Text');
            expect(todo.completed).toBe(true);
            expect(typeof todo.completedAt).toBe('number');
            done();
          })
          .catch(err => {
            return done(err);
          });
      });
  });

  it('should return 404 on non-existent id', done => {
    const id = new ObjectID().toHexString();
    const newObject = {};

    request
      .patch(`/todos/${id}`)
      .send(newObject)
      .expect(404)
      .end(done);
  });

  it('should return 400 on invalid id', done => {
    const id = '123';
    const newObject = {};

    request
      .patch(`/todos/${id}`)
      .send(newObject)
      .expect(400)
      .end(done);
  });

  it('should clear completedAt when completed is false', done => {
    const id = todos[0]._id.toHexString();
    const newObject = {completed: false};

    request
      .patch(`/todos/${id}`)
      .send(newObject)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBe(null);
      })
      .end(done);
  });
});

describe('GET /users/profile', () => {
  it('should return a user if authenticated', done => {
    request
      .get('/users/profile')
      .set('x-auth', users[0].tokens.token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return a 401 if not authenticated', done => {
    request
      .get('/users/profile')
      .expect(401)
      .expect(res => expect(res.body).toEqual({}))
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create user', done => {
    const email = 'example@example.com';
    const password = '123xyz!!!';

    request
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end(err => {
        if (err) {
          return done(err);
        }

        User.findOne({email})
          .then(user => {
            expect(user).toBeTruthy();
            expect(user.password).not.toBe(password);
            done();
          })
          .catch(err => done(err));
      });
  });

  it('should raise validation errors if body invalid', done => {
    request
      .post('/users')
      .send({email: 'or', password: '123'})
      .expect(400)
      .end(done);
  });

  it('should not create user if email already in use', done => {
    request
      .post('/users')
      .send({email: users[0].email, password: 'Password123!'})
      .expect(400)
      .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login user successfully', done => {
    const credentials = {email: users[1].email, password: users[1].password};
    request
      .post('/users/login')
      .send(credentials)
      .expect(200)
      .expect(res => {
        expect(res.header['x-auth']).toBeTruthy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id)
          .then(user => {
            expect(user.tokens[0]).toHaveProperty('access', 'auth');
            expect(user.tokens[0]).toHaveProperty(
              'token',
              res.header['x-auth'],
            );
            done();
          })
          .catch(err => done(err));
      });
  });

  it('should reject login on invalid password', done => {
    const credentials = {email: users[1].email, password: '123'};
    request
      .post('/users/login')
      .send(credentials)
      .expect(400)
      .expect(res => {
        expect(res.header['x-auth']).toBeFalsy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id)
          .then(user => {
            expect(user.tokens.length).toEqual(0);
            done();
          })
          .catch(err => done(err));
      });
  });
});
