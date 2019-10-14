import fp from 'lodash/fp';

export const getFetchedUserStats = state => state.overview.fetchedUserStats;
export const getFetchingUserStats = state => state.overview.fetchingUserStats;

export const getCurrentGameWeek = props => parseInt(fp.flow(fp.get('match'), fp.get('params'), fp.get('week'))(props), 10);
export const getUserId = props => fp.flow(fp.get('match'), fp.get('params'), fp.get('userId'))(props);

export const getUserInfo = (state, props, property) => fp.flow(
    fp.get(getUserId(props)),
    fp.get(`week-${getCurrentGameWeek(props)}`),
    fp.get(property)
)(state.overview.userInfo);

export const alreadyFetchedUserInfo = (state, userId, week) => {
    console.log('user id', userId);
    console.log('week', week);
    console.log('state', state.overview);
    return fp.flow(
        fp.get(userId),
        fp.get(`week-${week}`),
        fp.get('fetched')
    )(state.overview.userInfo);
};


export const getTotalPoints = state => state.overview.totalPoints;
export const getRemainingBudget = state => state.overview.remainingBudget;
export const getRemainingTransfers = state => state.overview.remainingTransfers;

export const getMaxGameWeek = state => state.overview.maxGameWeek;
