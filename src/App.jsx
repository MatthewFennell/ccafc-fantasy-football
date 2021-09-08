import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import ReactNotification from 'react-notifications-component';
import { connect } from 'react-redux';
import defaultStyles from './App.module.scss';
import Spinner from './common/spinner/Spinner';
import ModalHandling from './modalHandling/ModalHandling';
import NewNavbar from './navbar/NewNavbar';
import Notifications from './notifications/Notifications';
import RenderRoutes from './RenderRoutes';

const App = props => (
    props.auth && props.auth.isLoaded ? (
        <ConnectedRouter history={props.history}>
            <>
                <CssBaseline />
                <div className={props.styles.app}>
                    <NewNavbar />
                    <Toolbar />
                    <ReactNotification />
                    {!props.loadingApp
                        ? (
                            <Container className={props.styles.appContainer}>
                                <RenderRoutes auth={props.auth} maxGameWeek={props.maxGameWeek} />
                            </Container>
                        ) : (
                            <div className={props.styles.loadingWrapper}>
                                <div className={props.styles.loadingMessage}>
                                    {`Loading ${process.env.REACT_APP_COLLEGE_ACRONYM} Fantasy Football`}
                                    <div className={props.styles.fennellTag}>
                                        Created by Matthew Fennell
                                    </div>
                                </div>
                                <Spinner color="secondary" />
                            </div>
                        )}
                    <ModalHandling />
                    <Notifications />
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
    loadingApp: false,
    maxGameWeek: null,
    styles: defaultStyles
};

App.propTypes = {
    auth: PropTypes.shape({
        isLoaded: PropTypes.bool,
        uid: PropTypes.string
    }),
    history: PropTypes.shape({}),
    loadingApp: PropTypes.bool,
    maxGameWeek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    loadingApp: state.auth.loadingApp,
    maxGameWeek: state.overview.maxGameWeek
});

export default connect(mapStateToProps, null)(App);
