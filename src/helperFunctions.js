import * as constants from './constants';

export const isDefensive = position => position.toLowerCase() === 'goalkeeper' || position.toLowerCase() === 'defender';

export const generatePointsRoute = (userId, week) => `${constants.URL.POINTS}/${userId}/${week}`;
export const generateOverviewRoute = (userId, week) => `${constants.URL.OVERVIEW}/${userId}/${week}`;
