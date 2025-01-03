const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/subscribe', async (req, res) => {
    const { email, name, age, gender, height, weight, goal } = req.body;

    try {
        const response = await axios.post(
            'https://a.klaviyo.com/api/v2/list/YqCaDC/subscribe?api_key=pk_ae2f5d07...',
            {
                profiles: [{ email, name, age, gender, height, weight, goal }]
            }
        );
        res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to subscribe' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
