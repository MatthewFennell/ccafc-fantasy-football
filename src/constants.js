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
    POINTS: '/points',
    CREATE_PLAYER: '/create-player',
    DELETE_PLAYER: '/delete-player',
    CREATE_TEAM: '/create-team',
    DELETE_TEAM: '/delete-team',
    SUBMIT_RESULT: '/submit-result',
    TRIGGER_WEEK: '/trigger-week',
    EDIT_PLAYER: '/edit-player',
    MANAGE_USERS: '/manage-users'
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


// KEEP IN SYNC WITH SERVER
// This is the list of all existing permissions
export const PERMISSIONS = {
    CREATE_PLAYER: 'CREATE_PLAYER',
    DELETE_PLAYER: 'DELETE_PLAYER',
    CREATE_TEAM: 'CREATE_TEAM',
    DELETE_TEAM: 'DELETE_TEAM',
    SUBMIT_RESULT: 'SUBMIT_RESULT',
    TRIGGER_WEEK: 'TRIGGER_WEEK',
    EDIT_PLAYER: 'EDIT_PLAYER',
    MANAGE_USERS: 'MANAGE_USERS'
};

// KEEP IN SYNC WITH SERVER
// This is the list of all the existing roles
export const ROLES = {
    ADMIN: 'ADMIN',
    MAINTAINER: 'MAINTAINER'
};
