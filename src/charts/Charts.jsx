import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './Charts.module.scss';
import { fetchAllTeamsRequest } from './actions';
import Toggle from '../common/Toggle/Toggle';
import Graph from './graph/Graph';
import LeagueTable from './leaguetable/LeagueTable';
import Spinner from '../common/spinner/Spinner';
import WithCollapsable from './collapsableHOC/WithCollapsable';

const Charts = props => {
    useEffect(() => {
        props.fetchAllTeamsRequest();
    }, [props.fetchAllTeamsRequest]);

    const [activeTeams, setActiveTeams] = useState([]);
    const [graphOpen, setGraphOpen] = useState(true);

    const updateActiveTeams = useCallback(teamId => {
        if (activeTeams.includes(teamId)) {
            setActiveTeams(activeTeams.filter(x => x !== teamId));
        } else {
            setActiveTeams(activeTeams.concat([teamId]));
        }
    });

    const GraphSection = WithCollapsable(Graph, graphOpen, setGraphOpen, 'Graphs');

    return (
        <div>
            <div className={props.styles.chartsHeader}>
                {props.fetchingAllTeams ? <Spinner color="secondary" />
                    : (
                        <div className={props.styles.toggleTeams}>
                            {props.allTeams.map(team => (
                                <div key={team.id}>
                                    <div className={props.styles.columnName}>
                                        {team.team_name}
                                    </div>
                                    <div>
                                        <Toggle
                                            color="primary"
                                            checked={activeTeams.includes(team.id)}
                                            onChange={() => updateActiveTeams(team.id)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) }
            </div>

            <GraphSection
                activeTeams={activeTeams}
                allTeams={props.allTeams}
                maxGameweek={props.maxGameweek}
                setGraphOpen={setGraphOpen}
            />

            <LeagueTable
                allTeams={props.allTeams}
                loading={props.fetchingAllTeams}
                maxGameweek={props.maxGameweek}
            />

        </div>
    );
};

Charts.defaultProps = {
    allTeams: [],
    fetchingAllTeams: false,
    maxGameweek: 0,
    styles: defaultStyles
};

Charts.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    fetchAllTeamsRequest: PropTypes.func.isRequired,
    fetchingAllTeams: PropTypes.bool,
    maxGameweek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string)
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
