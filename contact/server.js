const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const timestamp = new Date().toISOString();
        
        const data = {
            timestamp,
            name,
            email,
            message
        };

        // Save to a JSON file
        const filePath = path.join(__dirname, 'data', 'contacts.json');
        let contacts = [];
        
        try {
            const existing = await fs.readFile(filePath, 'utf8');
            contacts = JSON.parse(existing);
        } catch (error) {
            // File doesn't exist yet, that's OK
        }

        contacts.push(data);
        await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ error: 'Failed to save message' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
