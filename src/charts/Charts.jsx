import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import { connect } from 'react-redux';
import fp from 'lodash/fp';
import defaultStyles from './Charts.module.scss';
import { fetchAllTeamsRequest } from './actions';
import Toggle from '../common/Toggle/Toggle';
import RadioButton from '../common/radio/RadioButton';
import * as helpers from './helpers';
import Spinner from '../common/spinner/Spinner';

const graphTitle = {
    goalsFor: 'Goals Scored Per Week',
    goalsAgainst: 'Goals Conceded Per Week',
    totalPoints: 'Total Points',
    totalGoalsFor: 'Total Goals Scored',
    totalGoalsAgainst: 'Total Goals Conceded'
};

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

                <div className={props.styles.graphChoiceWrapper}>
                    <RadioButton
                        radioLabel="Graph Choice"
                        onChange={setGraphMode}
                        options={[
                            {
                                radioLabel: 'Goals Scored',
                                value: helpers.graphModes.goalsFor
                            },
                            {
                                radioLabel: 'Goals Conceded',
                                value: helpers.graphModes.goalsAgainst
                            },
                            {
                                radioLabel: 'Total points',
                                value: helpers.graphModes.totalPoints
                            },
                            {
                                radioLabel: 'Total Goals Scored',
                                value: helpers.graphModes.totalGoalsFor
                            },
                            {
                                radioLabel: 'Total Goals Against',
                                value: helpers.graphModes.totalGoalsAgainst
                            }
                        ]}
                        value={graphMode}
                    />
                </div>
            </div>

            <div className={props.styles.chartWrapper}>
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
                                title: 'Time',
                                ticks: fp.range(1, props.maxGameweek + 1),
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
