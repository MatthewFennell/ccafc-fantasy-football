import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classNames from 'classnames';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../common/spinner/Spinner';
import StyledButton from '../../common/StyledButton/StyledButton';
import TextInput from '../../common/TextInput/TextInput';
import * as appConstants from '../../constants';
import materialStyles from '../../materialStyles';
import { addNotificationRequest } from '../actions';
import defaultStyles from './AddNotification.module.scss';

const AddNotification = props => {
    const classes = makeStyles(materialStyles)();
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);
    const [notification, setNotification] = useState('');
    const confirmNotification = useCallback(() => {
        props.addNotificationRequest(notification);
        setNotification('');
        // eslint-disable-next-line
    }, [notification, props.addingNotification])

    return (
        <Paper
            elevation={4}
            className={classNames({
                [classes.paper]: !isMobile,
                [classes.paperMobile]: isMobile
            })}
        >
            <div className={props.styles.notificationHeader}>
                Use this page to add Notifications to all users
            </div>

            <div className={props.styles.textInputWrapper}>
                <TextInput
                    value={notification}
                    onChange={setNotification}
                    icon="message"
                    iconColor="secondary"
                    onSubmit={confirmNotification}
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
                [props.styles.spinner]: true,
                [props.styles.hidden]: !props.addingNotification
            })}
            >
                <Spinner color="secondary" />
            </div>
        </Paper>
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
