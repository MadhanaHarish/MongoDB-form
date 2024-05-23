const express = require('express');
const router = express.Router();
const Details = require('./main.js').Details; // Import the Details model from main.js
const url = require('url');

router.post('/table', url, async (req, res) => {
     {
        const detail = new Details({
            name: req.body.name,
            rollNumber: req.body.rollNumber,
            email: req.body.email,
            department: req.body.department
        });

        await detail.save();

        const details = await Details.find({});

        res.render('table', { details: details, deletes: false });
    }
});


router.get('/', (req, res) => {
    res.sendFile(__dirname+ '/mainForm.html');
});


module.exports = router; // Export the router correctly
