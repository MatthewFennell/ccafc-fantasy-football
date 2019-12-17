const pre = 'ADMIN/';

export const FETCH_TEAMS_REQUEST = `${pre}FETCH_TEAMS_REQUEST`;
export const FETCH_TEAMS_SUCCESS = `${pre}FETCH_TEAMS_SUCCESS`;
export const FETCH_TEAMS_ERROR = `${pre}FETCH_TEAMS_ERROR`;

export const CREATE_PLAYER_REQUEST = `${pre}CREATE_PLAYER_REQUEST`;
export const CREATE_PLAYER_SUCCESS = `${pre}CREATE_PLAYER_SUCCESS`;
export const CREATE_PLAYER_ERROR = `${pre}CREATE_PLAYER_ERROR`;
export const CLOSE_CREATE_PLAYER_ERROR = `${pre}CLOSE_CREATE_PLAYER_ERROR`;

export const CREATE_TEAM_REQUEST = `${pre}CREATE_TEAM_REQUEST`;
export const CREATE_TEAM_SUCCESS = `${pre}CREATE_TEAM_SUCCESS`;
export const CREATE_TEAM_ERROR = `${pre}CREATE_TEAM_ERROR`;
export const CLOSE_CREATE_TEAM_ERROR = `${pre}CLOSE_CREATE_TEAM_ERROR`;

export const SUBMIT_RESULT_REQUEST = `${pre}SUBMIT_RESULT_REQUEST`;
export const SUBMIT_RESULT_SUCCESS = `${pre}SUBMIT_RESULT_SUCCESS`;
export const SUBMIT_RESULT_ERROR = `${pre}SUBMIT_RESULT_ERROR`;
export const CLOSE_SUBMIT_RESULT_ERROR = `${pre}CLOSE_SUBMIT_RESULT_ERROR`;

export const FETCH_PLAYERS_FOR_TEAM_REQUEST = `${pre}FETCH_PLAYERS_FOR_TEAM_REQUEST`;
export const FETCH_PLAYERS_FOR_TEAM_SUCCESS = `${pre}FETCH_PLAYERS_FOR_TEAM_SUCCESS`;

export const DELETE_PLAYER_REQUEST = `${pre}DELETE_PLAYER_REQUEST`;
export const DELETE_PLAYER_SUCCESS = `${pre}DELETE_PLAYER_SUCCESS`;
export const DELETE_PLAYER_ERROR = `${pre}DELETE_PLAYER_ERROR`;
export const CLOSE_DELETE_PLAYER_ERROR = `${pre}CLOSE_DELETE_PLAYER_ERROR`;

export const DELETE_TEAM_REQUEST = `${pre}DELETE_TEAM_REQUEST`;
export const DELETE_TEAM_SUCCESS = `${pre}DELETE_TEAM_SUCCESS`;
export const DELETE_TEAM_ERROR = `${pre}DELETE_TEAM_ERROR`;
export const CLOSE_DELETE_TEAM_ERROR = `${pre}CLOSE_DELETE_TEAM_ERROR`;

export const TRIGGER_WEEK_REQUEST = `${pre}TRIGGER_WEEK_REQUEST`;
export const TRIGGER_WEEK_SUCCESS = `${pre}TRIGGER_WEEK_SUCCESS`;
export const TRIGGER_WEEK_ERROR = `${pre}TRIGGER_WEEK_ERROR`;
export const CLOSE_TRIGGER_WEEK_ERROR = `${pre}CLOSE_TRIGGER_WEEK_ERROR`;

export const FETCH_PLAYER_STATS_REQUEST = `${pre}FETCH_PLAYER_STATS_REQUEST`;
export const FETCH_PLAYER_STATS_SUCCESS = `${pre}FETCH_PLAYER_STATS_SUCCESS`;
export const FETCH_PLAYER_STATS_ERROR = `${pre}FETCH_PLAYER_STATS_ERROR`;
export const CLOSE_FETCH_PLAYER_STATS_ERROR = `${pre}CLOSE_FETCH_PLAYER_STATS_ERROR`;

