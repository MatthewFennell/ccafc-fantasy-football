import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import defaultStyles from './Overview.module.scss';
import {
    fetchUserStatsRequest, fetchUserInfoForWeekRequest, fetchUserInfoForWeekRequestBackground
} from './actions';
import * as selectors from './selectors';
import Spinner from '../common/spinner/Spinner';
import { generateOverviewRoute } from '../helperFunctions';
import * as appConstants from '../constants';
import RulesAndSettings from './RulesAndSettings';
import FadingCollapsable from '../common/fadingCollapsable/FadingCollapsable';

const RulesAndSettingsTitle = props => (
    <div
        className={defaultStyles.rulesTitle}
        onClick={() => props.setIsCollapsableOpen(true)}
        tabIndex={0}
        role="button"
    >
        Rules and Settings
    </div>
);

RulesAndSettingsTitle.defaultProps = {
    setIsCollapsableOpen: noop
};

RulesAndSettingsTitle.propTypes = {
    setIsCollapsableOpen: PropTypes.func
};

const Overview = props => {
    useEffect(() => {
        if (props.currentGameWeek || props.currentGameWeek === 0) {
            props.fetchUserInfoForWeekRequest(props.userId, props.currentGameWeek);
        }
        // eslint-disable-next-line
    }, [props.userId, props.currentGameWeek, props.fetchUserInfoForWeekRequest, props.maxGameWeek]);

    useEffect(() => {
        if (props.userId) {
            props.fetchUserStatsRequest(props.userId);
        }
        // eslint-disable-next-line
    }, [props.fetchUserStatsRequest, props.userId]);

    useEffect(() => {
        if (props.currentGameWeek > 1) {
            props.fetchUserInfoForWeekRequestBackground(props.userId, props.currentGameWeek - 1);
        }
        // eslint-disable-next-line
    }, [props.userId, props.currentGameWeek, props.fetchUserInfoForWeekRequestBackground]);

    const loadPreviousWeek = useCallback(() => {
        if (props.currentGameWeek > 1) {
            props.history.push(generateOverviewRoute(props.userId, props.currentGameWeek - 1));
        }
    }, [props.history, props.currentGameWeek, props.userId]);

    const loadNextWeek = useCallback(() => {
        if (props.currentGameWeek < props.maxGameWeek) {
            props.history.push(generateOverviewRoute(props.userId, props.currentGameWeek + 1));
        }
    }, [props.history, props.currentGameWeek, props.userId, props.maxGameWeek]);

    useEffect(() => {
        if ((!props.currentGameWeek && props.maxGameWeek) || props.maxGameWeek === 0) {
            props.history.push(generateOverviewRoute(props.userId, props.maxGameWeek));
        }
    }, [props.currentGameWeek, props.maxGameWeek, props.history, props.userId]);

    const onHighestPointClick = useCallback(() => {
        props.history.push(`${appConstants.URL.POINTS}/${props.highestPoints.userId}/${props.currentGameWeek}`);
    }, [props.highestPoints.userId, props.currentGameWeek, props.history]);

    const onyMyPointsClick = useCallback(() => {
        props.history.push(`${appConstants.URL.POINTS}/${props.auth.uid}/${props.currentGameWeek}`);
    }, [props.auth.uid, props.currentGameWeek, props.history]);

    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);

    const ExpandedRulesAndSettings = newProps => (
        <div className={props.styles.desktopRulesWrapper}>
            <div
                className={props.styles.desktopRulesHeader}
                onClick={() => newProps.setIsCollapsableOpen(false)}
                role="button"
                tabIndex={0}
            >
                Rules and Settings
            </div>
            <RulesAndSettings isTwoColumns={isMobile} />
        </div>
    );

    return (
        <div className={props.styles.overviewWrapper}>
            <div className={props.styles.pointsWrapper}>
                <div className={props.styles.totalPointsWrapper}>
                    {props.fetchingUserStats ? <Spinner color="secondary" /> : (
                        <>
                            <div className={props.styles.totalPointsValue}>
                                {props.totalPoints}
                            </div>
                            <div className={props.styles.totalPointsText}>Total Points</div>
                        </>
                    )}
                </div>
            </div>

            <div className={props.styles.gameweekPointsWrapper}>
                {props.fetchingUserInfo ? <Spinner color="secondary" /> : (
                    <>
                        <div className={props.styles.gameWeekText}>
                            <div className={props.styles.arrowBackWrapper}>
                                <ArrowBackIcon color={props.currentGameWeek > 1 ? 'secondary' : 'disabled'} onClick={loadPreviousWeek} />
                            </div>
                            <div className={props.styles.gameWeekTextWrapper}>
                                {`Gameweek ${props.currentGameWeek || 0}`}
                            </div>
                            <div className={props.styles.arrowForwardWrapper}>
                                <ArrowForwardIcon color={props.currentGameWeek === props.maxGameWeek ? 'disabled' : 'secondary'} onClick={loadNextWeek} />
                            </div>
                        </div>
                        <div className={props.styles.gameweekStats}>
                            <div className={props.styles.averagePointsWrapper}>
                                <div className={props.styles.averagePointsValue}>
                                    {Math.round(props.averagePoints)}
                                </div>
                                <div>Average</div>
                            </div>
                            <div
                                className={props.styles.yourPointsWrapper}
                                onClick={onyMyPointsClick}
                                tabIndex={0}
                                role="button"
                            >
                                <div className={props.styles.yourPointsValue}>
                                    {props.weekPoints}
                                </div>
                                <div>Your points</div>
                            </div>
                            <div
                                className={props.styles.highestPointsWrapper}
                                onClick={onHighestPointClick}
                                tabIndex={0}
                                role="button"
                            >
                                <div className={props.styles.highestPointsValue}>
                                    {props.highestPoints.points}
                                </div>
                                <div>Highest</div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className={props.styles.userInfoWrapper}>
                {props.fetchingUserStats ? <Spinner color="secondary" /> : (
                    <>
                        <div className={props.styles.remainingTransfersWrapper}>
                            <div className={props.styles.remainingTransfersValue}>
                                Unlimited
                            </div>
                            <div>Remaining Transfers</div>
                        </div>
                        <div className={props.styles.remainingBudgetWrapper}>
                            <div className={props.styles.remainingBudgetValue}>
                                {`£${props.remainingBudget}m`}
                            </div>
                            <div>Remaining Budget</div>
                        </div>
                    </>
                )}
            </div>
            <div className={props.styles.rulesWrapper}>
                <FadingCollapsable
                    title={<RulesAndSettingsTitle />}
                    isBorderRadiusSmall
                >
                    <ExpandedRulesAndSettings />
                </FadingCollapsable>
            </div>
        </div>
    );
};

Overview.defaultProps = {
    auth: {
        uid: ''
    },
    averagePoints: null,
    currentGameWeek: null,
    fetchingUserInfo: false,
    fetchingUserStats: false,
    highestPoints: {
        points: null,
        id: null,
        userId: ''
    },
    maxGameWeek: null,
    remainingBudget: null,
    // remainingTransfers: null,
    styles: defaultStyles,
    totalPoints: null,
    userId: '',
    weekPoints: null
};

Overview.propTypes = {
    auth: PropTypes.shape({
        uid: PropTypes.string
    }),
    averagePoints: PropTypes.number,
    currentGameWeek: PropTypes.number,
    fetchingUserInfo: PropTypes.bool,
    fetchingUserStats: PropTypes.bool,
    fetchUserInfoForWeekRequest: PropTypes.func.isRequired,
    fetchUserInfoForWeekRequestBackground: PropTypes.func.isRequired,
    fetchUserStatsRequest: PropTypes.func.isRequired,
    highestPoints: PropTypes.shape({
        id: PropTypes.string,
        points: PropTypes.number,
        userId: PropTypes.string
    }),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    maxGameWeek: PropTypes.number,
    remainingBudget: PropTypes.number,
    // remainingTransfers: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string),
    totalPoints: PropTypes.number,
    userId: PropTypes.string,
    weekPoints: PropTypes.number
};

const mapDispatchToProps = {
    fetchUserInfoForWeekRequest,
    fetchUserInfoForWeekRequestBackground,
    fetchUserStatsRequest
};

const mapStateToProps = (state, props) => ({
    auth: state.firebase.auth,
    averagePoints: selectors.getUserInfo(state, props, 'averagePoints'),
    currentGameWeek: selectors.getCurrentGameWeek(props),
    fetchingUserInfo: selectors.getUserInfo(state, props, 'fetching'),
    fetchingUserStats: selectors.getUserStat(state, props, 'fetching'),
    highestPoints: selectors.getUserInfo(state, props, 'highestPoints'),
    maxGameWeek: selectors.getMaxGameWeek(state),
    remainingBudget: selectors.getUserStat(state, props, 'remainingBudget'),
    remainingTransfers: selectors.getUserStat(state, props, 'remainingTransfers'),
    totalPoints: selectors.getUserStat(state, props, 'totalPoints'),
    userId: selectors.getUserId(props),
    weekPoints: selectors.getUserInfo(state, props, 'weekPoints')
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Overview));

export { Overview as OverviewUnconnected };
