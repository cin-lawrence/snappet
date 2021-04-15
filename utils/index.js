const fs = require('fs');

const promiseReadFile = (filePath, options) => new Promise(
  (resolve, reject) => {
    fs.readFile(filePath, options, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  },
);

const promiseWriteFile = (filePath, data) => new Promise(
  (resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  },
);

module.exports.promiseReadFile = promiseReadFile;

module.exports.getFileContent = (absolutePath) => (
  fs.readFileSync(absolutePath, 'utf8')
);

module.exports.sleep = (seconds) => new Promise(
  (resolve) => {
    setTimeout(() => { resolve(); }, seconds * 1000);
  },
);

module.exports.save = async (filePath, data) => {
  await promiseWriteFile(filePath, data);
};