export const EDIT_PLAYER_STATS_REQUEST = `${pre}EDIT_PLAYER_STATS_REQUEST`;
export const EDIT_PLAYER_STATS_ERROR = `${pre}EDIT_PLAYER_STATS_ERROR`;

export const FETCH_USERS_WITH_EXTRA_ROLES_REQUEST = `${pre}FETCH_USERS_WITH_EXTRA_ROLES_REQUEST`;
export const FETCH_USERS_WITH_EXTRA_ROLES_SUCCESS = `${pre}FETCH_USERS_WITH_EXTRA_ROLES_SUCCESS`;
export const FETCH_USERS_WITH_EXTRA_ROLES_ERROR = `${pre}FETCH_USERS_WITH_EXTRA_ROLES_ERROR`;
export const LOAD_USERS_WITH_EXTRA_ROLES = `${pre}LOAD_USERS_WITH_EXTRA_ROLES`;
export const ALREADY_FETCHED_USERS_WITH_EXTRA_ROLES = `${pre}ALREADY_FETCHED_USERS_WITH_EXTRA_ROLES`;

export const FETCH_INITIAL_USERS_REQUEST = `${pre}FETCH_INITIAL_USERS_REQUEST`;
export const FETCH_INITIAL_USERS_SUCCESS = `${pre}FETCH_INITIAL_USERS_SUCCESS`;
export const FETCH_INITIAL_USERS_ERROR = `${pre}FETCH_INITIAL_USERS_ERROR`;

export const ADD_USER_ROLE_REQUEST = `${pre}ADD_USER_ROLE_REQUEST`;
export const REMOVE_USER_ROLE_REQUEST = `${pre}REMOVE_USER_ROLE_REQUEST`;
export const ADD_USER_ROLE_ERROR = `${pre}ADD_USER_ROLE_ERROR`;
export const REMOVE_USER_ROLE_ERROR = `${pre}REMOVE_USER_ROLE_ERROR`;
export const CLOSE_REMOVE_USER_ROLE_ERROR = `${pre}CLOSE_REMOVE_USER_ROLE_ERROR`;

export const CLEAR_DATABASE_REQUEST = `${pre}CLEAR_DATABASE_REQUEST`;
export const CLEAR_DATABASE_ERROR = `${pre}CLEAR_DATABASE_ERROR`;

export const ROLL_OVER_TO_NEXT_YEAR_REQUEST = `${pre}ROLL_OVER_TO_NEXT_YEAR_REQUEST`;
export const ROLL_OVER_TO_NEXT_YEAR_ERROR = `${pre}ROLL_OVER_TO_NEXT_YEAR_ERROR`;

export const DELETE_ALL_OLD_USERS_REQUEST = `${pre}DELETE_ALL_OLD_USERS_REQUEST`;
export const DELETE_ALL_OLD_USERS_ERROR = `${pre}DELETE_ALL_OLD_USERS_ERROR`;

export const FETCH_HIGHLIGHTS_FOR_APPROVAL_REQUEST = `${pre}FETCH_HIGHLIGHTS_FOR_APPROVAL_REQUEST`;
export const FETCH_HIGHLIGHTS_FOR_APPROVAL_SUCCESS = `${pre}FETCH_HIGHLIGHTS_FOR_APPROVAL_SUCCESS`;
export const FETCH_HIGHLIGHTS_FOR_APPROVAL_ERROR = `${pre}FETCH_HIGHLIGHTS_FOR_APPROVAL_ERROR`;
export const ALREADY_FETCHED_HIGHLIGHTS_FOR_APPROVAL = `${pre}ALREADY_FETCHED_HIGHLIGHTS_FOR_APPROVAL`;

export const APPROVE_HIGHLIGHT_REQUEST = `${pre}APPROVE_HIGHLIGHT_REQUEST`;
export const APPROVE_HIGHLIGHT_SUCCESS = `${pre}APPROVE_HIGHLIGHT_SUCCESS`;
export const APPROVE_HIGHLIGHT_ERROR = `${pre}APPROVE_HIGHLIGHT_ERROR`;

