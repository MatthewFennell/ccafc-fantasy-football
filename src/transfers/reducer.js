import fp from 'lodash/fp';
import * as overviewActions from '../overview/actions';
import * as currentTeamActions from '../currentteam/actions';
import * as actions from './actions';

const initialState = {
    remainingTransfers: 0,
    remainingBudget: 0,
    originalBudget: 0,
    fetchingUserStats: false,

    originalTeam: [],
    currentTeam: [],
    fetchingOriginalTeam: false,

    allPlayers: [],
    fetchingAllPlayers: false,

    allTeams: [],
    transfersError: '',
    transfersErrorCode: ''
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
            originalBudget: action.stats.remainingBudget,
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
        return fp.flow(
            fp.set('currentTeam', state.currentTeam.concat([action.player])),
            fp.set('remainingBudget', state.remainingBudget - action.player.price),
        )(state);
    }
    case actions.ADD_PLAYER_TO_CURRENT_TEAM_ERROR: {
        return {
            ...state,
            transfersError: action.error.message,
            transfersErrorCode: action.error.code
        };
    }
    case actions.CLOSE_TRANSFERS_ERROR: {
        return {
            ...state,
            transfersError: '',
            transfersErrorCode: ''
        };
    }
    case actions.UNDO_TRANSFER_CHANGES: {
        return fp.flow(
            fp.set('currentTeam', state.originalTeam),
            fp.set('remainingBudget', state.originalBudget),
        )(state);
    }
    case actions.REMOVE_PLAYER_FROM_CURRENT_TEAM: {
        return fp.set('currentTeam', state.currentTeam.filter(x => x.id !== action.player.id))(state);
    }
    case actions.ALREADY_FETCHED_ALL_PLAYERS: {
        return fp.set('fetchingAllPlayers', false)(state);
    }
    default:
        return state;
    }
};

export default transfersReducer;
