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
