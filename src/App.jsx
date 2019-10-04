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
                            <UnauthenticatedRoute exact path="/" component={SignIn} redirect={constants.URL.PROFILE} />
                            <AuthenticatedRoute exact path={constants.URL.OVERVIEW} component={Overview} />
                            <AuthenticatedRoute exact path={constants.URL.PROFILE} component={Profile} />
                            <UnauthenticatedRoute path={constants.URL.SIGN_IN} component={SignIn} redirect={constants.URL.PROFILE} />
                            <UnauthenticatedRoute path={constants.URL.SIGN_UP} component={SignUp} redirect={constants.URL.PROFILE} />
                            <UnauthenticatedEmailRoute path={constants.URL.VERIFY_EMAIL} component={VerifyEmail} redirect={constants.URL.PROFILE} />
                            <UnauthenticatedRoute path={constants.URL.RESET_PASSWORD} component={PasswordReset} redirect={constants.URL.PROFILE} />
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

const mapStateToProps = state => (
    {
        auth: state.firebase.auth
    }
);

export default connect(mapStateToProps)(App);
