const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === "number" && typeof b === "number") {
        resolve(a + b);
      } else {
        reject("Arguments must be numbers!");
      }
    }, 1500);
  });
};

asyncAdd(10, 20)
  .then(result => {
    console.log("Result: ", result);
    return asyncAdd(result, 42);
  })
  .then(result => {
    console.log("Should be 72 - ", result);
  })
  .catch(error => {
    console.log(error);
  });

// const somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve("Hey. It worked!");
//     reject("Unable to fulfill promise.");
//   }, 2500);
// });

// somePromise.then(
//   message => {
//     console.log("Success: ", message);
//   },
//   error => {
//     console.log("Error: ", error);
//   }
// );
