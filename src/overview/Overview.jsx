import React from 'react';
import PropTypes from 'prop-types';
import defaultStyles from './Overview.module.scss';

const Overview = props => (
    <div className={props.styles.overviewWrapper}>
        <div className={props.styles.pointsWrapper}>
            <div className={props.styles.totalPointsWrapper}>
                <div className={props.styles.totalPointsValue}>10</div>
                <div className={props.styles.totalPointsText}>Total Points</div>
            </div>

            <div className={props.styles.gameweekPointsWrapper}>
                <div className={props.styles.gameWeekText}>
                  Gameweek 5
                </div>
                <div className={props.styles.gameweekStats}>
                    <div className={props.styles.averagePointsWrapper}>
                        <div className={props.styles.averagePointsValue}>20</div>
                        <div>Average Points</div>
                    </div>
                    <div className={props.styles.yourPointsWrapper}>
                        <div className={props.styles.yourPointsValue}>20</div>
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
                <div className={props.styles.remainingTransfersValue}>1</div>
                <div>Remaining Transfers</div>
            </div>
            <div className={props.styles.remainingBudgetWrapper}>
                <div className={props.styles.remainingBudgetValue}>£0.5 mil</div>
                <div>Remaining Budget</div>
            </div>
        </div>
    </div>
);

Overview.defaultProps = {
    styles: defaultStyles
};

Overview.propTypes = {
    styles: PropTypes.objectOf(PropTypes.string)
};

export default Overview;
