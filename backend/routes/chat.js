const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const ChatLog = require('../models/chatLog'); 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get('/chatlogs', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const logs = await ChatLog.find({ userId }).sort({ createdAt: 1 });
    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch chat logs' });
  }
});

router.post('/chat', authenticate, async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id;

  try {
    await ChatLog.create({
      userId,
      role: 'user',
      content: message,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful AI Assistant named Inteligia Bot' },
        { role: 'user', content: message }
      ],
      max_tokens: 150,
    });

    const aiReply = response.choices[0].message.content.trim();

    await ChatLog.create({
      userId,
      role: 'ai',
      content: aiReply,
    });

    res.json({ reply: aiReply });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error communicating with ChatGPT');
  }
});

module.exports = router;
