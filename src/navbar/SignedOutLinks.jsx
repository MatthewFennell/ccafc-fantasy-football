import React from 'react';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import defaultStyles from './SignedOutLinks.module.scss';

const SignedOutLinks = props => (
    <div className={props.styles.signedOutLinks}>
        <div
            className={classNames({
                [props.styles.active]: props.activeRoute === '/signin',
                [props.styles.signIn]: true
            })}
            onClick={props.redirectToSignIn}
            role="button"
            tabIndex={0}
        >
        Sign in
        </div>
        <div
            className={classNames({
                [props.styles.active]: props.activeRoute === '/signup',
                [props.styles.signOut]: true
            })}
            onClick={props.redirectToSignUp}
            role="button"
            tabIndex={0}
        >
        Sign up
        </div>
    </div>
);

SignedOutLinks.defaultProps = {
    activeRoute: '',
    redirectToSignIn: noop,
    redirectToSignUp: noop,
    styles: defaultStyles
};

SignedOutLinks.propTypes = {
    activeRoute: PropTypes.string,
    redirectToSignIn: PropTypes.func,
    redirectToSignUp: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default SignedOutLinks;
