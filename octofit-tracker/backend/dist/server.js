"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const app = (0, express_1.default)();
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
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    await sendCollection(res, () => models_1.Activity.find({}).lean(), '/api/activities/');
});
app.listen(port, async () => {
    await (0, models_1.connectToDatabase)();
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
});
