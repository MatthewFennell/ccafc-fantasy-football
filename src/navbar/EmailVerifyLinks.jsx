import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import classNames from 'classnames';
import defaultStyles from './EmailVerifyLinks.module.scss';

const EmailVerifyLinks = props => (
    <div className={props.styles.emailVerifyLinks}>
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

EmailVerifyLinks.defaultProps = {
    signOut: noop,
    styles: defaultStyles
};

EmailVerifyLinks.propTypes = {
    signOut: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default EmailVerifyLinks;
