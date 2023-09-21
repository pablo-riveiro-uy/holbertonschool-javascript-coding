#!/usr/bin/node
const filename = process.argv[2];

const fs = require('fs');

fs.readFile(filename, 'utf-8', (err, res) => {
  if (res) {
    console.log(res);
  } else {
    console.error(err);
  }
});
