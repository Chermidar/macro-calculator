export default async function handler(req, res) {
  if (req.method === "POST") {
    const apikey = process.env.BREVO_API_KEY;
    const data = req.body;

    // Cálculos personalizados
    const weightObjective = Math.round((data.weight * 0.95 + data.weight * 1.05) / 2); // Ejemplo de cálculo dinámico
    const sedentaryKcal = Math.round(24 * data.weight * 1.2);
    const stepsKcal = Math.round(sedentaryKcal * 1.15);
    const gymKcal = Math.round(sedentaryKcal * 1.3);
    const protein = weightObjective * 2;
    const carbs = Math.round((gymKcal * 0.5) / 4);
    const fat = Math.round((gymKcal * 0.25) / 9);

    // Generar respuesta completa
    const respuesta = `      
    Hola ${data.name},

      Según los datos que proporcionaste, aquí tienes tus resultados personalizados:

      Objetivo de peso:
      Basado en tu género, edad y estatura, tu rango saludable de peso se encuentra entre ${Math.round(data.weight * 0.95)} kg y ${Math.round(data.weight * 1.05)} kg.
      Te recomendamos como peso objetivo ${weightObjective} kg.

      Resultados:
      Kcal diarias en estado sedentario: ${sedentaryKcal} kcal
      Kcal diarias con 10,000 pasos diarios: ${stepsKcal} kcal
      Kcal diarias con 10,000 pasos diarios + gimnasio 4 veces a la semana: ${gymKcal} kcal

      Macronutrientes (basados en ${weightObjective} kg de peso objetivo):
      - Proteínas: ${protein} g
      - Carbohidratos: ${carbs} g
      - Grasas: ${fat} g

      Nota:
      Este cálculo es una estimación aproximada. Para obtener datos más precisos y adaptados a tus necesidades individuales, te recomiendo consultar con un especialista en nutrición.
    `;

    const endpoint = 'https://api.brevo.com/v3/contacts';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apikey
        },
        body: JSON.stringify({
          email: data.email,
          attributes: {
            NAME: data.name,
            AGE: data.age,
            GENDER: data.gender,
            HEIGHT: data.height,
            WEIGHT: data.weight,
            GOAL: data.goal,
            RESPUESTA: respuesta // Enviar la respuesta generada como una variable única
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
