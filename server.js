const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));

// Guest list data
const guestList = {
    "Principal Sponsors": [
        "Bryan & Daisy Manongsong",
        "Mr & Mrs Basco",
        "Mr & Mrs Castillo",
        "Mr & Mrs Cafino",
        "Mr & Mrs Belango"
    ],
    "Best Man": ["Gelo Cafino"],
    "Maid of Honor": ["Myta Villamor"],
    "Grooms Men": [
        "John Michael Tungala",
        "Christian Bucad",
        "Tyrone De Asis",
        "Con Serrano",
        "Elias Tanate III",
        "Joshua Chavez",
        "Julius Paul Cabasa",
        "Lorezo Dipad",
        "Sheen Reyes",
        "Ian Lavapie"
    ],
    "Brides Maid": [
        "Brides Maid 1", "Brides Maid 2", "Brides Maid 3", "Brides Maid 4", "Brides Maid 5",
        "Brides Maid 6", "Brides Maid 7", "Brides Maid 8", "Brides Maid 9", "Brides Maid 10"
    ]
};

// Companion limits by category
const companionLimits = {
    "Principal Sponsors": 3,
    "Best Man": 3,
    "Maid of Honor": 3,
    "Grooms Men": 1,
    "Brides Maid": 1
};

// Serve guest list
app.get('/api/guests', (req, res) => {
    res.json(guestList);
});

// Serve companions data
app.get('/api/companions', (req, res) => {
    // Serve data from JSON file
    fs.readFile('companionsData.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading companions data');
        }
        res.json(JSON.parse(data));
    });
});

// Update companions data
app.post('/api/companions', (req, res) => {
    const { guest, companions } = req.body;

    // Validate companion count
    if (companionLimits[guest.category] >= companions.length) {
        fs.readFile('companionsData.json', 'utf8', (err, data) => {
            if (err) {
                return res.status(500).send('Error reading companions data');
            }

            const companionsData = JSON.parse(data);
            companionsData[guest.name] = companions;

            fs.writeFile('companionsData.json', JSON.stringify(companionsData, null, 2), (err) => {
                if (err) {
                    return res.status(500).send('Error saving companions data');
                }
                res.send('Companions updated successfully');
            });
        });
    } else {
        res.status(400).send('Companion limit exceeded');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
