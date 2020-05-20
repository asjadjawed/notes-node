const chalk = require("chalk");
const { fsWriteFilePromise } = require("./utils/fs-promises");

let { loadedNotes } = require("./startup");

const addNote = (title, body) => {
  if (
    loadedNotes.some((note) => note.title.toLowerCase() === title.toLowerCase())
  ) {
    throw chalk.red.inverse("Note title taken");
  } else {
    loadedNotes.push({ title, body });
    fsWriteFilePromise("./notes.json", JSON.stringify(loadedNotes))
      .then(() => console.log(chalk.green.inverse("Note Added!")))
      .catch(() =>
        console.error(chalk.red.inverse("Unable to write to 'notes.json'"))
      );
  }
};

const removeNote = (title) => {
  if (
    !loadedNotes.some(
      (note) => note.title.toLowerCase() === title.toLowerCase()
    )
  ) {
    throw chalk.red.inverse("Note doesn't exist");
  } else {
    loadedNotes = loadedNotes.filter(
      (note) => note.title.toLowerCase() !== title.toLowerCase()
    );
    fsWriteFilePromise(
      "./notes.json",
      JSON.stringify(loadedNotes)
    ).catch((error) => console.error(error));
    console.log(chalk.green.inverse("Note removed!"));
  }
};

const listNotes = () => {
  if (loadedNotes.length === 0)
    return console.log(chalk.yellow.inverse("No notes found!"));
  console.log(chalk.blue.inverse("Your notes:"));
  loadedNotes.forEach((note) => console.log(`(*) - ${note.title}`));
};

const readNote = (title) => {
  const selectedNote = loadedNotes.filter(
    (note) => note.title.toLowerCase() === title.toLowerCase()
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
  readNote,
};
