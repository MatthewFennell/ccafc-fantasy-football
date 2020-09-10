import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';
import { signOut } from '../auth/actions';
import { teamsAreDifferent } from '../transfers/helpers';
import * as constants from '../constants';
import StyledButton from '../common/StyledButton/StyledButton';
import SuccessModal from '../common/modal/SuccessModal';
import defaultStyles from './SideList.module.scss';

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

    const [isUnsavedChangeOpen, setIsUnsavedChangesOpen] = useState(false);

    const [pathToRouteTo, setPathToRouteTo] = useState(null);

    const onItemClick = useCallback(path => {
        const unsavedChanges = teamsAreDifferent(props.originalTeam, props.currentTeam);

        if (props.history.location.pathname === constants.URL.TRANSFERS && unsavedChanges) {
            setPathToRouteTo(path);
            setIsUnsavedChangesOpen(true);
        } else {
            redirect(path);
        }
    }, [props, redirect]);

    const closeModal = useCallback(() => {
        setIsUnsavedChangesOpen(false);
        setPathToRouteTo(null);
    }, [setIsUnsavedChangesOpen, setPathToRouteTo]);

    const continueWithRouting = useCallback(() => {
        redirect(pathToRouteTo);
        setIsUnsavedChangesOpen(false);
    }, [props, pathToRouteTo]);

    return (
        <>
            <TopNavbar
                auth={props.auth}
                closeNavbar={closeSidebar}
                currentTeam={props.currentTeam}
                currentPath={props.history.location.pathname}
                isSignedIn={props.auth.uid && props.auth.emailVerified}
                maxGameWeek={props.maxGameWeek}
                openNavbar={openSidebar}
                originalTeam={props.originalTeam}
                redirect={onItemClick}
                signOut={props.signOut}
                toggleNavbar={toggleSidebar}
                userId={props.auth.uid}
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
            <SuccessModal
                backdrop
                closeModal={closeModal}
                isOpen={isUnsavedChangeOpen}
                headerMessage="Unsaved Changes"
                toggleModal={closeModal}
            >
                <div className={props.styles.modalWrapper}>
                    <div className={props.styles.unsavedChangesMessage}>
                        {'You have unsaved changes. The changes will maintain if you leave this page (but don\'t refresh), but you will still need to save them'}

                    </div>

                    <div className={props.styles.confirmButtonsWrapper}>
                        <StyledButton
                            text="Continue"
                            onClick={continueWithRouting}
                        />
                        <StyledButton
                            text="Cancel"
                            onClick={closeModal}
                            color="secondary"
                        />
                    </div>
                </div>
            </SuccessModal>
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
    userPermissions: PropTypes.arrayOf(PropTypes.string),
    styles: PropTypes.objectOf(PropTypes.string)
};

NewNavbar.defaultProps = {
    auth: {},
    currentTeam: [],
    maxGameWeek: null,
    originalTeam: [],
    userPermissions: [],
    styles: defaultStyles
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
