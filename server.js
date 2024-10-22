// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());


let wellnessData = [];

app.post('/calculate-bmi', (req, res) => {
    const { height, weight } = req.body;

    if (!height || !weight) {
        return res.status(400).json({ error: 'Height and weight are required.' });
    }

    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    let category = '';

    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }

    res.json({ bmi, category });
});

// Route to log wellness data
app.post('/log-wellness', (req, res) => {
    const { steps, water, sleep, mood } = req.body;

    if (!steps || !water || !sleep || !mood) {
        return res.status(400).json({ error: 'All wellness data fields are required.' });
    }

    const dataEntry = { steps, water, sleep, mood, date: new Date() };
    wellnessData.push(dataEntry);
    res.status(201).json(dataEntry);
});

// Route to get wellness data
app.get('/wellness-data', (req, res) => {
    res.json(wellnessData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
