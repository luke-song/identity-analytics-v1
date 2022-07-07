const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

let issues = 0;
let refreshes = 0;

function updateCount(event) {
    if (event === "IssueVanilla") {
        issues++;
    } else {
        // Assumes event === UpdateExpiry
        refreshes++;
    }
}

fs.createReadStream(path.resolve(__dirname, 'data.csv'))
    .pipe(csv.parse({ headers: [undefined, undefined, undefined, undefined, undefined, 'instruction_name', undefined, undefined, undefined, undefined, undefined, undefined, undefined, ] }))
    .on('error', (error) => console.error(error))
    .on('data', (row) => updateCount(row.instruction_name))
    .on('end', (rowCount) => console.log(`Parsed ${rowCount} rows\nGate Passes Issued: `, issues, "\nGate Passes Refreshed: ", refreshes));

