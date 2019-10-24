import fp from 'lodash/fp';

export const getCreateLeagueError = state => state.leagues.createLeagueError;
export const getCreateLeagueErrorCode = state => state.leagues.createLeagueErrorCode;
export const getCreatingLeague = state => state.leagues.creatingLeague;

export const getJoinLeagueError = state => state.leagues.joinLeagueError;
export const getJoinLeagueErrorCode = state => state.leagues.joinLeagueErrorCode;
export const getJoiningLeague = state => state.leagues.joiningLeague;

export const getLeaveLeagueError = state => state.leagues.leaveLeagueError;
export const getLeaveLeagueErrorCode = state => state.leagues.leaveLeagueErrorCode;
export const getLeavingLeague = state => state.leagues.leavingLeague;

export const getLeagues = state => state.leagues.leagues;
export const getLeagueId = props => fp.flow(fp.get('match'), fp.get('params'), fp.get('leagueId'))(props);

export const getUsersInLeague = (state, props) => fp.flow(fp.get('leagues'),
    fp.get('usersInLeague'), fp.get(getLeagueId(props)), fp.get('users'))(state);

export const getLeagueName = (state, props) => {
    const usersInLeague = getUsersInLeague(state, props);
    return usersInLeague ? fp.get('name')(usersInLeague[0]) : null;
};

export const getUsersInLeagueWithId = (state, id) => fp.flow(
    fp.get('usersInLeague'), fp.get(id), fp.get('users')
)(state.leagues) || [];

export const getFetchingLeagues = state => state.leagues.fetchingLeagues;
export const getFetchingUsersInLeague = (state, props) => fp.flow(
    fp.get(getLeagueId(props)),
    fp.get('fetching')
)(state.leagues.usersInLeague);

export const getFetchedAllUsersInLeague = (state, leagueId) => fp.flow(
    fp.get(leagueId),
    fp.get('fetchedAll')
)(state.leagues.usersInLeague);

export const getNumberOfUsersInLeague = (state, props) => fp.flow(
    fp.get(getLeagueId(props)),
    fp.get('numberOfUsers')
)(state.leagues.usersInLeague);
