import fp from 'lodash/fp';
import * as actions from './actions';
import * as modalHandlingActions from '../modalHandling/actions';

export const initialState = {
    allTeams: [],
    teamsWithPlayers: {},
    playerStats: {},
    usersWithExtraRoles: [],
    highlightsForApproval: [],
    rejectedHighlights: [],

    creatingPlayer: false,
    deletingPlayer: false,
    creatingTeam: false,
    deletingTeam: false,

    submittingResult: false,
    submittingExtraResults: false,
    editingStats: false,
    triggeringWeek: false,

    fetchingPlayerStats: false,
    fetchingUsersWithExtraRoles: false,

    loadingHighlightsForApproval: false,
    loadedHighlightsForApproval: false,
    loadingRejectedHighlights: false,
    loadedRejectedHighlights: false,

    updatingSubs: false,

    successMessage: '',
    errorHeader: '',
    errorMessage: '',
    errorCode: '',

    isFetchingPlayersForTeam: false,
    isRecalculatingLeaguePositions: false,
    highlightBeingApproved: '',
    highlightBeingRejected: '',

    isDeletingBug: false,
    bugIdToDelete: '',
    isRollingOverToNextYear: false
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.FETCH_TEAMS_SUCCESS: {
        return {
            ...state,
            allTeams: action.teams
        };
    }
    case actions.ROLL_OVER_TO_NEXT_YEAR_REQUEST: {
        return fp.set('isRollingOverToNextYear', true)(state);
    }
    case actions.SET_ROLLING_OVER_TO_NEXT_YEAR: {
        return fp.set('isRollingOverToNextYear', action.isRollingOver)(state);
    }
    case actions.SET_BUG_ID_TO_DELETE: {
        return fp.set('bugIdToDelete', action.bugId)(state);
    }
    case actions.DELETE_FEATURE_REQUEST: {
        return fp.set('isDeletingBug', true)(state);
    }
    case actions.CANCEL_DELETING_BUG: {
        return {
            ...state,
            isDeletingBug: false,
            bugIdToDelete: ''
        };
    }
    case actions.RECALCULATE_LEAGUE_POSITIONS_REQUEST: {
        return fp.set('isRecalculatingLeaguePositions', true)(state);
    }
    case actions.SET_RECALCULATING_LEAGUE_POSITIONS: {
        return fp.set('isRecalculatingLeaguePositions', action.isRecalculating)(state);
    }
    case actions.FETCH_TEAMS_REQUEST: {
        return fp.set('isFetchingTeams', true)(state);
    }
    case actions.SET_FETCHING_TEAMS: {
        return fp.set('isFetchingTeams', action.isFetching)(state);
    }
    case actions.CREATE_PLAYER_REQUEST: {
        return fp.set('creatingPlayer', true)(state);
    }
    case actions.CANCEL_CREATING_PLAYER: {
        return fp.set('creatingPlayer', false)(state);
    }
    case actions.CREATE_TEAM_REQUEST: {
        return fp.set('creatingTeam', true)(state);
    }
    case actions.CANCEL_CREATING_TEAM: {
        return fp.set('creatingTeam', false)(state);
    }
    case actions.FETCH_PLAYERS_FOR_TEAM_SUCCESS: {
        return {
            ...state,
            teamsWithPlayers: fp.set(action.teamName, action.players)(state.teamsWithPlayers)
        };
    }
    case actions.FETCH_PLAYERS_FOR_TEAM_REQUEST: {
        return fp.set('isFetchingPlayersForTeam', true)(state);
    }
    case actions.SET_FETCHING_PLAYERS_FOR_TEAM: {
        return fp.set('isFetchingPlayersForTeam', action.isFetching)(state);
    }
    case actions.APPROVE_HIGHLIGHT_REQUEST: {
        return fp.set('highlightBeingApproved', action.highlightId)(state);
    }
    case actions.REJECT_HIGHLIGHT_REQUEST: {
        return fp.set('highlightBeingRejected', action.highlightId)(state);
    }
    case actions.REAPPROVE_REJECTED_HIGHLIGHT_REQUEST: {
        return fp.set('loadingRejectedHighlights', true)(state);
    }
    case actions.DELETE_PLAYER_REQUEST: {
        return fp.set('deletingPlayer', true)(state);
    }
    case actions.CANCEL_DELETING_PLAYER: {
        return fp.set('deletingPlayer', false)(state);
    }
    case actions.DELETE_TEAM_REQUEST: {
        return fp.set('deletingTeam', true)(state);
    }
    case actions.DELETE_TEAM_SUCCESS: {
        return fp.set('deletingTeam', false)(state);
    }
    case actions.SUBMIT_RESULT_REQUEST: {
        return fp.set('submittingResult', true)(state);
    }
    case actions.CANCEL_SUBMITTING_RESULT: {
        return fp.set('submittingResult', false)(state);
    }
    case actions.CANCEL_TRIGGERING_WEEK: {
        return fp.set('triggeringWeek', false)(state);
    }
    case actions.TRIGGER_WEEK_REQUEST: {
        return fp.set('triggeringWeek', true)(state);
    }
    case actions.FETCH_PLAYER_STATS_SUCCESS: {
        return fp.flow(
            fp.set('playerStats.assists', action.playerStats.assists),
            fp.set('playerStats.cleanSheet', action.playerStats.cleanSheet),
            fp.set('playerStats.goals', action.playerStats.goals),
            fp.set('playerStats.redCard', action.playerStats.redCard),
            fp.set('playerStats.yellowCard', action.playerStats.yellowCard),
            fp.set('playerStats.manOfTheMatch', action.playerStats.manOfTheMatch),
            fp.set('playerStats.dickOfTheDay', action.playerStats.dickOfTheDay),
            fp.set('playerStats.ownGoals', action.playerStats.ownGoals),
            fp.set('playerStats.penaltyMisses', action.playerStats.penaltyMisses),
            fp.set('playerStats.penaltySaves', action.playerStats.penaltySaves)
        )(state);
    }
    case actions.CANCEL_FETCHING_PLAYER_STATS: {
        return fp.flow(
            fp.set('playerStats.fetching', false),
            fp.set('fetchingPlayerStats', false)
        )(state);
    }
    case actions.FETCH_PLAYER_STATS_REQUEST: {
        return fp.set('fetchingPlayerStats', true)(state);
    }
    case actions.FETCH_USERS_WITH_EXTRA_ROLES_SUCCESS: {
        return fp.set('usersWithExtraRoles', action.usersWithExtraRoles)(state);
    }
    case actions.FETCH_USERS_WITH_EXTRA_ROLES_REQUEST: {
        return fp.set('fetchingUsersWithExtraRoles', true)(state);
    }
    case actions.LOAD_USERS_WITH_EXTRA_ROLES: {
        return fp.set('fetchingUsersWithExtraRoles', true)(state);
    }
    case actions.CANCEL_FETCHING_USERS_WITH_EXTRA_ROLES: {
        return fp.set('fetchingUsersWithExtraRoles', false)(state);
    }
    case actions.FETCH_HIGHLIGHTS_FOR_APPROVAL_SUCCESS: {
        return {
            ...state,
            highlightsForApproval: action.highlights,
            loadingHighlightsForApproval: false,
            loadedHighlightsForApproval: true
        };
    }
    case actions.CANCEL_FETCHING_HIGHLIGHTS_FOR_APPROVAL: {
        return fp.set('loadingHighlightsForApproval', false)(state);
    }
    case actions.FETCH_HIGHLIGHTS_FOR_APPROVAL_REQUEST: {
        return fp.set('loadingHighlightsForApproval', true)(state);
    }
    case actions.APPROVE_HIGHLIGHT_SUCCESS: {
        return {
            ...state,
            highlightsForApproval: state.highlightsForApproval
                .filter(x => x.id !== action.highlight.id)
        };
    }
    case actions.CANCEL_APPROVING_HIGHLIGHT: {
        return fp.set('highlightBeingApproved', '')(state);
    }
    case actions.REJECT_HIGHLIGHT_SUCCESS: {
        return {
            ...state,
            highlightsForApproval: state.highlightsForApproval
                .filter(x => x.id !== action.highlight.id),
            rejectedHighlights: state.rejectedHighlights.concat([action.highlight])
        };
    }
    case actions.CANCEL_REJECTING_HIGHLIGHT: {
        return fp.set('highlightBeingRejected', '')(state);
    }
    case actions.FETCH_ALL_REJECTED_HIGHLIGHTS_REQUEST: {
        return fp.set('loadingRejectedHighlights', true)(state);
    }
    case actions.FETCH_ALL_REJECTED_HIGHLIGHTS_SUCCESS: {
        return {
            ...state,
            loadedRejectedHighlights: true,
            rejectedHighlights: action.highlights
        };
    }
    case actions.REAPPROVE_REJECTED_HIGHLIGHT_SUCCESS: {
        return fp.set('rejectedHighlights', state.rejectedHighlights.filter(x => x.id !== action.highlight.id))(state);
    }
    case actions.DELETE_HIGHLIGHT_REQUEST: {
        return fp.set('loadingRejectedHighlights', true)(state);
    }
    case actions.DELETE_HIGHLIGHT_SUCCESS: {
        return fp.set('rejectedHighlights', state.rejectedHighlights.concat([action.highlight]))(state);
    }
    case actions.CANCEL_DELETING_HIGHLIGHT: {
        return fp.set('loadingRejectedHighlights', false)(state);
    }
    case actions.CANCEL_FETCHING_REJECTED_HIGHLIGHTS: {
        return fp.set('loadingRejectedHighlights', false)(state);
    }
    case actions.SUBMIT_EXTRA_STATS_REQUEST: {
        return fp.set('submittingExtraResults', true)(state);
    }
    case actions.CANCEL_SUBMITTING_EXTRA_STATS: {
        return fp.set('submittingExtraResults', false)(state);
    }
    case actions.EDIT_PLAYER_STATS_REQUEST: {
        return fp.set('editingStats', true)(state);
    }
    case actions.CANCEL_EDITING_PLAYER_STATS: {
        return fp.set('editingStats', false)(state);
    }
    case modalHandlingActions.CLOSE_ERROR_MESSAGE: {
        return {
            ...state,
            creatingPlayer: false,
            creatingTeam: false,
            deletingPlayer: false,
            deletingTeam: false,
            submittingResult: false,
            triggeringWeek: false,
            fetchingPlayerStats: false,
            fetchingUsersWithExtraRoles: false,
            loadingHighlightsForApproval: false,
            loadingRejectedHighlights: false,
            editingStats: false
        };
    }
    case actions.SET_HAS_PAID_SUBS_REQUEST: {
        return fp.set('updatingSubs', true)(state);
    }
    case actions.CANCEL_UPDATING_SUBS: {
        return fp.set('updatingSubs', false)(state);
    }
    default:
        return state;
    }
};

export default adminReducer;
