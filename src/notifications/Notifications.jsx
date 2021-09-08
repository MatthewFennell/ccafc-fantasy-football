import { noop } from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { store } from 'react-notifications-component';
import { connect } from 'react-redux';
import { closeNotification } from './actions';
import * as constants from './constants';
import * as selectors from './selectors';

const Notifications = props => {
    const [activeNotifications, setActiveNotifications] = useState([]);

    // This manages user notifications
    // These will be triggered by an admin
    // Listens for any changes on state.firebase.profile.notifications
    // Closing a notification removes it from user profile
    // Notification will remain until closed
    useEffect(() => {
        const notificationsToAdd = [];
        if (props.notifications.some(x => !activeNotifications.includes(x))) {
            props.notifications.forEach(notification => {
                if (!activeNotifications.includes(notification)) {
                    notificationsToAdd.push(notification);
                    store.addNotification({
                        ...constants.commonNotificationProps,
                        title: 'Information',
                        message: notification,
                        type: constants.NOTIFICATION_TYPE_INFO,
                        id: notification,
                        onRemoval() {
                            props.closeNotification(notification);
                        },
                        dismiss: {
                            showIcon: true,
                            duration: 0
                        }
                    });
                }
            });
            setActiveNotifications([...activeNotifications, ...notificationsToAdd]);
        }
        // eslint-disable-next-line
    }, [props.notifications, activeNotifications, props.closeNotification]);

    return null;
};

Notifications.defaultProps = {
    closeNotification: noop,
    notifications: []
};

Notifications.propTypes = {
    closeNotification: PropTypes.func,
    notifications: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = state => ({
    notifications: selectors.getNotifications(state)
});

const mapDispatchToProps = {
    closeNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

export { Notifications as NotificationsUnconnected };
