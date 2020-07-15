const pre = 'CURRENT_TEAM/';

export const RELOAD_ACTIVE_TEAM_REQUEST = `${pre}RELOAD_ACTIVE_TEAM_REQUEST`;
export const FETCH_ACTIVE_TEAM_REQUEST = `${pre}FETCH_ACTIVE_TEAM_REQUEST`;
export const FETCH_ACTIVE_TEAM_SUCCESS = `${pre}FETCH_ACTIVE_TEAM_SUCCESS`;
export const CANCEL_FETCHING_ACTIVE_TEAM = `${pre}CANCEL_FETCHING_ACTIVE_TEAM`;
export const ALREADY_FETCHED_ACTIVE_TEAM = `${pre}ALREADY_FETCHED_ACTIVE_TEAM`;

export const MAKE_CAPTAIN_REQUEST = `${pre}MAKE_CAPTAIN_REQUEST`;
export const SET_UPDATING_CAPTAIN = `${pre}SET_UPDATING_CAPTAIN`;

export const SET_PLAYER_MODAL_OPEN = `${pre}SET_PLAYER_MODAL_OPEN`;

export const cancelFetchingActiveTeam = userId => ({
    type: CANCEL_FETCHING_ACTIVE_TEAM,
    userId
});

export const setPlayerModalOpen = isModalOpen => ({
    type: SET_PLAYER_MODAL_OPEN,
    isModalOpen
});

export const setUpdatingCaptain = isUpdating => ({
    type: SET_UPDATING_CAPTAIN,
    isUpdating
});

export const makeCaptainRequest = playerId => ({
    type: MAKE_CAPTAIN_REQUEST,
    playerId
});

export const fetchActiveTeamRequest = userId => ({
    type: FETCH_ACTIVE_TEAM_REQUEST,
    userId
});

export const reloadActiveTeamRequest = userId => ({
    type: RELOAD_ACTIVE_TEAM_REQUEST,
    userId
});

export const fetchActiveTeamSuccess = (userId, activeTeam, captain) => ({
    type: FETCH_ACTIVE_TEAM_SUCCESS,
    userId,
    activeTeam,
    captain
});

export const alreadyFetchedActiveTeam = userId => ({
    type: ALREADY_FETCHED_ACTIVE_TEAM,
    userId
});
