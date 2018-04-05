const expect = require('expect');
const {app} = require('../server');

const request = require('supertest').agent(app.listen());

const {ObjectID} = require('mongodb');

const {Todo} = require('../models/todo');

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo',
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
  },
];

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

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
