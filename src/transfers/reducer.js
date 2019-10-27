import fp from 'lodash/fp';
import * as overviewActions from '../overview/actions';
import * as currentTeamActions from '../currentteam/actions';
import * as actions from './actions';

const initialState = {
    remainingTransfers: 0,
    remainingBudget: 0,
    fetchingUserStats: false,

    originalTeam: [],
    currentTeam: [],
    fetchingOriginalTeam: false,

    allPlayers: [],
    fetchingAllPlayers: false,

    allTeams: []
};

const transfersReducer = (state = initialState, action) => {
    switch (action.type) {
    case overviewActions.FETCH_USER_STATS_REQUEST: {
        return fp.set('fetchingUserStats', true)(state);
    }
    case overviewActions.FETCH_USER_STATS_ERROR: {
        return fp.set('fetchingUserStats', false)(state);
    }
    case overviewActions.FETCH_USER_STATS_SUCCESS: {
        return {
            ...state,
            remainingTransfers: action.stats.remainingTransfers,
            remainingBudget: action.stats.remainingBudget,
            fetchingUserStats: false
        };
    }
    // ----------------------------------------------------- \\
    case currentTeamActions.FETCH_ACTIVE_TEAM_REQUEST: {
        return fp.set('fetchingOriginalTeam', true)(state);
    }
    case currentTeamActions.FETCH_ACTIVE_TEAM_SUCCESS: {
        return fp.flow(
            fp.set('originalTeam', action.activeTeam),
            fp.set('currentTeam', action.activeTeam),
            fp.set('fetchingOriginalTeam', false)
        )(state);
    }
    case currentTeamActions.FETCH_ACTIVE_TEAM_ERROR: {
        return fp.set('fetchingOriginalTeam', false)(state);
    }
    case currentTeamActions.ALREADY_FETCHED_ACTIVE_TEAM: {
        return fp.set('fetchingOriginalTeam', false)(state);
    }
    // ----------------------------------------------------- \\
    case actions.FETCH_ALL_PLAYERS_SUCCESS: {
        return {
            ...state,
            fetchingAllPlayers: false,
            allPlayers: action.players
        };
    }
    case actions.FETCH_ALL_PLAYERS_REQUEST: {
        return fp.set('fetchingAllPlayers', true)(state);
    }
    case actions.FETCH_ALL_PLAYERS_ERROR: {
        return {
            ...state,
            fetchingAllPlayers: false
        };
    }
    // ----------------------------------------------------- \\
    case actions.FETCH_ALL_TEAMS_SUCCESS: {
        return fp.set('allTeams', action.teams)(state);
    }
    case actions.ADD_PLAYER_TO_CURRENT_TEAM_SUCCESS: {
        return fp.set('currentTeam', state.currentTeam.concat([action.player]))(state);
    }
    default:
        return state;
    }
};

export default transfersReducer;
