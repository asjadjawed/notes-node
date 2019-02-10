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
  .command("list", "List note titles")
  .command("read", "Read a note", {
    title
  })
  .command("add", "Add a note", {
    title,
    body
  })
  .command("remove", "Remove a note", {
    title
  })
  .help().argv;
const command = argv._[0];

if (command === "list") {
  notes.getAll();
} else if (command === "read") {
  notes.getNote(argv.title);
} else if (command === "add") {
  notes.addNote(argv.title, argv.body);
} else if (command === "remove") {
  notes.removeNote(argv.title);
} else {
  console.log("Invalid Command!");
}
