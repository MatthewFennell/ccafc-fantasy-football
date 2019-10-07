import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import defaultStyles from './Leagues.module.scss';
import { fetchLeaguesRequest } from './actions';
import * as selectors from './selectors';
import Grid from '../common/grid/Grid';
import * as constants from '../constants';

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
    useEffect(() => {
        props.fetchLeaguesRequest();
    }, [props.fetchLeaguesRequest]);

    const onRowClick = useCallback(row => {
        props.history.push(`${constants.URL.LEAGUES}/${row.leagueId}`);
    }, [props.history]);

    return (
        <div className={props.styles.leaguesWrapper}>
            <div className={props.styles.myLeaguesWrapper}>
                <div className={props.styles.myLeaguesTable}>
                    <Grid
                        columns={columns}
                        gridHeader="Leagues"
                        onRowClick={onRowClick}
                        rows={props.leagues}
                    />
                </div>
            </div>
        </div>
    );
};

Leagues.defaultProps = {
    leagues: [],
    styles: defaultStyles
};

Leagues.propTypes = {
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
    fetchLeaguesRequest
};

const mapStateToProps = state => (
    {
        leagues: selectors.getLeagues(state)
    }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Leagues));
