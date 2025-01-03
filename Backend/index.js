const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/subscribe', async (req, res) => {
  try {
    const response = await axios.post(
      'https://a.klaviyo.com/api/v2/list/YqCaDC/subscribe',
      req.body,
      {
        params: { api_key: 'pk_ae2f5d07...' }, // Tu API key
      }
    );
    res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to subscribe' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
