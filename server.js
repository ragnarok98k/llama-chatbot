require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
    try {
        console.log("User said:", req.body.message); // Debug log 1

        // Change 'llama-3.2-3b-preview' to 'llama-3.1-8b-instant'
const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: req.body.message }],
    model: 'llama-3.1-8b-instant', 
});

        const llamaReply = completion.choices[0].message.content;
        console.log("Llama said:", llamaReply); // Debug log 2
        
        res.json({ reply: llamaReply });
    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).json({ reply: "Error: " + err.message });
    }
});

app.listen(3000, () => console.log('🚀 Server spinning at http://localhost:3000'));