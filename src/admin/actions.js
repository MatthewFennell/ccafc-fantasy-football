const pre = 'ADMIN/';

export const FETCH_TEAMS_REQUEST = `${pre}FETCH_TEAMS_REQUEST`;
export const FETCH_TEAMS_SUCCESS = `${pre}FETCH_TEAMS_SUCCESS`;
export const SET_FETCHING_TEAMS = `${pre}SET_FETCHING_TEAMS`;

export const ADD_NOTIFICATION_REQUEST = `${pre}ADD_NOTIFICATION_REQUEST`;
export const CANCEL_ADDING_NOTIFICATION = `${pre}CANCEL_ADDING_NOTIFICATION`;

export const CREATE_PLAYER_REQUEST = `${pre}CREATE_PLAYER_REQUEST`;
export const CANCEL_CREATING_PLAYER = `${pre}CANCEL_CREATING_PLAYER`;

export const EDIT_PLAYER_PRICE_REQUEST = `${pre}EDIT_PLAYER_PRICE_REQUEST`;
export const EDIT_PLAYER_PRICE_SUCCESS = `${pre}EDIT_PLAYER_PRICE_SUCCESS`;
export const CANCEL_EDITING_PLAYER_PRICE = `${pre}CANCEL_EDITING_PLAYER_PRICE`;

export const CREATE_TEAM_REQUEST = `${pre}CREATE_TEAM_REQUEST`;
export const CANCEL_CREATING_TEAM = `${pre}CANCEL_CREATING_TEAM`;

export const SUBMIT_RESULT_REQUEST = `${pre}SUBMIT_RESULT_REQUEST`;
export const CANCEL_SUBMITTING_RESULT = `${pre}CANCEL_SUBMITTING_RESULT`;

export const FETCH_PLAYERS_FOR_TEAM_REQUEST = `${pre}FETCH_PLAYERS_FOR_TEAM_REQUEST`;
export const FETCH_PLAYERS_FOR_TEAM_SUCCESS = `${pre}FETCH_PLAYERS_FOR_TEAM_SUCCESS`;
export const SET_FETCHING_PLAYERS_FOR_TEAM = `${pre}SET_FETCHING_PLAYERS_FOR_TEAM`;

export const DELETE_PLAYER_REQUEST = `${pre}DELETE_PLAYER_REQUEST`;
export const CANCEL_DELETING_PLAYER = `${pre}CANCEL_DELETING_PLAYER`;

export const DELETE_TEAM_REQUEST = `${pre}DELETE_TEAM_REQUEST`;
export const DELETE_TEAM_SUCCESS = `${pre}DELETE_TEAM_SUCCESS`;

export const TRIGGER_WEEK_REQUEST = `${pre}TRIGGER_WEEK_REQUEST`;
export const CANCEL_TRIGGERING_WEEK = `${pre}CANCEL_TRIGGERING_WEEK`;

export const FETCH_PLAYER_STATS_REQUEST = `${pre}FETCH_PLAYER_STATS_REQUEST`;
export const FETCH_PLAYER_STATS_SUCCESS = `${pre}FETCH_PLAYER_STATS_SUCCESS`;
export const CANCEL_FETCHING_PLAYER_STATS = `${pre}CANCEL_FETCHING_PLAYER_STATS`;

export const EDIT_PLAYER_STATS_REQUEST = `${pre}EDIT_PLAYER_STATS_REQUEST`;
export const CANCEL_EDITING_PLAYER_STATS = `${pre}CANCEL_EDITING_PLAYER_STATS`;

export const FETCH_USERS_WITH_EXTRA_ROLES_REQUEST = `${pre}FETCH_USERS_WITH_EXTRA_ROLES_REQUEST`;
export const FETCH_USERS_WITH_EXTRA_ROLES_SUCCESS = `${pre}FETCH_USERS_WITH_EXTRA_ROLES_SUCCESS`;
export const LOAD_USERS_WITH_EXTRA_ROLES = `${pre}LOAD_USERS_WITH_EXTRA_ROLES`;
export const CANCEL_FETCHING_USERS_WITH_EXTRA_ROLES = `${pre}CANCEL_FETCHING_USERS_WITH_EXTRA_ROLES`;

export const FETCH_INITIAL_USERS_REQUEST = `${pre}FETCH_INITIAL_USERS_REQUEST`;
export const FETCH_INITIAL_USERS_SUCCESS = `${pre}FETCH_INITIAL_USERS_SUCCESS`;