export const REJECT_HIGHLIGHT_REQUEST = `${pre}REJECT_HIGHLIGHT_REQUEST`;
export const REJECT_HIGHLIGHT_SUCCESS = `${pre}REJECT_HIGHLIGHT_SUCCESS`;
export const REJECT_HIGHLIGHT_ERROR = `${pre}REJECT_HIGHLIGHT_ERROR`;

export const DELETE_HIGHLIGHT_REQUEST = `${pre}DELETE_HIGHLIGHT_REQUEST`;
export const DELETE_HIGHLIGHT_SUCCESS = `${pre}DELETE_HIGHLIGHT_SUCCESS`;
export const DELETE_HIGHLIGHT_ERROR = `${pre}DELETE_HIGHLIGHT_ERROR`;

export const FETCH_ALL_REJECTED_HIGHLIGHTS_REQUEST = `${pre}FETCH_ALL_REJECTED_HIGHLIGHTS_REQUEST`;
export const FETCH_ALL_REJECTED_HIGHLIGHTS_SUCCESS = `${pre}FETCH_ALL_REJECTED_HIGHLIGHTS_SUCCESS`;
export const FETCH_ALL_REJECTED_HIGHLIGHTS_ERROR = `${pre}FETCH_ALL_REJECTED_HIGHLIGHTS_ERROR`;
export const ALREADY_FETCHED_REJECTED_HIGHLIGHTS = `${pre}ALREADY_FETCHED_REJECTED_HIGHLIGHTS`;

export const REAPPROVE_REJECTED_HIGHLIGHT_REQUEST = `${pre}REAPPROVE_REJECTED_HIGHLIGHT_REQUEST`;
export const REAPPROVE_REJECTED_HIGHLIGHT_SUCCESS = `${pre}REAPPROVE_REJECTED_HIGHLIGHT_SUCCESS`;
export const REAPPROVE_REJECTED_HIGHLIGHT_ERROR = `${pre}REAPPROVE_REJECTED_HIGHLIGHT_ERROR`;

export const reapproveRejectedHighlightRequest = highlightId => ({
    type: REAPPROVE_REJECTED_HIGHLIGHT_REQUEST,
    highlightId
});

export const reapproveRejectedHighlightSuccess = highlight => ({
    type: REAPPROVE_REJECTED_HIGHLIGHT_SUCCESS,
    highlight
});

export const reapproveRejectedHighlightError = highlightId => ({
    type: REAPPROVE_REJECTED_HIGHLIGHT_ERROR,
    highlightId
});

export const fetchAllRejectedHighlightsRequest = () => ({
    type: FETCH_ALL_REJECTED_HIGHLIGHTS_REQUEST
});

export const fetchAllRejectedHighlightsSuccess = highlights => ({
    type: FETCH_ALL_REJECTED_HIGHLIGHTS_SUCCESS,
    highlights
});

export const fetchAllRejectedHighlightsError = error => ({
    type: FETCH_ALL_REJECTED_HIGHLIGHTS_ERROR,
    error
});

export const alreadyFetchedRejectedHighlights = () => ({
    type: ALREADY_FETCHED_REJECTED_HIGHLIGHTS
});

export const deleteHighlightRequest = (highlightId, reason) => ({
    type: DELETE_HIGHLIGHT_REQUEST,
    highlightId,
    reason
});

export const deleteHighlightSuccess = highlight => ({
    type: DELETE_HIGHLIGHT_SUCCESS,
    highlight
});

export const deleteHighlightError = error => ({
    type: DELETE_HIGHLIGHT_ERROR,
    error
});

export const alreadyFetchedHighlightsForApproval = () => ({
    type: ALREADY_FETCHED_HIGHLIGHTS_FOR_APPROVAL
});

export const approveHighlightRequest = highlightId => ({
    type: APPROVE_HIGHLIGHT_REQUEST,
    highlightId
});

