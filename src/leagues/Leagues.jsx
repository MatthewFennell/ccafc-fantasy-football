import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './Leagues.module.scss';
import { fetchLeaguesRequest } from './actions';
import * as selectors from './selectors';
import Table from '../common/grid/Grid';

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

    return (
        <div className={props.styles.leaguesWrapper}>
            <div className={props.styles.myLeaguesWrapper}>
                <div className={props.styles.myLeaguesTable}>
                    <Table columns={columns} gridHeader="Leagues" rows={props.leagues} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Leagues);
