import fp from 'lodash/fp';
import * as actions from './actions';

export const initialState = {
    activeTeam: {},
    captainToUpdate: '',
    isPlayerModalOpen: false,
    isUpdatingCaptain: false
};

const activeTeamReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.FETCH_ACTIVE_TEAM_SUCCESS: {
        return fp.flow(
            fp.set(`activeTeam.${action.userId}.players`, action.activeTeam),
            fp.set(`activeTeam.${action.userId}.fetched`, true),
            fp.set(`activeTeam.${action.userId}.captain`, action.captain)
        )(state);
    }
    case actions.SET_CAPTAIN_TO_UPDATE: {
        return fp.set('captainToUpdate', action.captain)(state);
    }
    case actions.SET_PLAYER_MODAL_OPEN: {
        return fp.set('isPlayerModalOpen', action.isModalOpen)(state);
    }
    case actions.MAKE_CAPTAIN_REQUEST: {
        return fp.set('isUpdatingCaptain', true)(state);
    }
    case actions.SET_UPDATING_CAPTAIN: {
        return fp.set('isUpdatingCaptain', action.isUpdating)(state);
    }
    case actions.CANCEL_FETCHING_ACTIVE_TEAM: {
        return fp.set(`activeTeam.${action.userId}.fetching`, false)(state);
    }
    case actions.FETCH_ACTIVE_TEAM_REQUEST: {
        return fp.set(`activeTeam.${action.userId}.fetching`, true)(state);
    }
    default:
        return state;
    }
};

export default activeTeamReducer;