export const approveHighlightSuccess = highlight => ({
    type: APPROVE_HIGHLIGHT_SUCCESS,
    highlight
});

export const approveHighlightError = error => ({
    type: APPROVE_HIGHLIGHT_ERROR,
    error
});

export const rejectHighlightRequest = (highlightId, reason) => ({
    type: REJECT_HIGHLIGHT_REQUEST,
    highlightId,
    reason
});

export const rejectHighlightSuccess = highlight => ({
    type: REJECT_HIGHLIGHT_SUCCESS,
    highlight
});

export const rejectHighlightError = error => ({
    type: REJECT_HIGHLIGHT_ERROR,
    error
});

export const fetchHighlightsForApprovalSuccess = highlights => ({
    type: FETCH_HIGHLIGHTS_FOR_APPROVAL_SUCCESS,
    highlights
});

export const fetchHighlightsForApprovalRequest = () => ({
    type: FETCH_HIGHLIGHTS_FOR_APPROVAL_REQUEST
});

export const fetchHighlightsForApprovalError = error => ({
    type: FETCH_HIGHLIGHTS_FOR_APPROVAL_ERROR,
    error
});

export const deleteAllOldUsersRequest = () => ({
    type: DELETE_ALL_OLD_USERS_REQUEST
});

export const deleteAllOldUsersError = () => ({
    type: DELETE_ALL_OLD_USERS_ERROR
});

export const rollOverToNextYearRequest = () => ({
    type: ROLL_OVER_TO_NEXT_YEAR_REQUEST
});

export const rollOverToNextYearError = () => ({
    type: ROLL_OVER_TO_NEXT_YEAR_ERROR
});

export const clearDatabaseRequest = () => ({
    type: CLEAR_DATABASE_REQUEST
});

export const clearDatabaseError = () => ({
    type: CLEAR_DATABASE_ERROR
});

export const alreadyFetchedUsersWithExtraRoles = () => ({
    type: ALREADY_FETCHED_USERS_WITH_EXTRA_ROLES
});

export const closeRemoveUserRoleError = () => ({
    type: CLOSE_REMOVE_USER_ROLE_ERROR
});

export const loadUsersWithExtraRoles = () => ({
    type: LOAD_USERS_WITH_EXTRA_ROLES
});

export const addUserRoleRequest = (email, role) => ({
    type: ADD_USER_ROLE_REQUEST,
    email,
    role
});

export const removeUserRoleRequest = (email, role) => ({
    type: REMOVE_USER_ROLE_REQUEST,
    email,
    role
});

export const addUserRoleError = error => ({
    type: ADD_USER_ROLE_ERROR,
    error
});

export const removeUserRoleError = error => ({
    type: REMOVE_USER_ROLE_ERROR,
    error
});

export const fetchUsersWithExtraRolesRequest = () => ({
    type: FETCH_USERS_WITH_EXTRA_ROLES_REQUEST
});

export const fetchUsersWithExtraRolesSuccess = usersWithExtraRoles => ({
    type: FETCH_USERS_WITH_EXTRA_ROLES_SUCCESS,
    usersWithExtraRoles
});

export const fetchUsersWithExtraRolesError = error => ({
    type: FETCH_USERS_WITH_EXTRA_ROLES_ERROR,
    error
});

// -------------------------------------------------------------------- \\

export const editPlayerStatsRequest = (playerId, week, difference) => ({
    type: EDIT_PLAYER_STATS_REQUEST,
    playerId,
    week,
    difference
});

export const editPlayerStatsError = error => ({
    type: EDIT_PLAYER_STATS_ERROR,
    error
});

// -------------------------------------------------------------------- \\

export const fetchPlayerStatsRequest = (playerId, week) => ({
    type: FETCH_PLAYER_STATS_REQUEST,
    playerId,
    week
});

export const fetchPlayerStatsSuccess = playerStats => ({
    type: FETCH_PLAYER_STATS_SUCCESS,
    playerStats
});

