const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const port = 8000;

var url=bodyparser.urlencoded({extended:false});
//app.use(bodyparser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

mongoose.connect('mongodb://127.0.0.1:27017/Experiment7');

const studentSchema = new mongoose.Schema({
    name: String,
    rollNumber: String,
    email: String,
    department: String
});

const Details = mongoose.model('Details', studentSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'mainForm.html'));
});

app.post('/table', url, async (req, res) => {
    const detail = new Details({
        name: req.body.rollnumber,
        rollNumber: req.body.rollnumber,
        email: req.body.email,
        department: req.body.department
    });

    await detail.save();

    res.send("File added successfully");
});

app.listen(port, () => {
    console.log(`Server is started at http://localhost:${port}`);
});
