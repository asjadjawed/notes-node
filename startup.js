const fs = require("fs");
const chalk = require("chalk");

const loadNotes = () => {
  try {
    return JSON.parse(fs.readFileSync("./data/notes.json").toString());
  } catch (error) {
    console.error(
      chalk.red.inverse("Resetting 'notes.json' - File missing / corrupt!")
    );
    return initNotes();
  }
};

const initNotes = () => {
  try {
    const loadedNotes = [];
    fs.writeFileSync("./data/notes.json", JSON.stringify(loadedNotes));
    console.log(chalk.green.inverse("Successfully reset - 'notes.json'"));
    return loadedNotes;
  } catch (error) {
    console.error(
      chalk.red(
        "FATAL ERROR: Unable to reset 'notes.json'\nDelete 'notes.json' manually."
      )
    );
    process.exit(1);
  }
};

const loadedNotes = loadNotes();

module.exports = { loadedNotes };
