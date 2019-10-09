import * as actions from './actions';

const initState = {
    allTeams: [],
    createPlayerError: '',
    createPlayerErrorCode: ''
};

const adminReducer = (state = initState, action) => {
    switch (action.type) {
    case actions.FETCH_TEAMS_SUCCESS: {
        return {
            ...state,
            allTeams: action.teams
        };
    }
    case actions.CREATE_PLAYER_ERROR: {
        return {
            ...state,
            createPlayerError: action.error.message,
            createPlayerErrorCode: action.error.code
        };
    }
    case actions.CLOSE_CREATE_PLAYER_ERROR: {
        return {
            ...state,
            createPlayerError: '',
            createPlayerErrorCode: ''
        };
    }
    default:
        return state;
    }
};

export default adminReducer;
