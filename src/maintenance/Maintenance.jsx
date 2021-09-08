import PropTypes from 'prop-types';
import React from 'react';
import styles from './Maintenance.module.scss';
import MaintenanceImage from './Maintenance.png';

const Maintenance = props => (
    <div className={props.styles.maintenanceWrapper}>
        <img src={MaintenanceImage} className={styles.maintenanceIcon} alt="collegeCrest" />
    </div>
);

Maintenance.defaultProps = {
    styles
};

Maintenance.propTypes = {
    styles: PropTypes.objectOf(PropTypes.string)
};

export default Maintenance;
