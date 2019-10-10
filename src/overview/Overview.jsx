import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fp from 'lodash/fp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import defaultStyles from './Overview.module.scss';
import { fetchInitialUserWeekInfoRequest, fetchUserInfoForWeekRequest, fetchUserStatsRequest } from './actions';
import * as selectors from './selectors';
import Spinner from '../common/spinner/Spinner';

const Overview = props => {
    useEffect(() => {
        props.fetchInitialUserWeekInfoRequest();
        props.fetchUserStatsRequest();
    }, [props.fetchInitialUserWeekInfoRequest, props.fetchUserStatsRequest]);

    const fetchUserInfoForPreviousWeek = useCallback(() => {
        if (props.currentGameWeek > 1) {
            props.fetchUserInfoForWeekRequest(props.currentGameWeek - 1);
        }
    }, [props.fetchUserInfoForWeekRequest, props.currentGameWeek]);

    const fetchUserInfoForNextWeek = useCallback(() => {
        if (props.currentGameWeek < props.maxGameWeek) {
            props.fetchUserInfoForWeekRequest(props.currentGameWeek + 1);
        }
    }, [props.fetchUserInfoForWeekRequest, props.currentGameWeek]);

    return (
        <div className={props.styles.overviewWrapper}>
            <div className={props.styles.pointsWrapper}>
                <div className={props.styles.totalPointsWrapper}>
                    {props.fetchingUserInfo ? <Spinner color="secondary" /> : (
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
                                <ArrowBackIcon color={props.currentGameWeek === 1 ? 'disabled' : 'secondary'} onClick={fetchUserInfoForPreviousWeek} />
                            </div>
                            <div className={props.styles.gameWeekTextWrapper}>
                                {!props.fetchingUserInfo && `Gameweek ${props.currentGameWeek}`}
                            </div>
                            <div className={props.styles.arrowForwardWrapper}>
                                <ArrowForwardIcon color={props.currentGameWeek === props.maxGameWeek ? 'disabled' : 'secondary'} onClick={fetchUserInfoForNextWeek} />
                            </div>
                        </div>
                        <div className={props.styles.gameweekStats}>
                            <div className={props.styles.averagePointsWrapper}>
                                <div className={props.styles.averagePointsValue}>
                                    {!props.fetchingUserInfo && props.userInfoForWeek.averagePoints}
                                </div>
                                <div>Average Points</div>
                            </div>
                            <div className={props.styles.yourPointsWrapper}>
                                <div className={props.styles.yourPointsValue}>
                                    {props.userInfoForWeek.weekPoints}
                                </div>
                                <div>Your Points</div>
                            </div>
                            <div className={props.styles.highestPointsWrapper}>
                                <div className={props.styles.highestPointsValue}>
                                    {!props.fetchingUserInfo && fp.flow(fp.get('userInfoForWeek'),
                                        fp.get('highestPoints'), fp.get('points'))(props)}
                                </div>
                                <div>Highest Points</div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className={props.styles.userInfoWrapper}>
                {props.fetchingUserInfo ? <Spinner color="secondary" /> : (
                    <>
                        <div className={props.styles.remainingTransfersWrapper}>
                            <div className={props.styles.remainingTransfersValue}>
                                {!props.fetchingUserInfo
                                    && props.remainingTransfers}
                            </div>
                            <div>Remaining Transfers</div>
                        </div>
                        <div className={props.styles.remainingBudgetWrapper}>
                            <div className={props.styles.remainingBudgetValue}>
                                {!props.fetchingUserInfo && `£${props.remainingBudget} mil`}
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
    maxGameWeek: null,
    remainingBudget: null,
    remainingTransfers: null,
    styles: defaultStyles,
    totalPoints: null
};

Overview.propTypes = {
    currentGameWeek: PropTypes.number,
    fetchingUserInfo: PropTypes.bool.isRequired,
    fetchInitialUserWeekInfoRequest: PropTypes.func.isRequired,
    fetchUserInfoForWeekRequest: PropTypes.func.isRequired,
    fetchUserStatsRequest: PropTypes.func.isRequired,
    maxGameWeek: PropTypes.number,
    remainingBudget: PropTypes.number,
    remainingTransfers: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string),
    totalPoints: PropTypes.number,
    userInfoForWeek: PropTypes.shape({
        averagePoints: PropTypes.number,
        totalPoints: PropTypes.number,
        gameWeek: PropTypes.number,
        remainingBudget: PropTypes.number,
        remainingTransfers: PropTypes.number,
        weekPoints: PropTypes.number
    }).isRequired
};

const mapDispatchToProps = {
    fetchInitialUserWeekInfoRequest,
    fetchUserInfoForWeekRequest,
    fetchUserStatsRequest
};

const mapStateToProps = state => ({
    currentGameWeek: selectors.getCurrentGameWeek(state),
    fetchingUserInfo: selectors.getFetchingUserInfo(state),
    maxGameWeek: selectors.getMaxGameWeek(state),
    remainingBudget: selectors.getRemainingBudget(state),
    remainingTransfers: selectors.getRemainingTransfers(state),
    totalPoints: selectors.getTotalPoints(state),
    userInfo: selectors.getUserInfo(state),
    userInfoForWeek: selectors.getUserInfoForWeek(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
