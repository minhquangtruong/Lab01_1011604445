const csv = require('csv-parser');
const fs = require('fs');

//Unlink the file
fs.unlink("canada.txt", (err) => {
    console.log("File Deleted")
})

fs.unlink("usa.txt", (err) => {
    console.log("File Deleted")
})
//Create file
fs.writeFile("canada.txt", 'country,year,population' ,(err)=>{
    if(err){
        console.error(err)
    }else{
        console.log("Write success")
    }
})

fs.writeFile("usa.txt", 'country,year,population' ,(err)=>{
    if(err){
        console.error(err)
    }else{
        console.log("Write success")
    }
})

function addCountry(path,country,year,population)
{
    const row = `\n${country},${year},${population}`;
    fs.appendFile(path, row, (err) => {
        if(err){
            console.error(err)
        }else{
            console.log("Append success")
        }
    })
}
//Read CSV and write
fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (row) => {
    if(row.country ==='Canada'){
        console.log(row);
        addCountry('canada.txt',row.country,row.year,row.population);
    }
    if(row.country ==='United States'){
        console.log(row);
        addCountry('usa.txt',row.country,row.year,row.population);
    }
    })
    .on('end', () => {
    console.log('CSV file successfully processed');
    });