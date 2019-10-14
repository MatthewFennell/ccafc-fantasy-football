import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fp from 'lodash/fp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import defaultStyles from './Overview.module.scss';
import {
    fetchUserStatsRequest, fetchUserInfoForWeekRequest
} from './actions';
import * as selectors from './selectors';
import Spinner from '../common/spinner/Spinner';

const Overview = props => {
    // useEffect(() => {
    //     props.fetchUserInfoForWeekRequest(props.userId, props.currentGameWeek);
    // }, [props.userId, props.currentGameWeek, props.fetchUserInfoForWeekRequest]);

    useEffect(() => {
        props.fetchUserStatsRequest();
    }, [props.fetchUserStatsRequest]);

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
                {props.fetchingUserInfo || props.fetchingUserInfoForWeek ? <Spinner color="secondary" /> : (
                    <>
                        <div className={props.styles.gameWeekText}>
                            <div className={props.styles.arrowBackWrapper}>
                                <ArrowBackIcon color={props.currentGameWeek === 1 ? 'disabled' : 'secondary'} onClick={() => {}} />
                            </div>
                            <div className={props.styles.gameWeekTextWrapper}>
                            Gameweek 5
                            </div>
                            <div className={props.styles.arrowForwardWrapper}>
                                <ArrowForwardIcon color={props.currentGameWeek === props.maxGameWeek ? 'disabled' : 'secondary'} onClick={() => {}} />
                            </div>
                        </div>
                        <div className={props.styles.gameweekStats}>
                            <div className={props.styles.averagePointsWrapper}>
                                <div className={props.styles.averagePointsValue}>
                                15
                                </div>
                                <div>Average Points</div>
                            </div>
                            <div className={props.styles.yourPointsWrapper}>
                                <div className={props.styles.yourPointsValue}>
                                25
                                </div>
                                <div>Your Points</div>
                            </div>
                            <div className={props.styles.highestPointsWrapper}>
                                <div className={props.styles.highestPointsValue}>
                                25
                                </div>
                                <div>Highest Points</div>
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
                                {props.remainingTransfers}
                            </div>
                            <div>Remaining Transfers</div>
                        </div>
                        <div className={props.styles.remainingBudgetWrapper}>
                            <div className={props.styles.remainingBudgetValue}>
                                {`£${props.remainingBudget} mil`}
                            </div>
                            <div>Remaining Budget</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

Overview.defaultProps = {
    currentGameWeek: null,
    fetchingUserStats: false,
    maxGameWeek: null,
    remainingBudget: null,
    remainingTransfers: null,
    styles: defaultStyles,
    totalPoints: null,
    userId: ''
};

Overview.propTypes = {
    currentGameWeek: PropTypes.number,
    fetchingUserStats: PropTypes.bool,
    fetchUserInfoForWeekRequest: PropTypes.func.isRequired,
    fetchUserStatsRequest: PropTypes.func.isRequired,
    maxGameWeek: PropTypes.number,
    remainingBudget: PropTypes.number,
    remainingTransfers: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string),
    totalPoints: PropTypes.number,
    userId: PropTypes.string
};

const mapDispatchToProps = {
    fetchUserInfoForWeekRequest,
    fetchUserStatsRequest
};

const mapStateToProps = (state, props) => ({
    currentGameWeek: selectors.getCurrentGameWeek(props),
    fetchingUserStats: selectors.getFetchingUserStats(state),
    maxGameWeek: selectors.getMaxGameWeek(state),
    remainingBudget: selectors.getRemainingBudget(state),
    remainingTransfers: selectors.getRemainingTransfers(state),
    totalPoints: selectors.getTotalPoints(state),
    userId: selectors.getUserId(props)
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
