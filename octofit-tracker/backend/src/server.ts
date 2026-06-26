import express from 'express';
import { Activity, connectToDatabase, Leaderboard, Team, User, Workout } from './models';

const app = express();
app.use(express.json());

const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

async function sendCollection(res: express.Response, loader: () => Promise<unknown[]>, routePath: string) {
  const data = await loader();
  res.json({ apiUrl: `${baseUrl}${routePath}`, data });
}

app.get(['/api/health', '/api/health/'], (_req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker backend is running',
    apiUrl: `${baseUrl}/api/health/`,
  });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  await sendCollection(res, () => User.find({}).lean(), '/api/users/');
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  await sendCollection(res, () => Activity.find({}).lean(), '/api/activities/');
});

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Backend listening on port ${port}`);
  console.log(`API base URL: ${baseUrl}`);
});
