import csv from 'csvtojson';
import fs from 'fs';
import { pipeline } from 'stream';
import FILE_PATH from './config';

const readStream = fs.createReadStream(FILE_PATH.CSV_PATH);
const writeStream = fs.createWriteStream(FILE_PATH.TXT_PATH);

pipeline(
  readStream,
  csv(),
  writeStream,
  (err) => console.error('Pipeline failed', err)
);
