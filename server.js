const express = require('express');
const app = express();
const PORT = 80;
const csvFilePath = 'sample_csv.csv'; //Path to CSV file. Edit this line to refer to the path to your CSV file.
const fs = require('fs');
const csv = require('csv-parser');

app.use(express.json());


app.get('/', (req, res) => {
    let returnJson = {
        'status': 'In Operation',
        'GET /get': 'Fetch CSV Data',
        'POST /push': 'Append item to CSV',
        'POST /delete {index: n}': 'Delete item n from CSV',
        'GET|POST /deletelastrow': 'Delete last item from CSV'
    };
    res.json(returnJson);
});

app.get('/get', (req, res) => {   
    const results = [];

    fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
        results.push(row);
    })
    .on('end', () => {
        res.json({results}); // Array of objects
    });
    console.log('CSV data fetched');
});

app.post('/push', (req, res) => {
    jsonData = req.body;
    keys = Object.keys(jsonData);
    keyArray = [];
    for(let key of keys){
        keyArray.push(jsonData[key]);
    };
    let csvData = fs.readFileSync(csvFilePath, 'utf8'); //Check line break
    if (!csvData.endsWith('\n')) {
        csvData += '\n';
        fs.writeFileSync(csvFilePath, csvData, 'utf8');
    }
    csvRow = keyArray.join(',') + '\n';
    try{
        fs.appendFileSync(csvFilePath, csvRow, 'utf8');
        console.log("Row Appended to CSV");
        res.json({result: "Success"});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({result: "Failed"});
    };
});

app.post('/delete', (req, res) => { 
    reqJsonData = req.body;
    if(reqJsonData["index"] <= 0)
    {
        console.log("Item Doesn\'t Exist");
        res.status(500).json({result: "Failed"});
        return;
    }
    let lines = [];
    let csvData = fs.readFileSync(csvFilePath, 'utf8'); //Check line break
    try{
        if (!csvData.endsWith('\n')) {
            csvData += '\n';
            fs.writeFileSync(csvFilePath, csvData, 'utf8');
        };
        lines = csvData.trim().split('\n');
        let removed = lines.splice(reqJsonData["index"], 1);
        if(removed.length == 0){
            console.log("Item Doesn\'t Exist");
            res.status(500).json({result: "Failed"});
            return;
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({result: "Failed"});
    };
    try{
        fs.writeFileSync(csvFilePath, lines.join('\n'), 'utf8');
        if (!csvData.endsWith('\n')) {
        csvData += '\n';
        fs.writeFileSync(csvFilePath, csvData, 'utf8');
        };
        console.log("Row Deleted from CSV");
        res.json({result: "Success"});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({result: "Failed"});
    };
});

app.get('/deletelastrow', (req, res) => {
    let lines = [];
    let csvData = fs.readFileSync(csvFilePath, 'utf8'); //Check line break
    try{
        if (!csvData.endsWith('\n')) {
            csvData += '\n';
            fs.writeFileSync(csvFilePath, csvData, 'utf8');
        };
        lines = csvData.trim().split('\n');
        if(lines.length > 1){
            lines.pop();
        }
        else
        {
            console.log("No Items Left");
            res.status(500).json({result: "Failed"});
            return;
        };
    }
    catch (err) {
        console.log(err);
        res.status(500).json({result: "Failed"});
    };
    try{
        fs.writeFileSync(csvFilePath, lines.join('\n'), 'utf8');
        if (!csvData.endsWith('\n')) {
        csvData += '\n';
        fs.writeFileSync(csvFilePath, csvData, 'utf8');
        };
        console.log("Last Row Deleted from CSV");
        res.json({result: "Success"});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({result: "Failed"});
    };
});


app.post('/deletelastrow', (req, res) => {
    let lines = [];
    let csvData = fs.readFileSync(csvFilePath, 'utf8'); //Check line break
    try{
        if (!csvData.endsWith('\n')) {
            csvData += '\n';
            fs.writeFileSync(csvFilePath, csvData, 'utf8');
        };
        lines = csvData.trim().split('\n');
        if(lines.length > 1){
            lines.pop();
        }
        else
        {
            console.log("No Items Left");
            res.status(500).json({result: "Failed"});
            return;
        };
    }
    catch (err) {
        console.log(err);
        res.status(500).json({result: "Failed"});
    };
    try{
        fs.writeFileSync(csvFilePath, lines.join('\n'), 'utf8');
        if (!csvData.endsWith('\n')) {
        csvData += '\n';
        fs.writeFileSync(csvFilePath, csvData, 'utf8');
        };
        console.log("Last Row Deleted from CSV");
        res.json({result: "Success"});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({result: "Failed"});
    };
});

app.listen(PORT, () => {
    console.log('Started');

});
