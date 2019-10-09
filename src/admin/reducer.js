import fp from 'lodash/fp';
import * as actions from './actions';

const initState = {
    allTeams: [],

    creatingPlayer: false,
    createPlayerError: '',
    createPlayerErrorCode: '',

    creatingTeam: '',
    createTeamError: '',
    createTeamErrorCode: ''
};

const adminReducer = (state = initState, action) => {
    switch (action.type) {
    case actions.FETCH_TEAMS_SUCCESS: {
        return {
            ...state,
            allTeams: action.teams
        };
    }
    case actions.CREATE_PLAYER_REQUEST: {
        return fp.set('creatingPlayer', true)(state);
    }
    case actions.CREATE_PLAYER_SUCCESS: {
        return fp.set('creatingPlayer', false)(state);
    }
    case actions.CREATE_PLAYER_ERROR: {
        return {
            ...state,
            creatingPlayer: false,
            createPlayerError: action.error.message,
            createPlayerErrorCode: action.error.code
        };
    }
    case actions.CREATE_TEAM_REQUEST: {
        return fp.set('creatingTeam', true)(state);
    }
    case actions.CREATE_TEAM_SUCCESS: {
        return fp.set('creatingTeam', false)(state);
    }
    case actions.CREATE_TEAM_ERROR: {
        return {
            ...state,
            creatingTeam: false,
            createTeamError: action.error.message,
            createTeamErrorCode: action.error.code
        };
    }
    case actions.CLOSE_CREATE_PLAYER_ERROR: {
        return {
            ...state,
            createPlayerError: '',
            createPlayerErrorCode: ''
        };
    }
    case actions.CLOSE_CREATE_TEAM_ERROR: {
        return {
            ...state,
            createTeamError: '',
            createTeamErrorCode: ''
        };
    }
    default:
        return state;
    }
};

export default adminReducer;
