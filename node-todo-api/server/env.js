const env = process.env.NODE_ENV || 'development';
console.log('**** env ****', env);

switch (env) {
  case 'development': {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
    break;
  }
  case 'test': {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
    break;
  }
  default:
    break;
}
