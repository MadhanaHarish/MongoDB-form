// Required modules and setup
const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const port = 8000;

app.use(bodyparser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection and schema definition
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

app.post('/table', async (req, res) => {
    const detail = new Details({
        name: req.body.name,
        rollNumber: req.body.rollnumber,
        email: req.body.email,
        department: req.body.department
    });

    await detail.save();
    const details = await Details.find({});
    res.render('table', { details: details, deletes: false});
});

app.get('/update', async (req, res) => {
    const details = await Details.find({});
    res.render('tableUpdate', { details: details});
});

app.get('/update/updateform/:id', async (req, res) => {
    const detail = await Details.findById(req.params.id);
    res.render('updateForm',{detail: detail});
});
app.post('/update/updatedform/:id', async (req, res) => {
    let name = req.body.name;
    let rollNumber = req.body.rollNumber;
    let email = req.body.email;
    let department = req.body.department;
    await Details.findByIdAndUpdate(req.params.id, {
        name,
        rollNumber,
        email,
        department
    });
    const details = await Details.find({});
    res.render('tableUpdate', { details: details });
});

app.get('/delete', async (req, res) => {
    const details = await Details.find({});
    res.render('tableDelete', { details: details});
});
app.get('/delete/:id', async (req, res) => {
    await Details.findByIdAndDelete(req.params.id);
    const details = await Details.find({});
    res.render('tableDelete', { details: details });
});

app.listen(port, () => {
    console.log(`Server is started at http://localhost:${port}`);
});
