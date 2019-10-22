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

module.exports.region = 'europe-west2';

module.exports.ROLES = {
    ADMIN: 'ADMIN',
    MAINTAINER: 'MAINTAINER'
};

module.exports.PERMISSIONS = {
    ADMIN: ['CREATE_PLAYER', 'DELETE_PLAYER', 'CREATE_TEAM', 'DELETE_TEAM', 'SUBMIT_RESULT', 'TRIGGER_WEEK', 'EDIT_PLAYER', 'MANAGE_USERS'],
    MAINTAINER: ['CREATE_PLAYER', 'DELETE_PLAYER', 'CREATE_TEAM', 'DELETE_TEAM', 'SUBMIT_RESULT', 'TRIGGER_WEEK', 'EDIT_PLAYER']
};
