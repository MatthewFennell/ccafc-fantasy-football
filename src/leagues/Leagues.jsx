import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import defaultStyles from './Leagues.module.scss';
import { fetchLeaguesRequest, createLeagueRequest } from './actions';
import * as selectors from './selectors';
import Grid from '../common/grid/Grid';
import * as constants from '../constants';
import StyledButton from '../common/StyledButton/StyledButton';
import StyledModal from '../common/modal/StyledModal';
import CreateLeagueForm from './CreateLeagueForm';

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

    const onLeagueCreate = useCallback(() => {
        setCreateLeagueOpen(false);
        props.createLeagueRequest(leagueName, parseInt(startWeek, 10));
    }, [leagueName, startWeek, props.createLeagueRequest]);

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
            <div className={props.styles.createLeagueWrapper}>
                <StyledButton
                    color="primary"
                    onClick={() => setCreateLeagueOpen(true)}
                    text="Create league"
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
        </>
    );
};

Leagues.defaultProps = {
    leagues: [],
    styles: defaultStyles
};

Leagues.propTypes = {
    createLeagueRequest: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
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
    fetchLeaguesRequest
};

const mapStateToProps = state => (
    {
        leagues: selectors.getLeagues(state)
    }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Leagues));
