import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import classNames from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import defaultStyles from './NextFixtures.module.scss';
import MatchRow from './MatchRow';
import * as helpers from '../../helperFunctions';
import Spinner from '../../common/spinner/Spinner';
import * as appConstants from '../../constants';
import materialStyles from '../../materialStyles';

const convertToDay = d => moment(d, 'DD-MM-YYYY')
    .format('ddd, MMMM Do YYYY');

const NextFixtures = props => {
    const nextMatchPerTeam = helpers.getNextMatchPerTeam(props.fixtures, 'Collingwood');
    const removedDuplicatedSorted = helpers.sortMatchesByDate(nextMatchPerTeam, false);
    const daysOfYear = _.uniq(nextMatchPerTeam.map(x => convertToDay(x.time)));
    const classes = makeStyles(materialStyles)();
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);

    return (
        <Paper
            elevation={4}
            className={classNames({
                [classes.paperSmallMargin]: !isMobile,
                [classes.paperMobile]: isMobile
            })}
        >
            <div className={props.styles.headerMessage}>
                Upcoming Fixtures
            </div>
            {props.loadingFixtures
                ? (
                    <div className={props.styles.loadingUpcomingMatches}>
                        <Spinner color="secondary" />
                    </div>
                ) : daysOfYear.map(x => (
                    <div className={props.styles.datesWrapper} key={x}>
                        <div className={props.styles.dateHeader}>
                            {x}
                        </div>
                        <div className={props.styles.setOfMatchesWrapper}>
                            {removedDuplicatedSorted.filter(match => convertToDay(match.time) === x)
                                .map(match => (
                                    <MatchRow
                                        match={match}
                                        showCollegeCrest={props.showCollegeCrest}
                                        key={`${match.teamOne}-${match.teamTwo}`}
                                    />
                                ))}
                        </div>
                    </div>
                ))}
        </Paper>
    );
};

NextFixtures.defaultProps = {
    fixtures: [],
    loadingFixtures: false,
    showCollegeCrest: false,
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
    loadingFixtures: PropTypes.bool,
    showCollegeCrest: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default NextFixtures;
