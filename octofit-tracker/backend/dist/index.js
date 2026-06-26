"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
async function sendCollection(res, loader, routePath) {
    const data = await loader();
    res.json({ apiUrl: `${baseUrl}${routePath}`, data });
}
app.get('/', (_req, res) => {
    res.type('html').send(`<!doctype html><html><body><h1>OctoFit Tracker API</h1><p>Use /api/users, /api/teams, /api/activities, /api/leaderboard, or /api/workouts.</p></body></html>`);
});
app.get(['/api/health', '/api/health/'], (_req, res) => {
    res.json({
        status: 'ok',
        message: 'OctoFit Tracker backend is running',
        apiUrl: `${baseUrl}/api/health/`,
    });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    await sendCollection(res, () => models_1.User.find({}).lean(), '/api/users/');
});
app.post(['/api/users', '/api/users/'], async (req, res) => {
    const newUser = await models_1.User.create(req.body);
    res.status(201).json({ apiUrl: `${baseUrl}/api/users/`, data: newUser });
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    await sendCollection(res, () => models_1.Team.find({}).lean(), '/api/teams/');
});
app.post(['/api/teams', '/api/teams/'], async (req, res) => {
    const newTeam = await models_1.Team.create(req.body);
    res.status(201).json({ apiUrl: `${baseUrl}/api/teams/`, data: newTeam });
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    await sendCollection(res, () => models_1.Activity.find({}).lean(), '/api/activities/');
});
app.post(['/api/activities', '/api/activities/'], async (req, res) => {
    const newActivity = await models_1.Activity.create(req.body);
    res.status(201).json({ apiUrl: `${baseUrl}/api/activities/`, data: newActivity });
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    await sendCollection(res, () => models_1.Leaderboard.find({}).lean(), '/api/leaderboard/');
});
app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
    const newEntry = await models_1.Leaderboard.create(req.body);
    res.status(201).json({ apiUrl: `${baseUrl}/api/leaderboard/`, data: newEntry });
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    await sendCollection(res, () => models_1.Workout.find({}).lean(), '/api/workouts/');
});
app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
    const newWorkout = await models_1.Workout.create(req.body);
    res.status(201).json({ apiUrl: `${baseUrl}/api/workouts/`, data: newWorkout });
});
app.listen(port, async () => {
    await (0, models_1.connectToDatabase)();
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
});
