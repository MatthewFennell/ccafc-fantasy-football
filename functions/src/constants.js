module.exports.positions = {
    ATTACKER: 'ATTACKER',
    MIDFIELDER: 'MIDFIELDER',
    DEFENDER: 'DEFENDER',
    GOALKEEPER: 'GOALKEEPER'
};

module.exports.maxPlayersPerTeam = 11;

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
    OWN_GOAL: -2
};

module.exports.results = {
    WIN: 'WIN',
    DRAW: 'DRAW',
    LOSS: 'LOSS'
};

module.exports.region = 'europe-west2';

// A list of all existing permissions - keep in sync with UI
const PERMISSIONS = {
    CREATE_PLAYER: 'CREATE_PLAYER',
    DELETE_PLAYER: 'DELETE_PLAYER',
    CREATE_TEAM: 'CREATE_TEAM',
    DELETE_TEAM: 'DELETE_TEAM',
    SUBMIT_RESULT: 'SUBMIT_RESULT',
    TRIGGER_WEEK: 'TRIGGER_WEEK',
    EDIT_PLAYER: 'EDIT_PLAYER',
    MANAGE_USERS: 'MANAGE_USERS',
    APPROVE_HIGHLIGHTS: 'APPROVE_HIGHLIGHTS'
};

module.exports.PERMISSIONS = PERMISSIONS;

// A list of all existing roles - keep in sync with UI
module.exports.ROLES = {
    ADMIN: 'ADMIN',
    MAINTAINER: 'MAINTAINER',
    HIGHLIGHT_APPROVER: 'HIGHLIGHT_APPROVER'
};

// This dictates what each role is able to do
module.exports.ROLE_PERMISSIONS = {
    ADMIN: [
        PERMISSIONS.CREATE_PLAYER,
        PERMISSIONS.DELETE_PLAYER,
        PERMISSIONS.CREATE_TEAM,
        PERMISSIONS.DELETE_TEAM,
        PERMISSIONS.SUBMIT_RESULT,
        PERMISSIONS.TRIGGER_WEEK,
        PERMISSIONS.EDIT_PLAYER,
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.APPROVE_HIGHLIGHTS],
    MAINTAINER: [
        PERMISSIONS.CREATE_PLAYER,
        PERMISSIONS.DELETE_PLAYER,
        PERMISSIONS.CREATE_TEAM,
        PERMISSIONS.DELETE_TEAM,
        PERMISSIONS.SUBMIT_RESULT,
        PERMISSIONS.TRIGGER_WEEK,
        PERMISSIONS.EDIT_PLAYER,
        PERMISSIONS.APPROVE_HIGHLIGHTS],
    HIGHLIGHT_APPROVER: [
        PERMISSIONS.APPROVE_HIGHLIGHTS
    ]
};
