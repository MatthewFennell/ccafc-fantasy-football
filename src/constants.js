export const REGION = 'europe-west2';

export const URL = {
    LEAGUES: '/leagues',
    OVERVIEW: '/overview',
    PROFILE: '/profile',
    RESET_PASSWORD: '/reset-password',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    VERIFY_EMAIL: '/need-to-verify-email',
    CURRENT_TEAM: '/current-team',
    POINTS: '/points'
};

export const ADMIN_URL = {
    CREATE_PLAYER: '/create-player',
    DELETE_PLAYER: '/delete-player',
    CREATE_TEAM: '/create-team',
    DELETE_TEAM: '/delete-team',
    SUBMIT_RESULT: '/submit-result',
    TRIGGER_WEEK: '/trigger-week',
    EDIT_PLAYER: '/edit-player'
};

export const POINTS = {
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
