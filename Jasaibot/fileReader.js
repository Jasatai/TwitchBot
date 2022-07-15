// Requiring fs module in which
// readFile function is defined.
const fs = require('fs')

fs.readFile('test1.csv', (err, data) => {
	if (err) throw err;

	console.log(data.toString());
})