import fp from 'lodash/fp';

export const getUserId = props => fp.flow(fp.get('match'), fp.get('params'), fp.get('userId'))(props);
export const getAlreadyFetchedForUser = (state, userId) => fp.get(`activeTeam.${userId}.fetched`)(state.currentTeam);

export const getFieldForUser = (state, props, field) => fp.flow(
    fp.get('activeTeam'),
    fp.get(getUserId(props)),
    fp.get(field)
)(state.currentTeam);
