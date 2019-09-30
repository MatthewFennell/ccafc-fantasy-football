import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import Button from '../common/Button/Button';
import NavbarButtonStyles from './NavbarButton.module.scss';
import defaultStyles from './SignedInLinks.module.scss';

const SignedInLinks = props => (
    <div>
        <Button
            onClick={props.goToDashboard}
            styles={NavbarButtonStyles}
            text="Home"
        />
        <Button
            onClick={props.signOut}
            styles={NavbarButtonStyles}
            text="Logout"
        />
    </div>
);

SignedInLinks.defaultProps = {
    goToDashboard: noop,
    signOut: noop,
    styles: defaultStyles
};

SignedInLinks.propTypes = {
    goToDashboard: PropTypes.func,
    signOut: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default SignedInLinks;
