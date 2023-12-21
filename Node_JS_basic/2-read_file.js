const fs = require('fs');

const csv = require('csv-parser');

const results = [];

const countStudents = (path) => {
  let stCount = 0;
  let FIELD = '';
  let FIELD2 = '';
  let stByField = 0;
  let stByField2 = 0;
  const LIST_OF_FIRSTNAMES = [];
  const LIST_OF_FIRSTNAMES2 = [];

  fs.readFile(path, (err, data) => {
    if (err) {
      throw new Error('Cannot load the database');
    }

    fs.createReadStream(path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        results.forEach((e) => {
          if (e.length !== 0) {
            stCount += 1;
          }
          if (!FIELD) FIELD = e.field;
          if (e.field === FIELD) {
            LIST_OF_FIRSTNAMES.push(e.firstname);
            stByField += 1;
          } else {
            FIELD2 = e.field;
            LIST_OF_FIRSTNAMES2.push(e.firstname);
            stByField2 += 1;
          }
        });

        process.stdout.write(`Number of students: ${stCount}\n`);

        process.stdout.write(`Number of students in ${FIELD}: ${stByField}. List: ${LIST_OF_FIRSTNAMES}\n`);
        process.stdout.write(`Number of students in ${FIELD2}: ${stByField2}. List: ${LIST_OF_FIRSTNAMES2}\n`);
      });
  });
};

module.exports = countStudents;
