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
    MOTM: 3
};
