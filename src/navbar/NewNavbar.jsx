import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';
import { signOut } from '../auth/actions';

const NewNavbar = props => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const closeSidebar = useCallback(() => setSidebarOpen(false), [sidebarOpen, setSidebarOpen]);
    const openSidebar = useCallback(() => setSidebarOpen(true), [sidebarOpen, setSidebarOpen]);
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
                auth={props.auth}
                isAdmin={props.isAdmin}
                isOpen={sidebarOpen}
                openNavbar={openSidebar}
                closeNavbar={closeSidebar}
                redirect={redirect}
                toggleNavbar={toggleSidebar}
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
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string
        })
    }).isRequired,
    isAdmin: PropTypes.bool,
    signOut: PropTypes.func.isRequired
};

NewNavbar.defaultProps = {
    auth: {},
    isAdmin: false
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    isAdmin: state.auth.isAdmin,
    profile: state.firebase.profile,
    pathname: state.router.location.pathname
});

const mapDispatchToProps = {
    signOut
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewNavbar));
