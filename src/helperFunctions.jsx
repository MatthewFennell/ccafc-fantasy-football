import React from 'react';
import moment from 'moment';
import * as constants from './constants';

export const isDefensive = position => position.toLowerCase() === 'goalkeeper' || position.toLowerCase() === 'defender';
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
