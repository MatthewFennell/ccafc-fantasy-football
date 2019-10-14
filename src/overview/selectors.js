import fp from 'lodash/fp';

export const getFetchedUserStats = state => state.overview.fetchedUserStats;
export const getFetchingUserStats = state => state.overview.fetchingUserStats;

export const getCurrentGameWeek = props => parseInt(fp.flow(fp.get('match'), fp.get('params'), fp.get('week'))(props), 10);

export const getTotalPoints = state => state.overview.totalPoints;
export const getRemainingBudget = state => state.overview.remainingBudget;
export const getRemainingTransfers = state => state.overview.remainingTransfers;

export const getMaxGameWeek = state => state.overview.maxGameWeek;

export const getUserId = props => fp.flow(fp.get('match'), fp.get('params'), fp.get('userId'))(props);
