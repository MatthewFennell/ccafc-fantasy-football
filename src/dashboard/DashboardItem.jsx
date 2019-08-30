import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './DashboardItemStyles.module.scss';

const DashboardItem = props => (
  <div
    role="button"
    tabIndex={0}
    onClick={props.redirect}
    className={props.styles.dashboardItem}
  >
    {props.title}
  </div>
);

DashboardItem.defaultProps = {
  redirect: noop,
  styles: defaultStyles,
  title: 'No title provided'
};

DashboardItem.propTypes = {
  redirect: PropTypes.func,
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.string
};

export default DashboardItem;
