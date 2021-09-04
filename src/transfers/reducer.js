import fp from 'lodash/fp';
import * as adminActions from '../admin/actions';
import * as currentTeamActions from '../currentteam/actions';
import * as overviewActions from '../overview/actions';
import * as actions from './actions';

export const initialState = {
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

    successMessage: ''
};

const transfersReducer = (state = initialState, action) => {
    switch (action.type) {
    case overviewActions.FETCH_USER_STATS_REQUEST: {
        return fp.set('fetchingUserStats', true)(state);
    }
    case overviewActions.CANCEL_FETCHING_USER_STATS: {
        return fp.set('fetchingUserStats', false)(state);
    }
    case overviewActions.FETCH_USER_STATS_SUCCESS: {
        return {
            ...state,
            remainingTransfers: action.stats.remainingTransfers,
            originalBudget: Number(action.stats.remainingBudget),
            remainingBudget: Number(action.stats.remainingBudget),
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
            fp.set('currentTeam', action.activeTeam)
        )(state);
    }
    case actions.CANCEL_FETCHING_ORIGINAL_TEAM: {
        return fp.set('fetchingOriginalTeam', false)(state);
    }
    case currentTeamActions.CANCEL_FETCHING_ACTIVE_TEAM: {
        return fp.set('fetchingOriginalTeam', false)(state);
    }
    // ----------------------------------------------------- \\
    case actions.FETCH_ALL_PLAYERS_SUCCESS: {
        return fp.set('allPlayers', action.players)(state);
    }
    case actions.FETCH_ALL_PLAYERS_REQUEST: {
        return fp.set('fetchingAllPlayers', true)(state);
    }
    case actions.CANCEL_FETCHING_ALL_PLAYERS: {
        return fp.set('fetchingAllPlayers', false)(state);
    }
    // ----------------------------------------------------- \\
    case actions.FETCH_ALL_TEAMS_SUCCESS: {
        return fp.set('allTeams', action.teams)(state);
    }
    case actions.ADD_PLAYER_TO_CURRENT_TEAM_SUCCESS: {
        const index = state.currentTeam
            .findIndex(x => x.position === action.player.position && x.inactive);
        const newTeam = index === -1 ? state.currentTeam.concat([action.player])
            : state.currentTeam.map((p, i) => (index === i ? action.player : p));
        if (newTeam.length === 12) {
            const firstIndex = state.currentTeam.findIndex(x => x.inactive);
            newTeam.splice(firstIndex, 1);
        }

        return fp.flow(
            fp.set('currentTeam', newTeam),
            fp.set('remainingBudget', Number(state.remainingBudget) - Number(action.player.price))
        )(state);
    }
    case actions.UNDO_TRANSFER_CHANGES: {
        return fp.flow(
            fp.set('currentTeam', state.originalTeam),
            fp.set('remainingBudget', Number(state.originalBudget))
        )(state);
    }
    case actions.REMOVE_PLAYER_FROM_CURRENT_TEAM: {
        const remove = player => {
            if (state.originalTeam.some(x => x.id === player.id)) {
                return fp.set('currentTeam', state.currentTeam.map(x => (x.id !== action.player.id ? x
                    : ({
                        id: x.id, inactive: true, position: x.position, name: `${action.player.name} (removed)`, price: 0, team: action.player.team
                    }))));
            }
            return fp.set('currentTeam', state.currentTeam.filter(x => x.id !== player.id));
        };

        return fp.flow(
            remove(action.player),
            fp.set('remainingBudget', Number(state.remainingBudget) + Number(action.player.price))
        )(state);
    }
    case actions.CANCEL_FETCHING_PLAYERS: {
        return fp.set('fetchingAllPlayers', false)(state);
    }
    case actions.CANCEL_UPDATING_TEAM: {
        return fp.set('fetchingOriginalTeam', false)(state);
    }
    case actions.RESTORE_PLAYER_REQUEST: {
        const playerToRestore = state.allPlayers.find(x => x.id === action.playerId);

        return fp.flow(
            fp.set('currentTeam', state.currentTeam.map(x => (x.id === action.playerId ? playerToRestore : x))),
            fp.set('remainingBudget', Number(state.remainingBudget) - Number(playerToRestore.price))
        )(state);
    }
    case actions.REPLACE_PLAYER_SUCCESS: {
        const budgetDiff = Number(action.oldPlayer.price) - Number(action.newPlayer.price);
        return fp.flow(
            fp.set('currentTeam', state.currentTeam.map(x => (x.id === action.oldPlayer.id ? action.newPlayer : x))),
            fp.set('remainingBudget', Number(state.remainingBudget) + budgetDiff)
        )(state);
    }
    case actions.UPDATE_TEAM_REQUEST: {
        return fp.set('fetchingOriginalTeam', true)(state);
    }
    case actions.SET_SUCCESS_MESSAGE: {
        return fp.set('successMessage', action.message)(state);
    }
    case actions.CLOSE_SUCCESS_MESSAGE: {
        return fp.set('successMessage', '')(state);
    }
    case adminActions.CANCEL_UPDATING_SUBS: {
        return {
            ...state,
            allPlayers: state.allPlayers
                .map(player => (action.changes.some(x => x.playerId === player.id) ? ({
                    ...player,
                    hasPaidSubs: action.changes.find(y => y.playerId === player.id).hasPaidSubs
                }) : player))
        };
    }
    default:
        return state;
    }
};

export default transfersReducer;
