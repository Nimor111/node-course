// const obj = {
//   name: "Georgi"
// };

// const stringObj = JSON.stringify(obj);
// console.log(stringObj)

// const personString = '{"name": "George", "ivan": "Rakitic"}';
// const person = JSON.parse(personString);
// console.log(typeof person);
// console.log(person);

const fs = require("fs");

const originalNote = {
  title: "Some title",
  body: "Some body"
};

const originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync("notes.json", originalNoteString);

const noteString = fs.readFileSync("notes.json");
const note = JSON.parse(noteString);
console.log(note.title);
