module.exports.positions = {
    ATTACKER: 'ATTACKER',
    MIDFIELDER: 'MIDFIELDER',
    DEFENDER: 'DEFENDER',
    GOALKEEPER: 'GOALKEEPER'
};

module.exports.maxPlayersPerTeam = 3;

module.exports.transferPointPenalty = 4;

module.exports.points = {
    GOAL: {
        ATTACKER: 4,
        MIDFIELDER: 5,
        DEFENDER: 6,
        GOALKEEPER: 6
    },
    ASSIST: 3,
    CLEAN_SHEET: {
        GOALKEEPER: 6,
        DEFENDER: 4,
        MIDFIELDER: 1,
        ATTACKER: 0
    },
    RED_CARD: -3,
    YELLOW_CARD: -1,
    MOTM: 3,
    DOTD: -3,
    OWN_GOAL: -2,
    PENALTY_SAVE: 3,
    PENALTY_MISS: -3
};

module.exports.results = {
    WIN: 'WIN',
    DRAW: 'DRAW',
    LOSS: 'LOSS'
};

module.exports.maxBatchSize = 500;

module.exports.region = 'europe-west2';

// A list of all existing permissions - keep in sync with UI
// src/constants.js
const PERMISSIONS = {
    CREATE_PLAYER: 'CREATE_PLAYER',
    DELETE_PLAYER: 'DELETE_PLAYER',
    CREATE_TEAM: 'CREATE_TEAM',
    DELETE_TEAM: 'DELETE_TEAM',
    SUBMIT_RESULT: 'SUBMIT_RESULT',
    TRIGGER_WEEK: 'TRIGGER_WEEK',
    EDIT_PLAYER: 'EDIT_PLAYER',
    MANAGE_USERS: 'MANAGE_USERS',
    APPROVE_HIGHLIGHTS: 'APPROVE_HIGHLIGHTS',
    ROLL_OVER_YEAR: 'ROLL_OVER_YEAR',
    MANAGE_SUBS: 'MANAGE_SUBS',
    MANAGE_BUGS: 'MANAGE_BUGS',
    TOGGLE_PAGES: 'TOGGLE_PAGES',
    SORT_LEAGUES: 'SORT_LEAGUES',
    ADD_NOTIFICATIONS: 'ADD_NOTIFICATIONS',
    SET_DIVISIONS: 'SET_DIVISIONS'
};

module.exports.PERMISSIONS = PERMISSIONS;

// A list of all existing roles - keep in sync with UI
module.exports.ROLES = {
    ADMIN: 'ADMIN',
    MAINTAINER: 'MAINTAINER',
    HIGHLIGHT_APPROVER: 'HIGHLIGHT_APPROVER',
    TREASURER: 'TREASURER'
};

// This dictates what each role is able to do
module.exports.ROLE_PERMISSIONS = {
    ADMIN: [
        PERMISSIONS.MANAGE_USERS, // Admin only
        PERMISSIONS.ROLL_OVER_YEAR, // Admin only
        PERMISSIONS.TOGGLE_PAGES, // Admin only
        PERMISSIONS.MANAGE_BUGS, // Admin only
        PERMISSIONS.SORT_LEAGUES,
        PERMISSIONS.CREATE_PLAYER,
        PERMISSIONS.DELETE_PLAYER,
        PERMISSIONS.CREATE_TEAM,
        PERMISSIONS.DELETE_TEAM,
        PERMISSIONS.SUBMIT_RESULT,
        PERMISSIONS.TRIGGER_WEEK,
        PERMISSIONS.EDIT_PLAYER,
        PERMISSIONS.ADD_NOTIFICATIONS,
        PERMISSIONS.APPROVE_HIGHLIGHTS,
        PERMISSIONS.MANAGE_SUBS],
    MAINTAINER: [
        PERMISSIONS.CREATE_PLAYER,
        PERMISSIONS.DELETE_PLAYER,
        PERMISSIONS.SORT_LEAGUES,
        PERMISSIONS.CREATE_TEAM,
        PERMISSIONS.DELETE_TEAM,
        PERMISSIONS.ADD_NOTIFICATIONS,
        PERMISSIONS.SUBMIT_RESULT,
        PERMISSIONS.TRIGGER_WEEK,
        PERMISSIONS.EDIT_PLAYER,
        PERMISSIONS.APPROVE_HIGHLIGHTS],
    HIGHLIGHT_APPROVER: [
        PERMISSIONS.APPROVE_HIGHLIGHTS
    ],
    TREASURER: [
        PERMISSIONS.MANAGE_SUBS
    ]
};

module.exports.mensLeagueFixtures = [
    'https://www.dur.ac.uk/teamdurham/participation/collegesport/league/?league=19',
    'https://www.dur.ac.uk/teamdurham/participation/collegesport/league/?league=20',
    'https://www.dur.ac.uk/teamdurham/participation/collegesport/league/?league=21',
    'https://www.dur.ac.uk/teamdurham/participation/collegesport/league/?league=22',
    'https://www.dur.ac.uk/teamdurham/participation/collegesport/league/?league=23',
    'https://www.dur.ac.uk/teamdurham/participation/collegesport/league/?league=24',
    'https://www.dur.ac.uk/teamdurham/participation/collegesport/league/?league=77',
    'https://www.dur.ac.uk/teamdurham/participation/collegesport/league/?league=202'
    // 'https://www.dur.ac.uk/teamdurham/participation/collegesport/knockout/?knockout=111', // Floodlit
    // 'https://www.dur.ac.uk/teamdurham/participation/collegesport/knockout/?knockout=113' // Cup
];

module.exports.womensLeagueFixtures = [
    'https://www.dur.ac.uk/teamdurham/participation/collegesport/league/?league=32',
    'https://www.dur.ac.uk/teamdurham/participation/collegesport/league/?league=33'
];

module.exports.cupDatabaseId = 'ccafc-cup-id';
module.exports.collingwoodLeagueId = 'collingwood-league-id';
module.exports.applicationInfoId = 'application-info-id';
module.exports.divisionsId = 'divisions-id';
module.exports.clubSubsHistoryId = 'club-subs-history-id';
module.exports.resultsHistoryId = 'results-history-id';
module.exports.playersBlobId = 'players-blob-id';
module.exports.teamsBlobId = 'teams-blob-id';
module.exports.fixturesBlobId = 'fixtures-blob-id';

module.exports.resultHistoryTypes = {
    STANDARD_RESULT: 'STANDARD_RESULT',
    EXTRA_STATS: 'EXTRA_STATS',
    EDIT_STATS: 'EDIT_STATS',
    TRIGGER_WEEK: 'TRIGGER_WEEK'
};

module.exports.cupStartingWeek = 2;
