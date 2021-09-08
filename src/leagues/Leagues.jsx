import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Grid from '../common/grid/Grid';
import SuccessModal from '../common/modal/SuccessModal';
import Spinner from '../common/spinner/Spinner';
import StyledButton from '../common/StyledButton/StyledButton';
import * as appConstants from '../constants';
import materialStyles from '../materialStyles';
import { createLeagueRequest, fetchLeaguesRequest, joinLeagueRequest } from './actions';
import CreateLeagueForm from './CreateLeagueForm';
import JoinLeagueForm from './JoinLeagueForm';
import * as selectors from './selectors';
import defaultStyles from './styles/Leagues.module.scss';

const columns = [
    {
        id: 'name',
        label: 'Name',
        align: 'center'
    },
    {
        id: 'position',
        label: 'Position',
        align: 'center'
    }
];

const Leagues = props => {
    const classes = makeStyles(materialStyles)();
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);
    const [createLeagueOpen, setCreateLeagueOpen] = useState(false);
    const [leagueName, setLeagueName] = useState('');
    const [startWeek, setStartWeek] = useState(0);

    const [joinLeagueOpen, setJoinLeagueOpen] = useState(false);
    const [leagueNameToJoin, setLeagueNameToJoin] = useState('');

    const setTheStartWeek = useCallback(e => {
        setStartWeek(parseInt(e, 10) || 0);
    }, [setStartWeek]);

    const onLeagueCreate = useCallback(() => {
        if (!leagueName) {
            return;
        }

        setCreateLeagueOpen(false);
        props.createLeagueRequest(leagueName, parseFloat(startWeek, 10));
        setLeagueName('');
        setStartWeek(0);
        setLeagueNameToJoin('');
        // eslint-disable-next-line
    }, [leagueName, startWeek, props.createLeagueRequest]);

    const onLeagueJoin = useCallback(() => {
        setJoinLeagueOpen(false);
        props.joinLeagueRequest(leagueNameToJoin);
        setLeagueName('');
        setLeagueNameToJoin('');
        // eslint-disable-next-line
    }, [leagueNameToJoin, props.joinLeagueRequest]);

    useEffect(() => {
        props.fetchLeaguesRequest();
        // eslint-disable-next-line
    }, [props.fetchLeaguesRequest]);

    const onRowClick = useCallback(row => {
        props.history.push(`${appConstants.URL.LEAGUES}/${row.leagueId}`);
    }, [props.history]);

    return (
        <>
            <Paper
                elevation={4}
                className={classNames({
                    [classes.paperNoPadding]: !isMobile,
                    [classes.paperSmallMargin]: isMobile
                })}
            >
                <div className={props.styles.myLeaguesTable}>
                    <Grid
                        columns={columns}
                        gridHeader="Leagues"
                        loading={props.fetchingLeagues}
                        onRowClick={onRowClick}
                        rows={props.leagues}
                    />
                </div>
                <div className={props.styles.leagueButtonsWrapper}>
                    <StyledButton
                        color="primary"
                        onClick={() => setCreateLeagueOpen(true)}
                        text="Create league"
                        disabled={props.creatingLeague || props.joiningLeague}
                    />
                    <StyledButton
                        color="primary"
                        onClick={() => setJoinLeagueOpen(true)}
                        text="Join league"
                        disabled={props.creatingLeague || props.joiningLeague}
                    />
                </div>
            </Paper>

            <SuccessModal
                backdrop
                closeModal={() => setCreateLeagueOpen(false)}
                isOpen={createLeagueOpen}
                headerMessage="Creating League!"
                toggleModal={() => setCreateLeagueOpen(false)}
            >
                <div className={props.styles.modalWrapper}>
                    <CreateLeagueForm
                        leagueName={leagueName}
                        setLeagueName={setLeagueName}
                        setStartWeek={setTheStartWeek}
                        startWeek={startWeek}
                        onCreate={onLeagueCreate}
                    />
                </div>
            </SuccessModal>
            <SuccessModal
                backdrop
                closeModal={() => setJoinLeagueOpen(false)}
                isOpen={joinLeagueOpen}
                headerMessage="Join a league!"
                toggleModal={() => setJoinLeagueOpen(false)}
            >
                <div className={props.styles.modalWrapper}>
                    <JoinLeagueForm
                        leagueNameToJoin={leagueNameToJoin}
                        setLeagueName={setLeagueNameToJoin}
                        onJoin={onLeagueJoin}
                    />
                </div>
            </SuccessModal>
            {props.creatingLeague
            && (
                <div className={props.styles.spinnerWrapper}>
                    <Spinner color="secondary" />
                </div>
            )}
            {props.joiningLeague
                && (
                    <div className={props.styles.spinnerWrapper}>
                        <Spinner color="secondary" />
                    </div>
                )}
        </>
    );
};

Leagues.defaultProps = {
    creatingLeague: false,
    fetchingLeagues: false,
    joiningLeague: false,
    leagues: [],
    styles: defaultStyles
};

Leagues.propTypes = {
    createLeagueRequest: PropTypes.func.isRequired,
    creatingLeague: PropTypes.bool,
    fetchingLeagues: PropTypes.bool,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    joinLeagueRequest: PropTypes.func.isRequired,
    joiningLeague: PropTypes.bool,
    leagues: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        leagueId: PropTypes.string,
        name: PropTypes.string,
        startWeek: PropTypes.number,
        userPoints: PropTypes.number,
        position: PropTypes.number
    })),
    fetchLeaguesRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    createLeagueRequest,
    joinLeagueRequest,
    fetchLeaguesRequest
};

const mapStateToProps = state => ({
    createLeagueError: state.leagues.createLeagueError,
    createLeagueErrorCode: state.leagues.createLeagueErrorCode,
    creatingLeague: state.leagues.creatingLeague,
    fetchingLeagues: selectors.getFetchingLeagues(state),
    joinLeagueError: state.leagues.joinLeagueError,
    joinLeagueErrorCode: state.leagues.joinLeagueErrorCode,
    joiningLeague: state.leagues.joiningLeague,
    leagues: state.leagues.leagues
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Leagues));

export { Leagues as LeaguesUnconnected };