export const ADD_USER_ROLE_REQUEST = `${pre}ADD_USER_ROLE_REQUEST`;
export const REMOVE_USER_ROLE_REQUEST = `${pre}REMOVE_USER_ROLE_REQUEST`;

export const CLEAR_DATABASE_REQUEST = `${pre}CLEAR_DATABASE_REQUEST`;

export const ROLL_OVER_TO_NEXT_YEAR_REQUEST = `${pre}ROLL_OVER_TO_NEXT_YEAR_REQUEST`;
export const SET_ROLLING_OVER_TO_NEXT_YEAR = `${pre}SET_ROLLING_OVER_TO_NEXT_YEAR`;

export const DELETE_ALL_OLD_USERS_REQUEST = `${pre}DELETE_ALL_OLD_USERS_REQUEST`;
export const DELETE_ALL_OLD_USERS_SUCCESS = `${pre}DELETE_ALL_OLD_USERS_SUCCESS`;

export const FETCH_HIGHLIGHTS_FOR_APPROVAL_REQUEST = `${pre}FETCH_HIGHLIGHTS_FOR_APPROVAL_REQUEST`;
export const FETCH_HIGHLIGHTS_FOR_APPROVAL_SUCCESS = `${pre}FETCH_HIGHLIGHTS_FOR_APPROVAL_SUCCESS`;
export const CANCEL_FETCHING_HIGHLIGHTS_FOR_APPROVAL = `${pre}CANCEL_FETCHING_HIGHLIGHTS_FOR_APPROVAL`;

export const APPROVE_HIGHLIGHT_REQUEST = `${pre}APPROVE_HIGHLIGHT_REQUEST`;
export const APPROVE_HIGHLIGHT_SUCCESS = `${pre}APPROVE_HIGHLIGHT_SUCCESS`;
export const CANCEL_APPROVING_HIGHLIGHT = `${pre}CANCEL_APPROVING_HIGHLIGHT`;

export const REJECT_HIGHLIGHT_REQUEST = `${pre}REJECT_HIGHLIGHT_REQUEST`;
export const REJECT_HIGHLIGHT_SUCCESS = `${pre}REJECT_HIGHLIGHT_SUCCESS`;
export const CANCEL_REJECTING_HIGHLIGHT = `${pre}CANCEL_REJECTING_HIGHLIGHT`;

export const DELETE_HIGHLIGHT_REQUEST = `${pre}DELETE_HIGHLIGHT_REQUEST`;
export const DELETE_HIGHLIGHT_SUCCESS = `${pre}DELETE_HIGHLIGHT_SUCCESS`;
export const CANCEL_DELETING_HIGHLIGHT = `${pre}CANCEL_DELETING_HIGHLIGHT`;

export const FETCH_ALL_REJECTED_HIGHLIGHTS_REQUEST = `${pre}FETCH_ALL_REJECTED_HIGHLIGHTS_REQUEST`;
export const FETCH_ALL_REJECTED_HIGHLIGHTS_SUCCESS = `${pre}FETCH_ALL_REJECTED_HIGHLIGHTS_SUCCESS`;
export const CANCEL_FETCHING_REJECTED_HIGHLIGHTS = `${pre}CANCEL_FETCHING_REJECTED_HIGHLIGHTS`;

export const REAPPROVE_REJECTED_HIGHLIGHT_REQUEST = `${pre}REAPPROVE_REJECTED_HIGHLIGHT_REQUEST`;
export const REAPPROVE_REJECTED_HIGHLIGHT_SUCCESS = `${pre}REAPPROVE_REJECTED_HIGHLIGHT_SUCCESS`;
export const CANCEL_LOADING_REJECTED_HIGHLIGHTS = `${pre}CANCEL_LOADING_REJECTED_HIGHLIGHTS`;

export const SUBMIT_EXTRA_STATS_REQUEST = `${pre}SUBMIT_EXTRA_STATS_REQUEST`;
export const CANCEL_SUBMITTING_EXTRA_STATS = `${pre}CANCEL_SUBMITTING_EXTRA_STATS`;

export const SET_HAS_PAID_SUBS_REQUEST = `${pre}SET_HAS_PAID_SUBS_REQUEST`;
export const CANCEL_UPDATING_SUBS = `${pre}CANCEL_UPDATING_SUBS`;

