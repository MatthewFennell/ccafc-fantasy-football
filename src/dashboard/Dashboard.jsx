import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import defaultStyles from './DashboardStyles.module.scss';
import DashboardItem from './DashboardItem';

const Dashboard = props => {
  const redirectToProfile = useCallback(() => {
    props.history.push('/profile');
  }, [props.history]);

  return (
    <div className={props.styles.dashBoard}>
      <div className={props.styles.dashboardHeader}>
      Dashboard
      </div>

      <div className={props.styles.dashboardItems}>
        <DashboardItem title="Stuff" />
        <DashboardItem />
        <DashboardItem redirect={redirectToProfile} title="Profile" />
      </div>

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
