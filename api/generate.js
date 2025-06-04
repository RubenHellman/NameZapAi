import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { prompt, genre } = req.body;

  if (!prompt || !genre) {
    res.status(400).json({ error: 'Missing prompt or genre' });
    return;
  }

  const systemMessage = `You are a creative assistant that generates catchy, original startup or business names based on the user's description and genre. Return a JSON array of 8 short name suggestions.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: `Description: ${prompt}\nGenre: ${genre}` },
      ],
      temperature: 0.8,
      max_tokens: 200,
    });

    const text = completion.choices[0].message.content;

    let names = [];
    try {
      names = JSON.parse(text);
    } catch {
      names = text.split('\n').filter(Boolean).map(s => s.trim().replace(/^[-\d.\s]+/, ''));
    }

    res.status(200).json({ names: names.slice(0, 8) });
  } catch (error) {
    res.status(500).json({ error: 'OpenAI API error: ' + error.message });
  }
}
