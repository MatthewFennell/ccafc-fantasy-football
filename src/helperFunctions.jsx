/* eslint-disable no-underscore-dangle */
import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import * as constants from './constants';

export const isDefensive = position => position.toLowerCase() === 'goalkeeper' || position.toLowerCase() === 'defender' || position.toLowerCase() === 'midfielder';
export const generatePointsRoute = (userId, week) => `${constants.URL.POINTS}/${userId}/${week}`;
export const generateOverviewRoute = (userId, week) => `${constants.URL.OVERVIEW}/${userId}/${week}`;

// eslint-disable-next-line no-underscore-dangle
export const generateTimeSinceNow = date => moment(new Date(date._seconds * 1000)).startOf('second').fromNow();

export const generateYouTubeLinkFromId = id => (
    <a
        href={`https://www.youtube.com/watch?v=${id}`}
        target="_blank"
        rel="noopener noreferrer"
    >
        {`https://www.youtube.com/watch?v=${id}`}

    </a>
);

export const uniqueCollegeTeamsFromFixtures = (fixtures, team) => fixtures
    .reduce((acc, cur) => _.union(acc, [cur.teamOne, cur.teamTwo]
        .filter(x => x.includes(team))), []);

export const convertToDate = d => moment(d, 'DD-MM-YYYY hh:mm');
const isFutureTense = date => moment(date, 'DD-MM-YYYY hh:mm')
    .isAfter(moment().subtract(constants.matchLengthMinutes, 'minutes'));

export const filterFixturesByTime = (fixtures, isFuture) => fixtures
    .filter(x => (isFuture ? isFutureTense(x.time) : !isFutureTense(x.time)));

export const sortMatchesByDate = (fixtures, isDesc) => (isDesc
    ? fixtures.sort((a, b) => (convertToDate(a.time) > convertToDate(b.time) ? -1 : 1))
    : fixtures.sort((a, b) => (convertToDate(a.time) > convertToDate(b.time) ? 1 : -1))
);

export const getNextMatchPerTeam = (fixtures, team) => {
    const uniqueTeams = uniqueCollegeTeamsFromFixtures(fixtures, team);
    const futureMatches = filterFixturesByTime(fixtures, true);
    const sortedByDateFixtures = sortMatchesByDate(futureMatches, false);
    const nextMatchPerTeam = uniqueTeams.map(x => sortedByDateFixtures
        .find(y => y.teamOne === x || y.teamTwo === x))
        .filter(x => x !== undefined); // Some teams have no matches left
    const removedDuplicates = _.uniqBy(nextMatchPerTeam, x => x.teamOne + x.teamTwo);
    return removedDuplicates;
};

export const generateCsvTitle = title => {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const day = date.getDate();
    return `${title}_${day}_${month}_${year}.csv`;
};

export const getMensFixtures = fixtures => fixtures.filter(fixture => fixture.isMen);
export const getWomensFixtures = fixtures => fixtures.filter(fixture => !fixture.isMen);
