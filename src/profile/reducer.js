import fp from 'lodash/fp';
import * as actions from './actions';

export const initialState = {
    attemptedEmailToLink: '',
    updatingDisplayName: false,
    updatingTeamName: false,
    deletingAccount: false,
    photoUrlBeingUpdated: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.UPDATE_PROFILE_PICTURE_REQUEST: {
        return fp.set('photoUrlBeingUpdated', action.photoUrl)(state);
    }
    case actions.CANCEL_PHOTO_URL_BEING_UPDATED: {
        return fp.set('photoUrlBeingUpdated', '')(state);
    }
    case actions.UPDATE_DISPLAY_NAME_REQUEST: {
        return fp.set('updatingDisplayName', true)(state);
    }
    case actions.CANCEL_UPDATING_DISPLAY_NAME: {
        return fp.set('updatingDisplayName', false)(state);
    }
    case actions.UPDATE_TEAM_NAME_REQUEST: {
        return fp.set('updatingTeamName', true)(state);
    }
    case actions.CANCEL_UPDATING_TEAM_NAME: {
        return fp.set('updatingTeamName', false)(state);
    }
    case actions.DELETE_ACCOUNT_REQUEST: {
        return fp.set('deletingAccount', true)(state);
    }
    case actions.CANCEL_DELETING_ACCOUNT: {
        return fp.set('deletingAccount', false)(state);
    }
    default:
        return state;
    }
};

export default profileReducer;
