const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const port = 8000;

var url = bodyparser.urlencoded({ extended: false });
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb://127.0.0.1:27017/Experiment7', { useNewUrlParser: true, useUnifiedTopology: true });

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
        name: req.body.name,
        rollNumber: req.body.rollnumber,
        email: req.body.email,
        department: req.body.department
    });

    await detail.save();

    const details = await Details.find({});

    res.render('table.ejs', { details: details });
});

app.listen(port, () => {
    console.log(`Server is started at http://localhost:${port}`);
});
