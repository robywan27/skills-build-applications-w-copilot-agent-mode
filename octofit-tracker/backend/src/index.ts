import express from 'express';

const app = express();
const port = process.env.PORT || 8000;

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker backend is running' });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
