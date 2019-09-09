import * as actions from './actions';

const initialState = {
    allLeagues: [],
    allPlayers: [],
    fetchedLeague: false,
    fetchedPlayers: false,
    myLeagues: []
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.FETCH_LEAGUES_SUCCESS:
        return {
            ...state,
            allLeagues: action.allLeagues,
            myLeagues: action.myLeagues,
            fetchedLeague: true
        };
    case actions.JOIN_LEAGUE_SUCCESS:
        return {
            ...state,
            myLeagues: action.myLeagues
        };
    case actions.INCREASE_SCORE_SUCCESS:
        return {
            ...state,
            myLeagues: action.myLeagues
        };
    case actions.FETCH_PLAYERS_SUCCESS:
        return {
            ...state,
            allPlayers: action.allPlayers
        };
    default:
        return state;
    }
};

export default authReducer;
