import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import classNames from 'classnames';
import defaultStyles from './SignedInLinks.module.scss';

const SignedInLinks = props => (
    <div className={props.styles.signedInLinks}>
        <img className={props.styles.photoURL} src={props.photoURL} alt="Profile" />

        <div
            className={classNames({
                [props.styles.active]: props.activeRoute === '/dashboard',
                [props.styles.dashboard]: true
            })}
            onClick={props.goToDashboard}
            role="button"
            tabIndex={0}
        >
        Home
        </div>
        <div
            className={classNames({
                [props.styles.active]: props.activeRoute === '/profile',
                [props.styles.profile]: true
            })}
            onClick={props.goToProfile}
            role="button"
            tabIndex={0}
        >
        Profile
        </div>
        <div
            className={classNames({
                [props.styles.signOut]: true
            })}
            onClick={props.signOut}
            role="button"
            tabIndex={0}
        >
        Logout
        </div>
    </div>
);

SignedInLinks.defaultProps = {
    activeRoute: '',
    goToDashboard: noop,
    goToProfile: noop,
    photoURL: null,
    signOut: noop,
    styles: defaultStyles
};

SignedInLinks.propTypes = {
    activeRoute: PropTypes.string,
    goToDashboard: PropTypes.func,
    goToProfile: PropTypes.func,
    photoURL: PropTypes.string,
    signOut: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default SignedInLinks;
