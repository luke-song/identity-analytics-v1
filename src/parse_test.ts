import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';



let issues = 0 as number;
let refreshes = 0 as number;

function updateCount(event: any) {
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
    .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows\nGate Passes Issued: `, issues, "\nGate Passes Refreshed: ", refreshes));

