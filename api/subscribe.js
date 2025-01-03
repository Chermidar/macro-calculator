export default function handler(req, res) {
    if (req.method === 'POST') {
        const apiKey = 'pk_ae2f5d0763e6277fd8e1b6f6afd5de37a2';
        const listId = 'YqCaDC';
        const klaviyoUrl = `https://a.klaviyo.com/api/v2/list/${listId}/subscribe?api_key=${apiKey}`;

        fetch(klaviyoUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profiles: [req.body] // Se envía como un array
            }),
        })
        .then(response => response.json())
        .then(data => res.status(200).json({ success: true, data }))
        .catch(error => {
            console.error(error);
            res.status(500).json({ success: false, error: 'Failed to subscribe' });
        });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
