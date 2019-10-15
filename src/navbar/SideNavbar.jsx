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
        <SideList
            currentPath={props.currentPath}
            redirect={props.redirect}
            isAdmin={props.isAdmin}
            isSignedIn={props.isSignedIn}
            maxGameWeek={props.maxGameWeek}
            userId={props.userId}
        />
    </SwipeableDrawer>
);

SideNavbar.defaultProps = {
    closeNavbar: noop,
    currentPath: '',
    isAdmin: false,
    isOpen: false,
    isSignedIn: false,
    maxGameWeek: null,
    redirect: noop,
    userId: ''
};

SideNavbar.propTypes = {
    closeNavbar: PropTypes.func,
    currentPath: PropTypes.string,
    isAdmin: PropTypes.bool,
    isOpen: PropTypes.bool,
    isSignedIn: PropTypes.bool,
    maxGameWeek: PropTypes.number,
    redirect: PropTypes.func,
    userId: PropTypes.string
};

export default SideNavbar;
