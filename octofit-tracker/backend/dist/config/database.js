"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
exports.disconnectFromDatabase = disconnectFromDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
async function connectToDatabase() {
    if (mongoose_1.default.connection.readyState >= 1) {
        return mongoose_1.default.connection;
    }
    await mongoose_1.default.connect(MONGODB_URI);
    return mongoose_1.default.connection;
}
async function disconnectFromDatabase() {
    if (mongoose_1.default.connection.readyState >= 1) {
        await mongoose_1.default.disconnect();
    }
}
