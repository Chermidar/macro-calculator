export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, age, gender, height, weight, goal } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const klaviyoApiUrl = 'https://a.klaviyo.com/api/v2/list/YqCaDC/subscribe';
    const apiKey = 'pk_ae2f5d07...'; // Reemplaza con tu API key real

    try {
        const response = await fetch(klaviyoApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                api_key: apiKey,
                profiles: [{ email, name, age, gender, height, weight, goal }]
            })
        });

        if (!response.ok) {
            throw new Error('Failed to subscribe');
        }

        res.status(200).json({ message: 'Subscription successful!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
