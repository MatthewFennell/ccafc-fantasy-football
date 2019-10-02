import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import defaultStyles from './Dashboard.module.scss';
import DashboardItem from './DashboardItem';

const Dashboard = props => {
    const redirectToProfile = useCallback(() => {
        props.history.push('/profile');
    }, [props.history]);

    const redirectToTesting = useCallback(() => {
        props.history.push('/testing');
    }, [props.history]);

    return (
        <div className={props.styles.dashBoardWrapper}>
            <div className={props.styles.dashboardHeader}>
                Gameweek 10
            </div>

            <div className={props.styles.stats}>
                <div>
                    <div className={props.styles.yourScore}>
                        50
                    </div>
                    <div>
                        Your Score
                    </div>
                </div>
                <div>
                    <div className={props.styles.average}>
                        50
                    </div>
                    <div>
                        Average
                    </div>
                </div>
                <div>
                    <div className={props.styles.highest}>
                        50
                    </div>
                    <div>
                        Highest
                    </div>
                </div>
            </div>

            {/* <div className={props.styles.dashboardItems}>
                <DashboardItem title="Stuff" />
                <DashboardItem redirect={redirectToTesting} title="Testing" />
                <DashboardItem redirect={redirectToProfile} title="Profile" />
            </div> */}

        </div>
    );
};

Dashboard.defaultProps = {
    styles: defaultStyles
};

Dashboard.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default withRouter(Dashboard);
