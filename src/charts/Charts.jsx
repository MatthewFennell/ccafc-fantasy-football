import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllTeamsRequest } from './actions';
import Graph from './graph/Graph';
import LeagueTable from './leaguetable/LeagueTable';
import WithCollapsable from '../common/collapsableHOC/WithCollapsable';

const Charts = props => {
    useEffect(() => {
        props.fetchAllTeamsRequest();
        // eslint-disable-next-line
    }, [props.fetchAllTeamsRequest]);

    const [graphOpen, setGraphOpen] = useState(true);
    const [leagueTableOpen, setLeagueTableOpen] = useState(true);

    const GraphSection = WithCollapsable(Graph, graphOpen, setGraphOpen, 'Graphs');
    const LeagueTableSection = WithCollapsable(LeagueTable, leagueTableOpen, setLeagueTableOpen, 'League Table');

    return (
        <>
            <GraphSection
                allTeams={props.allTeams}
                fetchingAllTeams={props.fetchingAllTeams}
                maxGameweek={props.maxGameweek}
            />
            <LeagueTableSection
                allTeams={props.allTeams}
                loading={props.fetchingAllTeams}
                maxGameweek={props.maxGameweek}
            />
        </>
    );
};

Charts.defaultProps = {
    allTeams: [],
    fetchingAllTeams: false,
    maxGameweek: 0
};

Charts.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    fetchAllTeamsRequest: PropTypes.func.isRequired,
    fetchingAllTeams: PropTypes.bool,
    maxGameweek: PropTypes.number
};

const mapDispatchToProps = {
    fetchAllTeamsRequest
};

const mapStateToProps = state => ({
    allTeams: state.charts.allTeams,
    fetchingAllTeams: state.charts.fetchingAllTeams,
    maxGameweek: state.overview.maxGameWeek
});

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
