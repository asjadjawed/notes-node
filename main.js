const yargs = require("yargs");
const notes = require("./helpers/notes");

yargs.version("1.0.1");
yargs.usage("Node CLI Notes Manager\nmain.js <command> [options]");
yargs.demandCommand(1, "Missing command");

const title = {
  describe: "Note title",
  demandOption: true,
  type: "string",
};

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title,
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    try {
      notes.addNote(argv.title, argv.body);
    } catch (error) {
      console.error(error);
    }
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: { title },
  handler(argv) {
    try {
      notes.removeNote(argv.title);
    } catch (error) {
      console.error(error);
    }
  },
});

yargs.command({
  command: "list",
  describe: "Listing all notes",
  handler() {
    notes.listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "Reading the note",
  builder: { title },
  handler(argv) {
    try {
      notes.readNote(argv.title);
    } catch (error) {
      console.error(error);
    }
  },
});

yargs.help();

yargs.parse();
