const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();

// Create OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful AI assistant named AI WebChat' },
        { role: 'user', content: message }
      ],
      max_tokens: 150,
    });

    res.json({ reply: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error communicating with ChatGPT');
  }
});

module.exports = router;
