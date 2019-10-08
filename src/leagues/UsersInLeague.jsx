import React, { useEffect, useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUsersInLeagueRequest, leaveLeagueRequest } from './actions';
import * as selectors from './selectors';
import Grid from '../common/grid/Grid';
import defaultStyles from './Leagues.module.scss';
import * as constants from '../constants';
import StyledButton from '../common/StyledButton/StyledButton';
import ConfirmModal from '../common/modal/ConfirmModal';

const columns = [
    {
        id: 'username',
        label: 'Username',
        align: 'center'
    },
    {
        id: 'position',
        label: 'Position',
        align: 'center'
    },
    {
        id: 'userPoints',
        label: 'Points',
        align: 'center'
    }
];

const UsersInLeague = props => {
    useEffect(() => {
        props.fetchUsersInLeagueRequest(props.leagueId);
    }, [props.fetchUsersInLeagueRequest]);

    const [leaveLeagueOpen, setLeaveLeagueOpen] = useState(false);

    const redirect = useCallback(() => {
        props.history.push(constants.URL.LEAGUES);
    }, [props.history]);

    const leaveLeague = useCallback(() => {
        setLeaveLeagueOpen(false);
        props.leaveLeagueRequest(props.leagueId);
    }, [props.leaveLeagueRequest, props.leagueId, setLeaveLeagueOpen]);

    return (
        <div className={props.styles.leaguesWrapper}>
            <div className={props.styles.myLeaguesWrapper}>
                <div className={props.styles.myLeaguesTable}>
                    <Grid
                        backButtonLink={redirect}
                        columns={columns}
                        gridHeader={props.leagueName}
                        renderBackButton
                        rows={props.usersInLeague}
                    />
                </div>
            </div>
            <div className={props.styles.leagueButtonsWrapper}>
                <StyledButton
                    color="primary"
                    onClick={() => setLeaveLeagueOpen(true)}
                    text="Leave league"
                />
            </div>
            <ConfirmModal
                cancel={() => setLeaveLeagueOpen(false)}
                closeModal={() => setLeaveLeagueOpen(false)}
                isOpen={leaveLeagueOpen}
                submit={leaveLeague}
            />
        </div>
    );
};

const mapDispatchToProps = {
    fetchUsersInLeagueRequest,
    leaveLeagueRequest
};

const mapStateToProps = (state, props) => ({
    leagueId: selectors.getLeagueId(props),
    leagueName: selectors.getLeagueName(state, props),
    usersInLeague: selectors.getUsersInLeague(state, props)
});

UsersInLeague.defaultProps = {
    leagueId: '',
    leagueName: '',
    styles: defaultStyles,
    usersInLeague: []
};

UsersInLeague.propTypes = {
    fetchUsersInLeagueRequest: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    leagueId: PropTypes.string,
    leagueName: PropTypes.string,
    leaveLeagueRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    usersInLeague: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        position: PropTypes.number,
        userPoints: PropTypes.number,
        username: PropTypes.string
    }))
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersInLeague));
