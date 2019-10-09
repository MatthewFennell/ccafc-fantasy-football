import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import SideList from './SideList';

const SideNavbar = props => (
    <SwipeableDrawer
        open={props.isOpen}
        onClose={props.closeNavbar}
        onOpen={props.closeNavbar}
    >
        <SideList redirect={props.redirect} isAdmin={props.isAdmin} />
    </SwipeableDrawer>
);

SideNavbar.defaultProps = {
    closeNavbar: noop,
    isAdmin: false,
    isOpen: false,
    redirect: noop
};

SideNavbar.propTypes = {
    closeNavbar: PropTypes.func,
    isAdmin: PropTypes.bool,
    isOpen: PropTypes.bool,
    redirect: PropTypes.func
};

export default SideNavbar;
