const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes");

const title = {
  describe: "Title of note",
  demand: true,
  alias: "t"
};

const body = {
  describe: "Body of note",
  demand: true,
  alias: "b"
};

const argv = yargs
  .command("add", "Add a new note", {
    title: title,
    body: body
  })
  .command("list", "List all notes")
  .command("read", "Read an individual note", {
    title: title
  })
  .command("remove", "Remove an individual note", {
    title: title
  })
  .help().argv;

const command = argv._[0];

switch (command) {
  case "add":
    const note = notes.addNote(argv.title, argv.body);
    _.isUndefined(note)
      ? console.log("There is already a note with this title.")
      : console.log("Note created.");
    break;
  case "list":
    const allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).\n`);
    allNotes.forEach(note => {
      console.log(note.title);
      console.log(note.body);
    });
    break;
  case "read":
    const receivedNotes = notes.getNote(argv.title);
    _.isUndefined(receivedNotes)
      ? console.log(`No note with title ${argv.title}`)
      : console.log(
          `Title: ${receivedNotes.title}\nBody: ${receivedNotes.body}`
        );
    break;
  case "remove":
    const removedNote = notes.removeNote(argv.title);
    _.isUndefined(removedNote)
      ? console.log(`No note with title ${argv.title}`)
      : console.log(`Removed note with title ${removedNote.title}`);
    break;
  default:
    break;
}
