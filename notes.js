const fs = require("fs");
const chalk = require("chalk");

const { fsWriteFilePromise } = require("./utils/fs-promises");

let loadedNotes;

try {
  loadedNotes = JSON.parse(fs.readFileSync("./notes.json").toString());
} catch (error) {
  console.error(
    chalk.red.inverse("Resetting 'notes.json' - File missing / corrupt!")
  );
  loadedNotes = [];
  fsWriteFilePromise("./notes.json", JSON.stringify(loadedNotes)).catch(error =>
    console.error(error)
  );
}

const addNote = (title, body) => {
  if (
    loadedNotes.some(note => note.title.toLowerCase() === title.toLowerCase())
  ) {
    throw chalk.red.inverse("Note title taken");
  } else {
    loadedNotes.push({ title, body });
    fsWriteFilePromise("./notes.json", JSON.stringify(loadedNotes)).catch(
      error => console.error(error)
    );
    console.log(chalk.green.inverse("Note Added!"));
  }
};

const removeNote = title => {
  if (
    !loadedNotes.some(note => note.title.toLowerCase() === title.toLowerCase())
  ) {
    throw chalk.red.inverse("Note doesn't exist");
  } else {
    loadedNotes = loadedNotes.filter(
      note => note.title.toLowerCase() !== title.toLowerCase()
    );
    fsWriteFilePromise("./notes.json", JSON.stringify(loadedNotes)).catch(
      error => console.error(error)
    );
    console.log(chalk.green.inverse("Note removed!"));
  }
};

const listNotes = () => {
  console.log(chalk.blue.inverse("Your notes:"));
  loadedNotes.forEach(note => console.log(`(*) - ${note.title}`));
};

const readNote = title => {
  const selectedNote = loadedNotes.filter(
    note => note.title.toLowerCase() === title.toLowerCase()
  );

  if (!selectedNote.length) {
    throw chalk.red.inverse("Note doesn't exist");
  } else {
    console.log(`\n--=${selectedNote[0].title}=--\n${selectedNote[0].body}\n`);
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
};
