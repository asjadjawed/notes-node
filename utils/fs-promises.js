const fs = require("fs");

let fsReadFilePromise = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, readData) => {
      if (error) {
        reject(error);
      } else {
        readData = readData.toString();
        resolve(readData);
      }
    });
  });
};

let fsWriteFilePromise = (path, writeData) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, writeData, error => {
      if (error) {
        reject(error);
      }
    });
  });
};

module.exports = {
  fsReadFilePromise,
  fsWriteFilePromise
};
