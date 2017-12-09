const square = x => {
  const result = x * x;
  return result;
};

const expr_square = x => x * x;

console.log(square(9));
console.log(expr_square(9));

const user = {
  name: "George",
  sayHi: () => {
    // console.log(arguments); // not 1 2 3 :D
    console.log(`Hi`);
  },
  sayHiAlt() {
    console.log(arguments);
    console.log(`Hi. I'm ${this.name}`);
  }
};

user.sayHi(1, 2, 3);
user.sayHiAlt(1, 2, 3);
