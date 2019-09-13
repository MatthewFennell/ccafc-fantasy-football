import * as actions from './actions';

const initialState = {
    allLeagues: [],
    allPlayers: [],
    fetchedLeague: false,
    fetchedPlayers: false,
    myLeagues: [],
    myWeeklyTeams: [],
    allWeeklyTeams: {},
    myActiveTeam: [],
    allTeams: []
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
    case actions.FETCH_WEEKLY_PLAYERS_SUCCESS:
        return {
            ...state,
            myWeeklyTeams: action.myWeeklyTeams
        };
    case actions.FETCH_WEEKLY_PLAYERS_FOR_USER_FOR_WEEK_SUCCESS:
        return {
            ...state,
            allWeeklyTeams: {
                ...state.allWeeklyTeams,
                [action.userId]: {
                    ...state.allWeeklyTeams[action.userId],
                    [action.week]: action.weeklyPlayers
                }
            }
        };
    case actions.FETCH_MY_ACTIVE_TEAM_SUCCESS:
        return {
            ...state,
            myActiveTeam: action.activeTeam
        };
    case actions.FETCH_TEAMS_SUCCESS:
        return {
            ...state,
            allTeams: action.allTeams
        };
    default:
        return state;
    }
};

export default authReducer;
