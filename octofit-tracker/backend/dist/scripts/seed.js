"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const database_1 = require("../config/database");
// Seed the octofit_db database with test data
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectToDatabase)();
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.Leaderboard.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    const users = await models_1.User.insertMany([
        {
            name: 'Avery Chen',
            email: 'avery.chen@example.com',
            role: 'Runner',
            fitnessGoal: 'Complete a half marathon',
        },
        {
            name: 'Jordan Rivera',
            email: 'jordan.rivera@example.com',
            role: 'Cyclist',
            fitnessGoal: 'Improve endurance',
        },
        {
            name: 'Sam Patel',
            email: 'sam.patel@example.com',
            role: 'Coach',
            fitnessGoal: 'Build a stronger team',
        },
    ]);
    const teams = await models_1.Team.insertMany([
        {
            name: 'North Stars',
            sport: 'Running',
            captain: users[0].name,
            members: [users[0].name, users[2].name],
        },
        {
            name: 'Peak Riders',
            sport: 'Cycling',
            captain: users[1].name,
            members: [users[1].name],
        },
    ]);
    const activities = await models_1.Activity.insertMany([
        {
            title: 'Morning Run',
            type: 'Run',
            duration: '30m',
            intensity: 'Moderate',
            user: users[0].name,
        },
        {
            title: 'Hill Intervals',
            type: 'Cycling',
            duration: '45m',
            intensity: 'High',
            user: users[1].name,
        },
    ]);
    const leaderboard = await models_1.Leaderboard.insertMany([
        {
            user: users[0].name,
            score: 1250,
            streak: 7,
            team: teams[0].name,
        },
        {
            user: users[1].name,
            score: 1180,
            streak: 4,
            team: teams[1].name,
        },
    ]);
    const workouts = await models_1.Workout.insertMany([
        {
            name: 'HIIT Circuit',
            duration: '25m',
            focus: 'Cardio',
            difficulty: 'Intermediate',
        },
        {
            name: 'Core Stability',
            duration: '20m',
            focus: 'Core',
            difficulty: 'Beginner',
        },
    ]);
    console.log('Seed complete', {
        users: users.length,
        teams: teams.length,
        activities: activities.length,
        leaderboard: leaderboard.length,
        workouts: workouts.length,
    });
    await (0, database_1.disconnectFromDatabase)();
}
seedDatabase().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
