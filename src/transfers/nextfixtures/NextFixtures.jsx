import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import defaultStyles from './NextFixtures.module.scss';
import MatchRow from './MatchRow';

const convertToDate = d => moment(d, 'DD-MM-YYYY hh:mm');

const convertToDay = d => moment(d, 'DD-MM-YYYY')
    .format('ddd, MMMM Do YYYY');

const isFuture = date => moment(date, 'DD-MM-YYYY hh:mm').isAfter(moment().subtract(100, 'minutes'));

const NextFixtures = props => {
    const uniqueTeams = props.fixtures.reduce((acc, cur) => _.union(acc,
        [cur.teamOne, cur.teamTwo].filter(x => x.includes('Collingwood'))), []);

    const sortedByDateFixtures = props.fixtures.filter(x => isFuture(x.time))
        .sort((a, b) => (convertToDate(a.time) > convertToDate(b.time) ? 1 : -1));

    const nextMatchPerTeam = uniqueTeams.map(x => sortedByDateFixtures
        .find(y => y.teamOne === x || y.teamTwo === x));

    const removedDuplicates = _.uniqBy(nextMatchPerTeam, x => x.teamOne + x.teamTwo)
        .sort((a, b) => (convertToDate(a.time) > convertToDate(b.time) ? 1 : -1));

    const daysOfYear = _.uniq(removedDuplicates.map(x => convertToDay(x.time)));

    return (
        <div className={props.styles.nextFixturesWrapper}>
            <div className={props.styles.headerMessage}>
                Upcoming Fixtures
            </div>

            {daysOfYear.map(x => (
                <div className={props.styles.datesWrapper}>
                    <div className={props.styles.dateHeader}>
                        {x}
                    </div>
                    <div className={props.styles.setOfMatchesWrapper}>
                        {removedDuplicates.filter(match => convertToDay(match.time) === x)
                            .map(match => <MatchRow match={match} />)}
                    </div>
                </div>
            ))}
        </div>
    );
};

NextFixtures.defaultProps = {
    fixtures: [],
    styles: defaultStyles
};

NextFixtures.propTypes = {
    fixtures: PropTypes.arrayOf(PropTypes.shape({
        teamOne: PropTypes.string,
        result: PropTypes.string,
        teamTwo: PropTypes.string,
        location: PropTypes.string,
        time: PropTypes.string,
        completed: PropTypes.bool,
        league: PropTypes.string
    })),
    styles: PropTypes.objectOf(PropTypes.string)
};

export default NextFixtures;
