import 'dotenv/config';
import express from 'express';
import pkg from '@paymanai/payman-ts';

const { PaymanClient } = pkg;

const app = express();
const port = 3000;

app.use(express.json());

const payman = PaymanClient.withCredentials({
  clientId: process.env.PAYMAN_CLIENT_ID!,
  clientSecret: process.env.PAYMAN_CLIENT_SECRET!
});

app.post('/ask', async (req, res) => {
  try {
    const question = req.body.question;
    if (!question) {
      return res.status(400).json({ error: 'Missing question' });
    }
    const answer = await payman.ask(question);
    res.json(answer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});