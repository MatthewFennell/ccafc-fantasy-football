import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fp from 'lodash/fp';
import defaultStyles from './Overview.module.scss';
import { fetchUserInfoRequest } from './actions';
import * as selectors from './selectors';
import Spinner from '../common/spinner/Spinner';

const Overview = props => {
    useEffect(() => {
        props.fetchUserInfoRequest();
    }, [props.fetchUserInfoRequest]);

    console.log('user info for week', props.userInfoForWeek);

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
                            {!props.fetchingUserInfo && `Gameweek ${props.currentGameWeek}`}
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
    styles: defaultStyles
};

Overview.propTypes = {
    currentGameWeek: PropTypes.number,
    fetchingUserInfo: PropTypes.bool.isRequired,
    fetchUserInfoRequest: PropTypes.func.isRequired,
    remainingBudget: PropTypes.number.isRequired,
    remainingTransfers: PropTypes.number.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    totalPoints: PropTypes.number.isRequired,
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
    fetchUserInfoRequest
};

const mapStateToProps = state => ({
    currentGameWeek: selectors.getCurrentGameWeek(state),
    fetchingUserInfo: selectors.getFetchingUserInfo(state),
    remainingBudget: selectors.getRemainingBudget(state),
    remainingTransfers: selectors.getRemainingTransfers(state),
    totalPoints: selectors.getTotalPoints(state),
    userInfo: selectors.getUserInfo(state),
    userInfoForWeek: selectors.getUserInfoForWeek(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
