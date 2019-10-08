import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import defaultStyles from './Leagues.module.scss';
import {
    fetchLeaguesRequest, createLeagueRequest, closeCreateLeagueError,
    joinLeagueRequest
} from './actions';
import * as selectors from './selectors';
import Grid from '../common/grid/Grid';
import * as constants from '../constants';
import StyledButton from '../common/StyledButton/StyledButton';
import StyledModal from '../common/modal/StyledModal';
import CreateLeagueForm from './CreateLeagueForm';
import JoinLeagueForm from './JoinLeagueForm';
import ErrorModal from '../common/modal/ErrorModal';

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
    const [createLeagueOpen, setCreateLeagueOpen] = useState(false);
    const [leagueName, setLeagueName] = useState('');
    const [startWeek, setStartWeek] = useState(0);

    const [joinLeagueOpen, setJoinLeagueOpen] = useState(false);
    const [leagueNameToJoin, setLeagueNameToJoin] = useState('');

    const onLeagueCreate = useCallback(() => {
        setCreateLeagueOpen(false);
        props.createLeagueRequest(leagueName, parseFloat(startWeek, 10));
    }, [leagueName, startWeek, props.createLeagueRequest]);

    const onLeagueJoin = useCallback(() => {
        setJoinLeagueOpen(false);
        props.joinLeagueRequest(leagueNameToJoin);
    }, [leagueNameToJoin, props.joinLeagueRequest]);

    useEffect(() => {
        props.fetchLeaguesRequest();
    }, [props.fetchLeaguesRequest]);

    const onRowClick = useCallback(row => {
        props.history.push(`${constants.URL.LEAGUES}/${row.leagueId}`);
    }, [props.history]);

    return (
        <>
            <div className={props.styles.myLeaguesTable}>
                <Grid
                    columns={columns}
                    gridHeader="Leagues"
                    onRowClick={onRowClick}
                    rows={props.leagues}
                />
            </div>
            <div className={props.styles.leagueButtonsWrapper}>
                <StyledButton
                    color="primary"
                    onClick={() => setCreateLeagueOpen(true)}
                    text="Create league"
                />
                <StyledButton
                    color="primary"
                    onClick={() => setJoinLeagueOpen(true)}
                    text="Join league"
                />
            </div>
            <StyledModal
                backdrop
                closeModal={() => setCreateLeagueOpen(false)}
                isOpen={createLeagueOpen}
                headerMessage="Creating League!"
                toggleModal={() => setCreateLeagueOpen(false)}
            >
                <div className={props.styles.modalWrapper}>
                    <CreateLeagueForm
                        setLeagueName={setLeagueName}
                        setStartWeek={setStartWeek}
                        onCreate={onLeagueCreate}
                    />
                </div>
            </StyledModal>
            <StyledModal
                backdrop
                closeModal={() => setJoinLeagueOpen(false)}
                isOpen={joinLeagueOpen}
                headerMessage="Join a league!"
                toggleModal={() => setJoinLeagueOpen(false)}
            >
                <div className={props.styles.modalWrapper}>
                    <JoinLeagueForm
                        setLeagueName={setLeagueNameToJoin}
                        onJoin={onLeagueJoin}
                    />
                </div>
            </StyledModal>
            <ErrorModal
                closeModal={props.closeCreateLeagueError}
                headerMessage="Error creating league"
                isOpen={props.createLeagueError.length > 0}
                errorCode={props.createLeagueErrorCode}
                errorMessage={props.createLeagueError}
            />
        </>
    );
};

Leagues.defaultProps = {
    createLeagueError: '',
    createLeagueErrorCode: '',
    leagues: [],
    styles: defaultStyles
};

Leagues.propTypes = {
    closeCreateLeagueError: PropTypes.func.isRequired,
    createLeagueError: PropTypes.string,
    createLeagueErrorCode: PropTypes.string,
    createLeagueRequest: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    joinLeagueRequest: PropTypes.func.isRequired,
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
    closeCreateLeagueError,
    createLeagueRequest,
    joinLeagueRequest,
    fetchLeaguesRequest
};

const mapStateToProps = state => ({
    createLeagueError: selectors.getCreateLeagueError(state),
    createLeagueErrorCode: selectors.getCreateLeagueErrorCode(state),
    leagues: selectors.getLeagues(state)
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Leagues));
