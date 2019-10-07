import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUsersInLeagueRequest } from './actions';
import * as selectors from './selectors';
import Grid from '../common/grid/Grid';
import defaultStyles from './Leagues.module.scss';

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
    return (
        <div className={props.styles.leaguesWrapper}>
            <div className={props.styles.myLeaguesWrapper}>
                <div className={props.styles.myLeaguesTable}>
                    <Grid
                        columns={columns}
                        gridHeader={props.leagueName}
                        rows={props.usersInLeague}
                    />
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    fetchUsersInLeagueRequest
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
