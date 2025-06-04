import { Configuration, OpenAIApi } from "openai";

const fallbackNames = [
  "BrightIdea AI",
  "QuickName",
  "SparkLab",
  "IdeaForge",
  "NameNest",
  "BrainWave AI",
  "NameQuest",
  "InnoName",
  "Brandify",
  "NameRocket",
];

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Only POST requests allowed" });
    return;
  }

  const { description, genre } = req.body;

  if (!description) {
    res.status(400).json({ error: "Missing description in request body" });
    return;
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OpenAI API Key");
    }

    // Skapa prompt baserat på input
    let prompt = `Generate 10 creative and catchy business names`;
    if (genre) {
      prompt += ` for a business in the genre: ${genre}`;
    }
    prompt += `, related to: ${description}. Keep names short and unique.`;

    // Skicka förfrågan till OpenAI
    const completion = await openai.createCompletion({
      model: "gpt-4o-mini",
      prompt,
      max_tokens: 100,
      temperature: 0.8,
      n: 1,
      stop: null,
    });

    let namesText = completion.data.choices[0].text;

    // Dela upp resultatet till en array på nya rader
    let names = namesText
      .split("\n")
      .map((name) => name.replace(/^\d+[\).\-\s]+/, "").trim()) // Ta bort eventuella nummer i början
      .filter((name) => name.length > 0);

    // Om inga namn returneras, fallback
    if (names.length === 0) {
      names = fallbackNames;
    }

    res.status(200).json({ names });
  } catch (error) {
    console.error("OpenAI API error, using fallback names:", error.message);
    // Skicka fallback-namn vid fel
    res.status(200).json({ names: fallbackNames });
  }
}

