const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: message }
            ],
            max_tokens: 150,            
        });

        res.json({ reply: response.data.choices[0].message.content.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error communicating with ChatGPT');
    }
});

module.exports = router;