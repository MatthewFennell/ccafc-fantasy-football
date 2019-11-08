/* eslint-disable max-len */
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const lodash = require('lodash');
const constants = require('./src/constants');
const common = require('./src/common');

const config = functions.config();

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.auth = require('./src/auth');
exports.league = require('./src/leagues');
exports.team = require('./src/teams');
exports.player = require('./src/players');
exports.activeTeam = require('./src/activeTeam');
exports.weeklyTeam = require('./src/weeklyTeams');
exports.points = require('./src/points');
exports.users = require('./src/users');
exports.listeners = require('./src/listeners');
exports.onSignUp = require('./src/onSignUp');
exports.on = require('./src/onDelete');

const operations = admin.firestore.FieldValue;

const x = {
    result: [{
        team: 'England',
        goals: 25,
        player_id: 'CM38XItOjPD1PzrMKdiJ',
        assists: 5,
        week: 3,
        points: 124,
        manOfTheMatch: true,
        position: 'MIDFIELDER',
        dickOfTheDay: true,
        name: 'Mid 4',
        ownGoals: 5,
        cleanSheet: true,
        yellowCard: true,
        redCard: true,
        id: '34752lBrF6dE2FWvbOmC'
    }]
};
