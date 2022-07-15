// Requiring fs module in which
// readFile function is defined.
const fs = require('fs');

const try3 = fs.readFileSync('./test3.csv', {encoding:'utf8', flag:'r'});
const try3Dot3 = csv_To_Array(try3.toString());

console.log(`try3 to string:\n${try3.toString()}`);
console.log('\n\nnext\n');
console.log(`try3:\n${try3}`);
console.log('\n\nnext\n');
console.log('try3.3: ');
console.log(try3Dot3);

function csv_To_Array(str, delimiter = ",") {
  const header_cols = str.slice(0, str.indexOf("\n")).split(delimiter);
  const row_data = str.slice(str.indexOf("\n") + 1).split("\n");
  row_data.pop();
  const arr = row_data.map(function (row) {
    const values = row.split(delimiter);
    const el = header_cols.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  return arr;
}