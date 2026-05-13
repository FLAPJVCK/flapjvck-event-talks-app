const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/talks', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'talks.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading talks data:', err);
            return res.status(500).json({ error: 'Failed to load talks data' });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
