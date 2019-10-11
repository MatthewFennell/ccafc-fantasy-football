import fp from 'lodash/fp';

export const getUserInfo = state => state.overview.userInfo;

export const getFetchedUserStats = state => state.overview.fetchedUserStats;

export const getFetchedInitialUserInfo = state => state.overview.fetchedInitialUserInfo;
export const getFetchingUserInfo = state => state.overview.fetchingUserInfo;

export const getCurrentGameWeek = state => state.overview.currentGameWeek;

export const getUserInfoForWeek = state => fp.getOr({},
    state.overview.currentGameWeek)(state.overview.userInfo);

export const getTotalPoints = state => state.overview.totalPoints;
export const getRemainingBudget = state => state.overview.remainingBudget;
export const getRemainingTransfers = state => state.overview.remainingTransfers;

export const getMaxGameWeek = state => state.overview.maxGameWeek;

export const getAlreadyFetchedForWeek = (state, week) => fp.get(`userInfo.${week}.fetched`)(state.overview);
