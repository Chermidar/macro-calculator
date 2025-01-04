export default async function handler(req, res) {
    if (req.method === 'POST') {
        const apiKey = process.env.BREVO_API_KEY;
        const data = req.body;

        const endpoint = 'https://api.brevo.com/v3/contacts';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': apiKey
                },
                body: JSON.stringify({
                    email: data.email,
                    attributes: {
                        NAME: data.name,
                        AGE: data.age,
                        GENDER: data.gender,
                        HEIGHT: data.height,
                        WEIGHT: data.weight,
                        GOAL: data.goal
                    },
                    listIds: [2], // Cambia el ID por el de tu lista en Brevo
                    updateEnabled: true
                })
            });

            if (response.ok) {
                res.status(200).json({ success: true });
            } else {
                res.status(400).json({ success: false, message: 'Failed to subscribe' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
