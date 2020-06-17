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
            currentTeam={props.currentTeam}
            currentPath={props.currentPath}
            redirect={props.redirect}
            isSignedIn={props.isSignedIn}
            maxGameWeek={props.maxGameWeek}
            originalTeam={props.originalTeam}
            userId={props.userId}
            userPermissions={props.userPermissions}
        />
    </SwipeableDrawer>
);

SideNavbar.defaultProps = {
    currentTeam: [],
    closeNavbar: noop,
    currentPath: '',
    isOpen: false,
    isSignedIn: false,
    maxGameWeek: null,
    originalTeam: [],
    redirect: noop,
    userId: '',
    userPermissions: []
};

SideNavbar.propTypes = {
    closeNavbar: PropTypes.func,
    currentTeam: PropTypes.arrayOf(PropTypes.shape({})),
    currentPath: PropTypes.string,
    isOpen: PropTypes.bool,
    isSignedIn: PropTypes.bool,
    maxGameWeek: PropTypes.number,
    originalTeam: PropTypes.arrayOf(PropTypes.shape({})),
    redirect: PropTypes.func,
    userId: PropTypes.string,
    userPermissions: PropTypes.arrayOf(PropTypes.string)
};

export default SideNavbar;
