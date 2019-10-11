import fp from 'lodash/fp';

export const getUserId = props => fp.flow(fp.get('match'), fp.get('params'), fp.get('userId'))(props);

export const getAlreadyFetchedForUser = (state, userId) => fp.get(`activeTeam.${userId}.fetched`)(state.currentTeam);

export const getActiveTeam = (state, props) => fp.flow(fp.get('activeTeam'), fp.get(getUserId(props)))(state.currentTeam);
