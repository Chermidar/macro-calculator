const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta principal para manejar la solicitud POST
app.post('/subscribe', (req, res) => {
    const { name, email, age, gender, height, weight, goal } = req.body;

    if (!name || !email || !age || !height || !weight || !goal) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Aquí puedes realizar la llamada a la API de Klaviyo usando fetch o axios
    // Ejemplo con axios:
    const axios = require('axios');
    const klaviyoApiUrl = 'https://a.klaviyo.com/api/v2/list/YqCaDC/subscribe';
    const apiKey = 'pk_ae2f5d07...'; // Reemplaza con tu clave de API real

    axios.post(klaviyoApiUrl, {
        api_key: apiKey,
        profiles: [{ email, name, age, gender, height, weight, goal }]
    })
    .then(response => {
        res.status(200).json({ message: 'Subscription successful!' });
    })
    .catch(error => {
        console.error('Error subscribing to Klaviyo:', error);
        res.status(500).json({ error: 'Failed to subscribe to Klaviyo.' });
    });
});

// Escuchar en el puerto configurado
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
