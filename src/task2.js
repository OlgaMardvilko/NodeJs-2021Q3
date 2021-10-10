const csv = require('csvtojson');
const fs = require('fs');
const { pipeline } = require('stream');

const readStream = fs.createReadStream('./src/csv/nodejs-hw1-ex1.csv');
const writeStream = fs.createWriteStream('./src/csv/csv-to-json.txt');

//readStream.pipe(csv()).pipe(writeStream);

pipeline(
  readStream,
  csv(),
  writeStream,
  (err) => console.error('Pipeline failed', err)
);
