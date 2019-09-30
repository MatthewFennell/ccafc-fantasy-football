import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import classNames from 'classnames';
import defaultStyles from './SignedInLinks.module.scss';

const SignedInLinks = props => (
    <div className={props.styles.signedInLinks}>
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
    signOut: noop,
    styles: defaultStyles
};

SignedInLinks.propTypes = {
    activeRoute: PropTypes.string,
    goToDashboard: PropTypes.func,
    signOut: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default SignedInLinks;
