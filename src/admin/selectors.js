import fp from 'lodash/fp';

export const getAllTeams = state => state.admin.allTeams;

export const getCreatePlayerError = state => state.admin.createPlayerError;
export const getCreatePlayerErrorCode = state => state.admin.createPlayerErrorCode;
export const getCreatingPlayer = state => state.admin.creatingPlayer;

export const getCreateTeamError = state => state.admin.createTeamError;
export const getCreateTeamErrorCode = state => state.admin.createTeamErrorCode;
export const getCreatingTeam = state => state.admin.creatingTeam;

export const getPlayersInTeam = (state, teamName) => fp.get(teamName)(state.admin.teamsWithPlayers);
export const getTeamsWithPlayers = state => state.admin.teamsWithPlayers;

export const getDeletingPlayer = state => state.admin.deletingPlayer;
export const getDeletePlayerError = state => state.admin.deletePlayerError;
export const getDeletePlayerErrorCode = state => state.admin.deletePlayerErrorCode;

export const getDeletingTeam = state => state.admin.deletingTeam;
export const getDeleteTeamError = state => state.admin.deleteTeamError;
export const getDeleteTeamErrorCode = state => state.admin.deleteTeamErrorCode;
