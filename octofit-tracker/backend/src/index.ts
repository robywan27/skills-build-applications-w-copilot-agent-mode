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

app.post(['/api/users', '/api/users/'], async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json({ apiUrl: `${baseUrl}/api/users/`, data: newUser });
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  await sendCollection(res, () => Team.find({}).lean(), '/api/teams/');
});

app.post(['/api/teams', '/api/teams/'], async (req, res) => {
  const newTeam = await Team.create(req.body);
  res.status(201).json({ apiUrl: `${baseUrl}/api/teams/`, data: newTeam });
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  await sendCollection(res, () => Activity.find({}).lean(), '/api/activities/');
});

app.post(['/api/activities', '/api/activities/'], async (req, res) => {
  const newActivity = await Activity.create(req.body);
  res.status(201).json({ apiUrl: `${baseUrl}/api/activities/`, data: newActivity });
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  await sendCollection(res, () => Leaderboard.find({}).lean(), '/api/leaderboard/');
});

app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
  const newEntry = await Leaderboard.create(req.body);
  res.status(201).json({ apiUrl: `${baseUrl}/api/leaderboard/`, data: newEntry });
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  await sendCollection(res, () => Workout.find({}).lean(), '/api/workouts/');
});

app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
  const newWorkout = await Workout.create(req.body);
  res.status(201).json({ apiUrl: `${baseUrl}/api/workouts/`, data: newWorkout });
});

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Backend listening on port ${port}`);
  console.log(`API base URL: ${baseUrl}`);
});
