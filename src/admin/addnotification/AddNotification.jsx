import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { noop } from 'lodash';
import { connect } from 'react-redux';
import defaultStyles from './AddNotification.module.scss';
import TextInput from '../../common/TextInput/TextInput';
import StyledButton from '../../common/StyledButton/StyledButton';
import Spinner from '../../common/spinner/Spinner';
import { addNotificationRequest } from '../actions';

const AddNotification = props => {
    const [notification, setNotification] = useState('');
    const confirmNotification = useCallback(() => {
        props.addNotificationRequest(notification);
        setNotification('');
        // eslint-disable-next-line
    }, [notification, props.addingNotification])

    return (
        <div className={props.styles.notificationWrapper}>
            <div className={props.styles.notificationHeader}>
                Use this page to add Notifications to all users
            </div>

            <div className={props.styles.textInputWrapper}>
                <TextInput
                    value={notification}
                    onChange={setNotification}
                    icon="message"
                    iconColor="secondary"
                />
            </div>
            <div className={props.styles.confirmNotification}>
                <StyledButton
                    text="Confirm Notification"
                    onClick={confirmNotification}
                    disabled={props.addingNotification}
                />
            </div>
            <div className={classNames({
                [props.styles.hidden]: !props.addingNotification
            })}
            >
                <Spinner color="secondary" />
            </div>
        </div>
    );
};

AddNotification.defaultProps = {
    addingNotification: false,
    addNotificationRequest: noop,
    styles: defaultStyles
};

AddNotification.propTypes = {
    addingNotification: PropTypes.bool,
    addNotificationRequest: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    addNotificationRequest
};

const mapStateToProps = state => ({
    addingNotification: state.admin.addingNotification
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNotification);

export { AddNotification as AddNotificationUnconnected };
