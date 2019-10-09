/* eslint-disable max-len */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import AuthenticatedRoute from './auth/routes/AuthenticatedRoute';
import UnauthenticatedRoute from './auth/routes/UnauthenticatedRoute';
import UnauthenticatedEmailRoute from './auth/routes/UnauthenticatedEmailRoute';
import Profile from './profile/Profile';
import VerifyEmail from './auth/VerifyEmail';
import PasswordReset from './auth/PasswordReset';
import defaultStyles from './App.module.scss';
import NewNavbar from './navbar/NewNavbar';
import * as constants from './constants';
import Overview from './overview/Overview';
import Testing from './testing/Testing';
import Leagues from './leagues/Leagues';
import UsersInLeague from './leagues/UsersInLeague';
import AdminRoute from './auth/routes/AdminRoute';
import CreatePlayer from './admin/createplayer/CreatePlayer';
import CreateTeam from './admin/createteam/CreateTeam';
import SubmitResult from './admin/submitresult/SubmitResult';

const App = props => (
    props.auth && props.auth.isLoaded ? (
        <ConnectedRouter history={props.history}>
            <>
                <CssBaseline />
                <div className={props.styles.app}>
                    <NewNavbar />
                    <Toolbar />
                    <Container className={props.styles.appContainer}>
                        <Switch>
                            <AuthenticatedRoute exact path={constants.URL.OVERVIEW} component={Overview} />
                            <AuthenticatedRoute exact path="/testing" component={Testing} />
                            <AuthenticatedRoute exact path={constants.URL.PROFILE} component={Profile} />
                            <AuthenticatedRoute path={`${constants.URL.LEAGUES}/:leagueId`} component={UsersInLeague} />
                            <AuthenticatedRoute exact path={constants.URL.LEAGUES} component={Leagues} />

                            <UnauthenticatedRoute path={constants.URL.SIGN_IN} component={SignIn} redirect={constants.URL.OVERVIEW} />
                            <UnauthenticatedRoute path={constants.URL.SIGN_UP} component={SignUp} redirect={constants.URL.OVERVIEW} />
                            <UnauthenticatedRoute path={constants.URL.RESET_PASSWORD} component={PasswordReset} redirect={constants.URL.OVERVIEW} />
                            <UnauthenticatedRoute exact path="/" component={SignIn} redirect={constants.URL.OVERVIEW} />

                            <UnauthenticatedEmailRoute path={constants.URL.VERIFY_EMAIL} component={VerifyEmail} redirect={constants.URL.PROFILE} />

                            <AdminRoute exact path={constants.ADMIN_URL.CREATE_PLAYER} component={CreatePlayer} />
                            <AdminRoute exact path={constants.ADMIN_URL.CREATE_TEAM} component={CreateTeam} />
                            <AdminRoute exact path={constants.ADMIN_URL.SUBMIT_RESULT} component={SubmitResult} />

                            <Route render={() => <Redirect to="/" />} />
                        </Switch>
                    </Container>
                </div>
            </>
        </ConnectedRouter>
    ) : null
);

App.defaultProps = {
    auth: {
        isLoaded: false
    },
    history: {},
    styles: defaultStyles
};

App.propTypes = {
    auth: PropTypes.shape({
        isLoaded: PropTypes.bool
    }),
    history: PropTypes.shape({}),
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapStateToProps = state => ({
    auth: state.firebase.auth
});

export default connect(mapStateToProps)(App);
