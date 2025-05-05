// server.js (backend)
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY  // read from .env file
});


app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",   // Use `gpt-4o` (no "mini") OR gpt-3.5-turbo
      messages: [{ role: "user", content: userMessage }],
    });

    const reply = completion.choices[0].message.content;
    res.json({ response: reply });

  } catch (error) {
    console.error('Error from OpenAI:', error.message);
    res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
  }
});

app.listen(port, () => {
  console.log(`DermaTone backend listening on http://localhost:${port}`);
});
