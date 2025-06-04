export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'Missing description' });
  }

  const prompt = `Suggest 10 unique, catchy and creative business or app names for this idea: "${description}". Return only the names.`;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.9
      })
    });

    const data = await openaiRes.json();
    const text = data.choices?.[0]?.message?.content || '';
    const suggestions = text.split('\n').map(line => line.replace(/^[0-9.\-\s]+/, '').trim()).filter(Boolean);

    res.status(200).json({ suggestions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'API error' });
  }
}
