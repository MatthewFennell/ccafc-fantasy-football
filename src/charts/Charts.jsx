import React, { useEffect, useState, useCallback } from 'react';
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

    const setOpen = useCallback(open => {
        setLeagueTableOpen(open);
    }, [setLeagueTableOpen]);

    const GraphSection = WithCollapsable(Graph);
    const LeagueTableSection = WithCollapsable(LeagueTable);

    return (
        <>
            <GraphSection
                allTeams={props.allTeams}
                isOpen={graphOpen}
                fetchingAllTeams={props.fetchingAllTeams}
                maxGameweek={props.maxGameweek}
                toggle={setGraphOpen}
                title="Graphs"
            />
            <LeagueTableSection
                allTeams={props.allTeams}
                loading={props.fetchingAllTeams}
                maxGameweek={props.maxGameweek}
                isOpen={leagueTableOpen}
                toggle={setOpen}
                title="LeagueTable"
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

export { Charts as ChartsUnconnected };
