#!/usr/bin/node
const ulr = process.argv[2];
const request = require('request');
request
  .get(ulr)
  .on('response', function (response) {
    console.log(`code: ${response.statusCode}`);
  });
