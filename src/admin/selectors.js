import fp from 'lodash/fp';

export const getAllTeams = state => state.admin.allTeams;
export const getPlayersInTeam = (state, teamName) => fp.get(teamName)(state.admin.teamsWithPlayers);
