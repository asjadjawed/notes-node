const fs = require("fs");

const noteExists = (notes, title) =>
  notes.some(note => note.title.toLowerCase() === title.toLowerCase());

const saveNotes = notes =>
  fs.writeFile("notes.json", JSON.stringify(notes), err =>
    err ? console.error(err) : console.log("\nNotes Updated!")
  );

const displayNote = note =>
  console.log(`---\nTitle: ${note.title}\n---\nBody: ${note.body}`);

//#region Initializing notes.json
const initNotes = () => {
  try {
    return JSON.parse(fs.readFileSync("notes.json").toString());
  } catch (error) {
    console.log("Error Reading File\nInitializing notes.json...");
    saveNotes([]);
    return [];
  }
};

let notes = initNotes();
//#endregion

const addNote = (title, body) => {
  if (!noteExists(notes, title)) {
    let note = {
      title,
      body
    };
    notes = notes.concat(note);
    saveNotes(notes);
    displayNote(note);
  } else {
    console.log("Note already exits!");
  }
};

const getAll = () =>
  console.log("\nNotes:", ...notes.map(note => `\n${note.title}`));

const getNote = title => {
  if (noteExists(notes, title)) {
    let fetchedNote = notes.filter(
      note => note.title.toLowerCase() === title.toLowerCase()
    )[0];
    displayNote(fetchedNote);
  } else {
    console.log("Note not found!");
  }
};

const removeNote = title => {
  if (noteExists(notes, title)) {
    notes = notes.filter(
      note => note.title.toLowerCase() !== title.toLowerCase()
    );
    saveNotes(notes);
  } else {
    console.log("Note not found");
  }
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};
