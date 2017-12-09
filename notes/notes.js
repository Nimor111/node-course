const fs = require("fs");
const _ = require("lodash");

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync("notes-data.json");
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

const addNote = (title, body) => {
  let notes = fetchNotes();
  console.log("Notes: ", notes);

  const note = {
    title,
    body
  };

  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const getAll = () => {
  return fetchNotes();
};

const getNote = title => {
  const notes = fetchNotes();

  const [note] = _.filter(notes, note => note.title === title);

  return note;
};

const removeNote = title => {
  let notes = fetchNotes();

  const [note] = _.remove(notes, note => note.title === title);
  saveNotes(notes);

  return note;
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};
