import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PasswordReset from './auth/PasswordReset';
import AdminRoute from './auth/routes/AdminRoute';
import AuthenticatedRoute from './auth/routes/AuthenticatedRoute';
import UnauthenticatedEmailRoute from './auth/routes/UnauthenticatedEmailRoute';
import UnauthenticatedRoute from './auth/routes/UnauthenticatedRoute';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import VerifyEmail from './auth/VerifyEmail';
import * as constants from './constants';
import { MyContext } from './Context';
import UsersInLeague from './leagues/UsersInLeague';
import PrivacyPolicy from './privacypolicy/PrivacyPolicy';
import Profile from './profile/Profile';
import * as routes from './routes';

const RenderRoutes = props => (
    <MyContext.Consumer>
        {context => (
            <>
                <Switch>
                    <AuthenticatedRoute exact path={constants.URL.PROFILE} component={Profile} />
                    <AuthenticatedRoute path={`${constants.URL.LEAGUES}/:leagueId`} component={UsersInLeague} />

                    {/* Filter out disabled pages */}
                    {routes.signedInLinks.filter(x => !context.disabledPages.includes(x.title))
                        .map(link => (
                            <AuthenticatedRoute
                                exact
                                path={link.renderPath}
                                key={link.renderPath}
                                component={link.component}
                            />
                        ))}

                    <UnauthenticatedRoute
                        path={constants.URL.SIGN_IN}
                        component={SignIn}
                        redirect={`${constants.URL.OVERVIEW}/${props.auth.uid}/${props.maxGameWeek}`}
                    />
                    <UnauthenticatedRoute
                        path={constants.URL.SIGN_UP}
                        component={SignUp}
                        redirect={`${constants.URL.OVERVIEW}/${props.auth.uid}/${props.maxGameWeek}`}
                    />
                    <UnauthenticatedRoute
                        path={constants.URL.RESET_PASSWORD}
                        component={PasswordReset}
                        redirect={`${constants.URL.OVERVIEW}/${props.auth.uid}/${props.maxGameWeek}`}
                    />
                    <UnauthenticatedRoute
                        exact
                        path={constants.URL.PRIVACY_POLICY}
                        component={PrivacyPolicy}
                        redirect={`${constants.URL.OVERVIEW}/${props.auth.uid}/${props.maxGameWeek}`}
                    />
                    <UnauthenticatedRoute
                        exact
                        path="/"
                        component={SignIn}
                        redirect={`${constants.URL.OVERVIEW}/${props.auth.uid}/${props.maxGameWeek}`}
                    />
                    <UnauthenticatedEmailRoute
                        path={constants.URL.VERIFY_EMAIL}
                        component={VerifyEmail}
                        redirect={constants.URL.PROFILE}
                    />

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
            </>
        )}

    </MyContext.Consumer>
);

RenderRoutes.defaultProps = {
    auth: {
        isLoaded: false
    },
    maxGameWeek: null
};

RenderRoutes.propTypes = {
    auth: PropTypes.shape({
        isLoaded: PropTypes.bool,
        uid: PropTypes.string
    }),
    maxGameWeek: PropTypes.number
};

export default RenderRoutes;