export const RECALCULATE_LEAGUE_POSITIONS_REQUEST = `${pre}RECALCULATE_LEAGUE_POSITIONS_REQUEST`;
export const SET_RECALCULATING_LEAGUE_POSITIONS = `${pre}SET_RECALCULATING_LEAGUE_POSITIONS`;

export const DELETE_FEATURE_REQUEST = `${pre}DELETE_FEATURE_REQUEST`;
export const CANCEL_DELETING_BUG = `${pre}CANCEL_DELETING_BUG`;
export const SET_BUG_ID_TO_DELETE = `${pre}SET_BUG_ID_TO_DELETE`;

export const SUBMIT_CUSTOM_RESULTS = `${pre}SUBMIT_CUSTOM_RESULTS`;

export const COMPRESS_PLAYERS_DATABASE = `${pre}COMPRESS_PLAYERS_DATABASE`;
export const CANCEL_COMPRESSING_PLAYERS_DATABASE = `${pre}CANCEL_COMPRESSING_PLAYERS_DATABASE`;

export const compressPlayersDatabase = () => ({
    type: COMPRESS_PLAYERS_DATABASE,
});

export const cancelCompressingPlayersDatabase = () => ({
    type: CANCEL_COMPRESSING_PLAYERS_DATABASE,
});

export const addNotificationRequest = notification => ({
    type: ADD_NOTIFICATION_REQUEST,
    notification
});

export const cancelAddingNotification = () => ({
    type: CANCEL_ADDING_NOTIFICATION
});

export const cancelDeletingBug = () => ({
    type: CANCEL_DELETING_BUG
});

export const setBugIdToDelete = bugId => ({
    type: SET_BUG_ID_TO_DELETE,
    bugId
});

export const deleteFeatureRequest = featureId => ({
    type: DELETE_FEATURE_REQUEST,
    featureId
});

export const setRecalculatingLeaguePositions = isRecalculating => ({
    type: SET_RECALCULATING_LEAGUE_POSITIONS,
    isRecalculating
});

export const submitCustumResults = week => ({
    type: SUBMIT_CUSTOM_RESULTS,
    week
});

export const recalculateLeaguePositionsRequest = () => ({
    type: RECALCULATE_LEAGUE_POSITIONS_REQUEST
});

export const cancelUpdatingSubs = changes => ({
    type: CANCEL_UPDATING_SUBS,
    changes
});

export const setHasPaidSubsRequest = changes => ({
    type: SET_HAS_PAID_SUBS_REQUEST,
    changes
});

export const submitExtraStatsRequest = (
    gameWeek, yellowCard, redCard, penaltySaved, penaltyMissed, ownGoal
) => ({
    type: SUBMIT_EXTRA_STATS_REQUEST,
    gameWeek,
    yellowCard,
    redCard,
    penaltySaved,
    penaltyMissed,
    ownGoal
});

export const cancelSubmittingExtraStats = () => ({
    type: CANCEL_SUBMITTING_EXTRA_STATS
});

export const reapproveRejectedHighlightRequest = highlightId => ({
    type: REAPPROVE_REJECTED_HIGHLIGHT_REQUEST,
    highlightId
});

export const reapproveRejectedHighlightSuccess = highlight => ({
    type: REAPPROVE_REJECTED_HIGHLIGHT_SUCCESS,
    highlight
});

export const cancelLoadingRejectedHighlights = () => ({
    type: CANCEL_LOADING_REJECTED_HIGHLIGHTS
});

export const fetchAllRejectedHighlightsRequest = () => ({
    type: FETCH_ALL_REJECTED_HIGHLIGHTS_REQUEST
});

export const fetchAllRejectedHighlightsSuccess = highlights => ({
    type: FETCH_ALL_REJECTED_HIGHLIGHTS_SUCCESS,
    highlights
});