export const fetchPlayerStatsError = error => ({
    type: FETCH_PLAYER_STATS_ERROR,
    error
});

// -------------------------------------------------------------------- \\

export const triggerWeekRequest = week => ({
    type: TRIGGER_WEEK_REQUEST,
    week
});

export const triggerWeekSuccess = () => ({
    type: TRIGGER_WEEK_SUCCESS
});

export const triggerWeekError = error => ({
    type: TRIGGER_WEEK_ERROR,
    error
});

export const closeTriggerWeekError = () => ({
    type: CLOSE_TRIGGER_WEEK_ERROR
});


// -------------------------------------------------------------------- \\

export const fetchTeamsRequest = () => ({
    type: FETCH_TEAMS_REQUEST
});

export const fetchTeamsSuccess = teams => ({
    type: FETCH_TEAMS_SUCCESS,
    teams
});

export const fetchTeamsError = error => ({
    type: FETCH_TEAMS_ERROR,
    error
});

// -------------------------------------------------------------------- \\

export const createPlayerRequest = (name, position, price, team, previousScore) => ({
    type: CREATE_PLAYER_REQUEST,
    name,
    position,
    price,
    team,
    previousScore
});

export const createPlayerSuccess = () => ({
    type: CREATE_PLAYER_SUCCESS
});

export const createPlayerError = error => ({
    type: CREATE_PLAYER_ERROR,
    error
});

export const closeCreatePlayerError = () => ({
    type: CLOSE_CREATE_PLAYER_ERROR
});

// -------------------------------------------------------------------- \\

export const createTeamRequest = teamName => ({
    type: CREATE_TEAM_REQUEST,
    teamName
});

export const createTeamSuccess = () => ({
    type: CREATE_TEAM_SUCCESS
});

export const createTeamError = error => ({
    type: CREATE_TEAM_ERROR,
    error
});


export const closeCreateTeamError = () => ({
    type: CLOSE_CREATE_TEAM_ERROR
});

// -------------------------------------------------------------------- \\

export const submitResultRequest = (teamId, goalsFor, goalsAgainst, week, players) => ({
    type: SUBMIT_RESULT_REQUEST,
    teamId,
    goalsFor,
    goalsAgainst,
    week,
    players
});

export const submitResultSuccess = () => ({
    type: SUBMIT_RESULT_SUCCESS
});

export const submitResultError = error => ({
    type: SUBMIT_RESULT_ERROR,
    error
});

export const closeSubmitResultError = () => ({
    type: CLOSE_SUBMIT_RESULT_ERROR
});

// -------------------------------------------------------------------- \\

export const fetchPlayersForTeamRequest = teamName => ({
    type: FETCH_PLAYERS_FOR_TEAM_REQUEST,
    teamName
});

export const fetchPlayersForTeamSuccess = (teamName, players) => ({
    type: FETCH_PLAYERS_FOR_TEAM_SUCCESS,
    teamName,
    players
});

// -------------------------------------------------------------------- \\

export const deletePlayerRequest = playerId => ({
    type: DELETE_PLAYER_REQUEST,
    playerId
});

export const deletePlayerSuccess = () => ({
    type: DELETE_PLAYER_SUCCESS
});

export const deletePlayerError = error => ({
    type: DELETE_PLAYER_ERROR,
    error
});

export const closeDeletePlayerError = () => ({
    type: CLOSE_DELETE_PLAYER_ERROR
});

// -------------------------------------------------------------------- \\

export const deleteTeamRequest = (teamId, teamName) => ({
    type: DELETE_TEAM_REQUEST,
    teamId,
    teamName
});

export const deleteTeamSuccess = () => ({
    type: DELETE_TEAM_SUCCESS
});

export const deleteTeamError = error => ({
    type: DELETE_TEAM_ERROR,
    error
});

export const closeDeleteTeamError = () => ({
    type: CLOSE_DELETE_TEAM_ERROR
});

// -------------------------------------------------------------------- \\
