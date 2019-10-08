import fp from 'lodash/fp';

export const getCreateLeagueError = state => state.leagues.createLeagueError;
export const getCreateLeagueErrorCode = state => state.leagues.createLeagueErrorCode;

export const getLeagues = state => state.leagues.leagues;
export const getLeagueId = props => fp.flow(fp.get('match'), fp.get('params'), fp.get('leagueId'))(props);

export const getUsersInLeague = (state, props) => fp.flow(fp.get('leagues'),
    fp.get('usersInLeague'), fp.get(getLeagueId(props)))(state);

export const getLeagueName = (state, props) => {
    const usersInLeague = getUsersInLeague(state, props);
    return usersInLeague ? fp.get('name')(usersInLeague[0]) : null;
};

export const getUsersInLeagueWithId = (state, id) => fp.flow(fp.get('leagues'),
    fp.get('usersInLeague'), fp.get(id))(state);
