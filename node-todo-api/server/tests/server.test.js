const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/todo');

const todos = [
  {
    text: 'First test todo',
  },
  {
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

      request(app)
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
      request(app)
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
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});
