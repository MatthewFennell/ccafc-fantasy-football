const pre = 'TRANSFERS/';

export const FETCH_ALL_PLAYERS_REQUEST = `${pre}FETCH_ALL_PLAYERS_REQUEST`;
export const FETCH_ALL_PLAYERS_SUCCESS = `${pre}FETCH_ALL_PLAYERS_SUCCESS`;
export const CANCEL_FETCHING_ALL_PLAYERS = `${pre}CANCEL_FETCHING_ALL_PLAYERS`;
export const CANCEL_FETCHING_PLAYERS = `${pre}CANCEL_FETCHING_PLAYERS`;

export const FETCH_ALL_TEAMS_REQUEST = `${pre}FETCH_ALL_TEAMS_REQUEST`;
export const FETCH_ALL_TEAMS_SUCCESS = `${pre}FETCH_ALL_TEAMS_SUCCESS`;

export const ADD_PLAYER_TO_CURRENT_TEAM_REQUEST = `${pre}ADD_PLAYER_TO_CURRENT_TEAM_REQUEST`;
export const ADD_PLAYER_TO_CURRENT_TEAM_SUCCESS = `${pre}ADD_PLAYER_TO_CURRENT_TEAM_SUCCESS`;

export const REMOVE_PLAYER_FROM_CURRENT_TEAM = `${pre}REMOVE_PLAYER_FROM_CURRENT_TEAM`;
export const RESTORE_PLAYER_REQUEST = `${pre}RESTORE_PLAYER_REQUEST`;

export const REPLACE_PLAYER_REQUEST = `${pre}REPLACE_PLAYER_REQUEST`;
export const REPLACE_PLAYER_SUCCESS = `${pre}REPLACE_PLAYER_SUCCESS`;
export const REPLACE_PLAYER_ERROR = `${pre}REPLACE_PLAYER_ERROR`;

export const UNDO_TRANSFER_CHANGES = `${pre}UNDO_TRANSFER_CHANGES`;

export const UPDATE_TEAM_REQUEST = `${pre}UPDATE_TEAM_REQUEST`;
export const CANCEL_UPDATING_TEAM = `${pre}CANCEL_UPDATING_TEAM`;

export const SET_SUCCESS_MESSAGE = `${pre}SET_SUCCESS_MESSAGE`;
export const CLOSE_SUCCESS_MESSAGE = `${pre}CLOSE_SUCCESS_MESSAGE`;

export const CANCEL_FETCHING_ORIGINAL_TEAM = `${pre}CANCEL_FETCHING_ORIGINAL_TEAM`;

export const cancelFetchingOriginalTeam = () => ({
    type: CANCEL_FETCHING_ORIGINAL_TEAM
});

export const setSuccessMessage = message => ({
    type: SET_SUCCESS_MESSAGE,
    message
});

export const closeSuccessMessage = () => ({
    type: CLOSE_SUCCESS_MESSAGE
});

export const replacePlayerSuccess = (oldPlayer, newPlayer) => ({
    type: REPLACE_PLAYER_SUCCESS,
    oldPlayer,
    newPlayer
});

export const replacePlayerRequest = (oldPlayer, newPlayer) => ({
    type: REPLACE_PLAYER_REQUEST,
    oldPlayer,
    newPlayer
});

export const replacePlayerError = error => ({
    type: REPLACE_PLAYER_ERROR,
    error
});

export const restorePlayerRequest = playerId => ({
    type: RESTORE_PLAYER_REQUEST,
    playerId
});

export const cancelFetchingPlayers = () => ({
    type: CANCEL_FETCHING_PLAYERS
});

export const updateTeamRequest = team => ({
    type: UPDATE_TEAM_REQUEST,
    team
});

export const cancelUpdatingTeam = () => ({
    type: CANCEL_UPDATING_TEAM
});

export const removePlayerFromCurrentTeam = player => ({
    type: REMOVE_PLAYER_FROM_CURRENT_TEAM,
    player
});

export const undoTransferChanges = () => ({
    type: UNDO_TRANSFER_CHANGES
});

export const addPlayerToCurrentTeamRequest = player => ({
    type: ADD_PLAYER_TO_CURRENT_TEAM_REQUEST,
    player
});

export const addPlayerToCurrentTeamSuccess = player => ({
    type: ADD_PLAYER_TO_CURRENT_TEAM_SUCCESS,
    player
});

export const fetchAllPlayersRequest = () => ({
    type: FETCH_ALL_PLAYERS_REQUEST
});

export const fetchAllPlayersSuccess = players => ({
    type: FETCH_ALL_PLAYERS_SUCCESS,
    players
});

export const cancelFetchingAllPlayers = () => ({
    type: CANCEL_FETCHING_ALL_PLAYERS
});

export const fetchAllTeamsRequest = () => ({
    type: FETCH_ALL_TEAMS_REQUEST
});

export const fetchAllTeamsSuccess = teams => ({
    type: FETCH_ALL_TEAMS_SUCCESS,
    teams
});
