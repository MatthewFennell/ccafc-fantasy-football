import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './Overview.module.scss';
import { fetchUserInfoRequest } from './actions';
import * as selectors from './selectors';

const Overview = props => {
    useEffect(() => {
        props.fetchUserInfoRequest();
    }, [props.fetchUserInfoRequest]);

    return (
        <div className={props.styles.overviewWrapper}>
            <div className={props.styles.pointsWrapper}>
                <div className={props.styles.totalPointsWrapper}>
                    <div className={props.styles.totalPointsValue}>
                        {props.userInfo.totalPoints}
                    </div>
                    <div className={props.styles.totalPointsText}>Total Points</div>
                </div>

                <div className={props.styles.gameweekPointsWrapper}>
                    <div className={props.styles.gameWeekText}>
                  Gameweek
                        {' '}
                        {props.userInfo.gameWeek}
                    </div>
                    <div className={props.styles.gameweekStats}>
                        <div className={props.styles.averagePointsWrapper}>
                            <div className={props.styles.averagePointsValue}>20</div>
                            <div>Average Points</div>
                        </div>
                        <div className={props.styles.yourPointsWrapper}>
                            <div className={props.styles.yourPointsValue}>
                                {props.userInfo.weekPoints}
                            </div>
                            <div>Your Points</div>
                        </div>
                        <div className={props.styles.highestPointsWrapper}>
                            <div className={props.styles.highestPointsValue}>20</div>
                            <div>Highest Points</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={props.styles.userInfoWrapper}>
                <div className={props.styles.remainingTransfersWrapper}>
                    <div className={props.styles.remainingTransfersValue}>
                        {props.userInfo.remainingTransfers}
                    </div>
                    <div>Remaining Transfers</div>
                </div>
                <div className={props.styles.remainingBudgetWrapper}>
                    <div className={props.styles.remainingBudgetValue}>
                            £
                        {props.userInfo.remainingBudget}
                        {' '}
                        mil
                    </div>
                    <div>Remaining Budget</div>
                </div>
            </div>
        </div>
    );
};

Overview.defaultProps = {
    styles: defaultStyles,
    userInfo: {
        totalPoints: 0,
        gameWeek: 0,
        remainingBudget: 0,
        remainingTransfers: 0,
        weekPoints: 0
    }
};

Overview.propTypes = {
    fetchUserInfoRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    userInfo: PropTypes.shape({
        totalPoints: PropTypes.number,
        gameWeek: PropTypes.number,
        remainingBudget: PropTypes.number,
        remainingTransfers: PropTypes.number,
        weekPoints: PropTypes.number
    })
};

const mapDispatchToProps = {
    fetchUserInfoRequest
};

const mapStateToProps = state => ({
    userInfo: selectors.getUserInfo(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
