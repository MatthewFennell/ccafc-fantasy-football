import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import fp from 'lodash/fp';
import defaultStyles from './Graph.module.scss';
import Spinner from '../../common/spinner/Spinner';
import * as helpers from '../helpers';
import Switch from '../../common/Switch/Switch';
import Dropdown from '../../common/dropdown/Dropdown';

const graphTitle = {
    goalsFor: 'Goals Scored Per Week',
    goalsAgainst: 'Goals Conceded Per Week',
    totalPoints: 'Total Points',
    totalGoalsFor: 'Total Goals Scored',
    totalGoalsAgainst: 'Total Goals Conceded'
};

const Graph = props => {
    const [graphMode, setGraphMode] = useState(helpers.graphModes.goalsFor);
    const [activeTeams, setActiveTeams] = useState([]);

    const updateActiveTeams = useCallback(teamId => {
        if (activeTeams.includes(teamId)) {
            setActiveTeams(activeTeams.filter(x => x !== teamId));
        } else {
            setActiveTeams(activeTeams.concat([teamId]));
        }
    }, [activeTeams]);

    const graphData = helpers
        .findGraphData(props.allTeams, activeTeams, graphMode, props.maxGameweek);
    const series = fp.flow(fp.range(0, props.maxGameweek + 2)
        .map(x => fp.set(`${x}.curveType`, 'function')))({});

    helpers.generateNewGraphData(props.fixtures);

    return (
        <div>
            <div className={props.styles.graphChoiceWrapper}>
                <div className={props.styles.chartsHeader}>
                    <div className={props.styles.chartsText}>
                        Teams
                    </div>
                    {props.fetchingAllTeams ? <Spinner color="secondary" />
                        : (
                            <div className={props.styles.toggleTeams}>
                                {props.allTeams.map(team => (
                                    <div key={team.id}>
                                        <div className={props.styles.columnName}>
                                            {team.team_name}
                                        </div>
                                        <div>
                                            <Switch
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
                <div className={props.styles.radioWrapper}>
                    <Dropdown
                        title="Graph Choice"
                        key="Graph Choice"
                        onChange={setGraphMode}
                        options={[
                            {
                                text: 'Goals Scored',
                                id: helpers.graphModes.goalsFor,
                                value: helpers.graphModes.goalsFor
                            },
                            {
                                text: 'Goals Conceded',
                                id: helpers.graphModes.goalsAgainst,
                                value: helpers.graphModes.goalsAgainst
                            },
                            {
                                text: 'Total points',
                                id: helpers.graphModes.totalPoints,
                                value: helpers.graphModes.totalPoints
                            },
                            {
                                text: 'Total Goals Scored',
                                id: helpers.graphModes.totalGoalsFor,
                                value: helpers.graphModes.totalGoalsFor
                            },
                            {
                                text: 'Total Goals Against',
                                id: helpers.graphModes.totalGoalsAgainst,
                                value: helpers.graphModes.totalGoalsAgainst
                            }
                        ]}
                        value={graphMode}
                    />
                </div>
            </div>

            {activeTeams.length > 0 ? (
                <Chart
                    height="500px"
                    chartType="LineChart"
                    loader={(
                        <div className={props.styles.graphSpinner}>
                            <Spinner color="secondary" />
                        </div>
                    )}
                    data={graphData}
                    options={{
                        hAxis: {
                            title: 'Week',
                            ticks: fp.range(1, props.maxGameweek + 1000),
                            viewWindow: { min: 1 }
                        },
                        vAxis: {
                            title: graphTitle[graphMode],
                            viewWindow: { min: 0 }
                        },
                        series,
                        legend: 'bottom',
                        title: graphTitle[graphMode]
                    }}
                    rootProps={{ 'data-testid': '2' }}
                />
            ) : (
                <div className={props.styles.selectTeamsMessage}>
                  Please select some teams
                </div>
            )}
        </div>
    );
};

Graph.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    fetchingAllTeams: PropTypes.bool,
    fixtures: PropTypes.arrayOf(PropTypes.shape({
        teamOne: PropTypes.string,
        result: PropTypes.string,
        teamTwo: PropTypes.string,
        location: PropTypes.string,
        time: PropTypes.string,
        completed: PropTypes.bool,
        league: PropTypes.string
    })),
    maxGameweek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string)
};

Graph.defaultProps = {
    allTeams: [],
    fetchingAllTeams: false,
    fixtures: [],
    maxGameweek: 0,
    styles: defaultStyles
};

export default Graph;