export const cancelFetchingRejectedHighlights = () => ({
    type: CANCEL_FETCHING_REJECTED_HIGHLIGHTS
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

export const cancelDeletingHighlight = () => ({
    type: CANCEL_DELETING_HIGHLIGHT
});

export const cancelingFetchingHighlightsForApproval = () => ({
    type: CANCEL_FETCHING_HIGHLIGHTS_FOR_APPROVAL
});

export const approveHighlightRequest = highlightId => ({
    type: APPROVE_HIGHLIGHT_REQUEST,
    highlightId
});

export const approveHighlightSuccess = highlight => ({
    type: APPROVE_HIGHLIGHT_SUCCESS,
    highlight
});

export const cancelApprovingHighlight = () => ({
    type: CANCEL_APPROVING_HIGHLIGHT
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

export const cancelRejectingHighlight = () => ({
    type: CANCEL_REJECTING_HIGHLIGHT
});

export const fetchHighlightsForApprovalSuccess = highlights => ({
    type: FETCH_HIGHLIGHTS_FOR_APPROVAL_SUCCESS,
    highlights
});

export const fetchHighlightsForApprovalRequest = () => ({
    type: FETCH_HIGHLIGHTS_FOR_APPROVAL_REQUEST
});

export const deleteAllOldUsersRequest = () => ({
    type: DELETE_ALL_OLD_USERS_REQUEST
});

export const deleteAllOldUsersSuccess = () => ({
    type: DELETE_ALL_OLD_USERS_SUCCESS
});

export const rollOverToNextYearRequest = () => ({
    type: ROLL_OVER_TO_NEXT_YEAR_REQUEST
});

export const setRollingOverToNextYear = isRollingOver => ({
    type: SET_ROLLING_OVER_TO_NEXT_YEAR,
    isRollingOver
});

export const clearDatabaseRequest = () => ({
    type: CLEAR_DATABASE_REQUEST
});

export const cancelFetchingUsersWithExtraRoles = () => ({
    type: CANCEL_FETCHING_USERS_WITH_EXTRA_ROLES
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

export const fetchUsersWithExtraRolesRequest = () => ({
    type: FETCH_USERS_WITH_EXTRA_ROLES_REQUEST
});

export const fetchUsersWithExtraRolesSuccess = usersWithExtraRoles => ({
    type: FETCH_USERS_WITH_EXTRA_ROLES_SUCCESS,
    usersWithExtraRoles
});

// -------------------------------------------------------------------- \\

export const editPlayerStatsRequest = (playerId, week, difference) => ({
    type: EDIT_PLAYER_STATS_REQUEST,
    playerId,
    week,
    difference
});

export const cancelEditingPlayerStats = () => ({
    type: CANCEL_EDITING_PLAYER_STATS
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

export const cancelFetchingPlayerStats = () => ({
    type: CANCEL_FETCHING_PLAYER_STATS
});

// -------------------------------------------------------------------- \\

export const triggerWeekRequest = week => ({
    type: TRIGGER_WEEK_REQUEST,
    week
});

export const cancelTriggeringWeek = () => ({
    type: CANCEL_TRIGGERING_WEEK
});

// -------------------------------------------------------------------- \\

export const fetchTeamsRequest = () => ({
    type: FETCH_TEAMS_REQUEST
});

export const fetchTeamsSuccess = teams => ({
    type: FETCH_TEAMS_SUCCESS,
    teams
});

export const setFetchingTeams = isFetching => ({
    type: SET_FETCHING_TEAMS,
    isFetching
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

export const cancelCreatingPlayer = () => ({
    type: CANCEL_CREATING_PLAYER
});

export const editPlayerPriceRequest = (playerId, newPrice, playerTeam) => ({
    type: EDIT_PLAYER_PRICE_REQUEST,
    playerId,
    newPrice,
    playerTeam
});

export const editPlayerPriceSuccess = (playerId, newPrice, playerTeam) => ({
    type: EDIT_PLAYER_PRICE_SUCCESS,
    playerId,
    newPrice,
    playerTeam
});

export const cancelEditingPlayerPrice = () => ({
    type: CANCEL_EDITING_PLAYER_PRICE
});

// -------------------------------------------------------------------- \\

export const createTeamRequest = teamName => ({
    type: CREATE_TEAM_REQUEST,
    teamName
});

export const cancelCreatingTeam = () => ({
    type: CANCEL_CREATING_TEAM
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

export const cancelSubmittingResult = () => ({
    type: CANCEL_SUBMITTING_RESULT
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

export const setFetchingPlayersForTeam = isFetching => ({
    type: SET_FETCHING_PLAYERS_FOR_TEAM,
    isFetching
});

// -------------------------------------------------------------------- \\

export const deletePlayerRequest = playerId => ({
    type: DELETE_PLAYER_REQUEST,
    playerId
});

export const cancelDeletingPlayer = () => ({
    type: CANCEL_DELETING_PLAYER
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

// -------------------------------------------------------------------- \\
