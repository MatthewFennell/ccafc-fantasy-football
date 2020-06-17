import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';
import { signOut } from '../auth/actions';

const NewNavbar = props => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const closeSidebar = useCallback(() => setSidebarOpen(false), [setSidebarOpen]);
    const openSidebar = useCallback(() => setSidebarOpen(true), [setSidebarOpen]);
    const toggleSidebar = useCallback(() => setSidebarOpen(!sidebarOpen),
        [sidebarOpen, setSidebarOpen]);

    const redirect = useCallback(redirectLocation => {
        setSidebarOpen(false);
        props.history.push(redirectLocation);
    }, [props.history]);

    return (
        <>
            <TopNavbar
                auth={props.auth}
                openNavbar={openSidebar}
                closeNavbar={closeSidebar}
                redirect={redirect}
                signOut={props.signOut}
                toggleNavbar={toggleSidebar}
            />
            <SideNavbar
                closeNavbar={closeSidebar}
                currentPath={props.history.location.pathname}
                currentTeam={props.currentTeam}
                isOpen={sidebarOpen}
                isSignedIn={props.auth.uid && props.auth.emailVerified}
                maxGameWeek={props.maxGameWeek}
                originalTeam={props.originalTeam}
                openNavbar={openSidebar}
                redirect={redirect}
                toggleNavbar={toggleSidebar}
                userId={props.auth.uid}
                userPermissions={props.userPermissions}
            />
        </>
    );
};

NewNavbar.propTypes = {
    auth: PropTypes.shape({
        uid: PropTypes.string,
        emailVerified: PropTypes.bool,
        photoURL: PropTypes.string
    }),
    currentTeam: PropTypes.arrayOf(PropTypes.shape({})),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string
        })
    }).isRequired,
    maxGameWeek: PropTypes.number,
    originalTeam: PropTypes.arrayOf(PropTypes.shape({})),
    signOut: PropTypes.func.isRequired,
    userPermissions: PropTypes.arrayOf(PropTypes.string)
};

NewNavbar.defaultProps = {
    auth: {},
    currentTeam: [],
    maxGameWeek: null,
    originalTeam: [],
    userPermissions: []
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    currentTeam: state.transfers.currentTeam,
    maxGameWeek: state.overview.maxGameWeek,
    originalTeam: state.transfers.originalTeam,
    profile: state.firebase.profile,
    pathname: state.router.location.pathname,
    userPermissions: state.auth.userPermissions
});

const mapDispatchToProps = {
    signOut
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewNavbar));

export { NewNavbar as NewNavbarUnconnected };
