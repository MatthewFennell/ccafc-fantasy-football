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
import Leagues from './leagues/Leagues';
import UsersInLeague from './leagues/UsersInLeague';
import AdminRoute from './auth/routes/AdminRoute';
import CurrentTeam from './currentteam/CurrentTeam';
import Points from './points/Points';
import Transfers from './transfers/Transfers';
import Stats from './stats/Stats';

import * as routes from './routes';

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
                            <AuthenticatedRoute exact path={`${constants.URL.OVERVIEW}/:userId/:week`} component={Overview} />
                            <AuthenticatedRoute exact path={constants.URL.PROFILE} component={Profile} />
                            <AuthenticatedRoute path={`${constants.URL.LEAGUES}/:leagueId`} component={UsersInLeague} />
                            <AuthenticatedRoute exact path={constants.URL.LEAGUES} component={Leagues} />
                            <AuthenticatedRoute exact path={`${constants.URL.CURRENT_TEAM}/:userId`} component={CurrentTeam} />
                            <AuthenticatedRoute exact path={`${constants.URL.POINTS}/:userId/:week`} component={Points} />
                            <AuthenticatedRoute exact path={constants.URL.TRANSFERS} component={Transfers} />
                            <AuthenticatedRoute exact path={`${constants.URL.STATS}/:teamId/:minWeek/:maxWeek`} component={Stats} />

                            <UnauthenticatedRoute path={constants.URL.SIGN_IN} component={SignIn} redirect={`${constants.URL.OVERVIEW}/${props.auth.uid}/${props.maxGameWeek}`} />
                            <UnauthenticatedRoute path={constants.URL.SIGN_UP} component={SignUp} redirect={`${constants.URL.OVERVIEW}/${props.auth.uid}/${props.maxGameWeek}`} />
                            <UnauthenticatedRoute path={constants.URL.RESET_PASSWORD} component={PasswordReset} redirect={`${constants.URL.OVERVIEW}/${props.auth.uid}/${props.maxGameWeek}`} />
                            <UnauthenticatedRoute exact path="/" component={SignIn} redirect={`${constants.URL.OVERVIEW}/${props.auth.uid}/${props.maxGameWeek}`} />

                            <UnauthenticatedEmailRoute path={constants.URL.VERIFY_EMAIL} component={VerifyEmail} redirect={constants.URL.PROFILE} />

                            {routes.adminLinks.map(link => (
                                <AdminRoute
                                    exact
                                    path={link.path()}
                                    component={link.component}
                                    key={link.path}
                                    permissionRequired={link.permissionRequired}
                                />
                            ))}

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
    maxGameWeek: null,
    styles: defaultStyles
};

App.propTypes = {
    auth: PropTypes.shape({
        isLoaded: PropTypes.bool,
        uid: PropTypes.string
    }),
    history: PropTypes.shape({}),
    maxGameWeek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    maxGameWeek: state.overview.maxGameWeek
});

export default connect(mapStateToProps)(App);
