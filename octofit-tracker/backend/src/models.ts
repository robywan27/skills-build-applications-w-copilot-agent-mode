import mongoose, { Schema } from 'mongoose';
import { connectToDatabase, disconnectFromDatabase } from './config/database';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    fitnessGoal: { type: String, default: 'Stay active' },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    sport: { type: String, required: true },
    captain: { type: String, required: true },
    members: { type: [String], default: [] },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: String, required: true },
    intensity: { type: String, required: true },
    user: { type: String, required: true },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    user: { type: String, required: true },
    score: { type: Number, required: true },
    streak: { type: Number, default: 0 },
    team: { type: String, default: 'Independent' },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    duration: { type: String, required: true },
    focus: { type: String, required: true },
    difficulty: { type: String, default: 'Moderate' },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

export { connectToDatabase, disconnectFromDatabase };
