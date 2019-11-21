import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fp from 'lodash/fp';
import defaultStyles from './Charts.module.scss';
import { fetchAllTeamsRequest } from './actions';
import Toggle from '../common/Toggle/Toggle';
import * as helpers from './helpers';
import Graph from './graph/Graph';

const Charts = props => {
    useEffect(() => {
        props.fetchAllTeamsRequest();
    }, [props.fetchAllTeamsRequest]);

    const [activeTeams, setActiveTeams] = useState([]);
    const [graphMode, setGraphMode] = useState(helpers.graphModes.goalsFor);

    const updateActiveTeams = useCallback(teamId => {
        if (activeTeams.includes(teamId)) {
            setActiveTeams(activeTeams.filter(x => x !== teamId));
        } else {
            setActiveTeams(activeTeams.concat([teamId]));
        }
    });

    const graphData = helpers
        .findGraphData(props.allTeams, activeTeams, graphMode, props.maxGameweek);

    const series = fp.flow(fp.range(0, props.maxGameweek + 2)
        .map(x => fp.set(`${x}.curveType`, 'function')))({});

    return (
        <div>
            <div className={props.styles.chartsHeader}>
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
            </div>

            <Graph
                activeTeams={activeTeams}
                graphData={graphData}
                graphMode={graphMode}
                maxGameweek={props.maxGameweek}
                series={series}
                setGraphMode={setGraphMode}
            />

        </div>
    );
};

Charts.defaultProps = {
    allTeams: [],
    maxGameweek: 0,
    styles: defaultStyles
};

Charts.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    fetchAllTeamsRequest: PropTypes.func.isRequired,
    maxGameweek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    fetchAllTeamsRequest
};

const mapStateToProps = state => ({
    allTeams: state.charts.allTeams,
    maxGameweek: state.overview.maxGameWeek
});

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
