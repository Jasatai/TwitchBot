// Requiring fs module in which
// readFile function is defined.
const fs = require('fs');

const try3 = fs.readFileSync('./test1.csv', {encoding:'utf8', flag:'r'});
const cmds = csv1(try3.toString());

console.log(`cmds:\n${cmds}`);

function csv_To_Array(str, delimiter = ",") {
    const row_data = str.slice(str.indexOf("\n") + 1).split("\n");
    var final_array = new Array();
    var field_data = new Array();
    var third_dimension = new Array();
    for (let i = 0; i < row_data.length; i++) {
        const e1 = row_data[i];
        console.log(`e1: ${e1}`);
        field_data.push(row_data[i].split(','));
        const fd = field_data;
        for (let j = 0; j < fd.length; j++) {
            const e2 = fd[j];
            console.log(`e2: ${e2}`);
            third_dimension.push(fd[j].split(';'));
            for (let k = 0; k < third_dimension.length; k++) {
                final_array[i][j].push(third_dimension[k]);
            }
        }
    }
    /*
    // This loop is for outer array
    for (var i = 0; i < row_data.length; i++) {
        // This loop is for inner-arrays
        row_data[i].slice(i, i+1);
        for (var j = 0, l2 = salary[i].length; j < l2; j++) {
            
            // Accessing each elements of inner-array
            documents.write( salary[i][j] ); 
        }
    }
    */

    // return the array
    return arr;
}

function csv1(str) {
    const rd2 = str.slice(str.indexOf("\n") + 1);
    const rd = rd2.split("\n")
    var localArr = new Array();
    //console.log(`\n1: \n${rd2}\n`);
    console.log(`\n2: \n${rd}\n`);
    rd.forEach(function(item, index, array) {
        console.log(item, index);
        localArr.push(csv2(rd[index]));
    });
    //console.log(`\ncsv1 local arr: \n${localArr}`);
    return localArr;
}
function csv2(rd) {
    const fd = rd.split(",");
    //console.log(`\n3: \n${fd}\n`);
    var localArr = new Array();
    fd.forEach(function(item, index, array) {
        console.log(item, index);
        if (index <= 1) {
            localArr.push(csv3(fd[index]));
        } else {
            localArr.push(fd[index]);
        }
    });
    //console.log(`\ncsv2 local arr: \n${localArr}`);
    return localArr;
}
function csv3(fd) {
    const td = fd.split(";");
    //console.log(`\n4: \n${td}\n`);
    var localArr = new Array();
    td.forEach(function(item, index, array) {
        console.log(item, index);
        localArr.push(td[index]);
    });
    for (let i = 0; i < td.length; i++) {
        localArr.push(td[i]);
        console.log(`${i}\t${td[i]}`);
    }
    //console.log(`\ncsv3 local arr: \n${localArr}`);
    return localArr;
}
