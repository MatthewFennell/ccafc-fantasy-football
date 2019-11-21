import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import fp from 'lodash/fp';
import defaultStyles from './Graph.module.scss';
import Spinner from '../../common/spinner/Spinner';
import RadioButton from '../../common/radio/RadioButton';
import * as helpers from '../helpers';

const graphTitle = {
    goalsFor: 'Goals Scored Per Week',
    goalsAgainst: 'Goals Conceded Per Week',
    totalPoints: 'Total Points',
    totalGoalsFor: 'Total Goals Scored',
    totalGoalsAgainst: 'Total Goals Conceded'
};

const Graph = props => {
    const [graphMode, setGraphMode] = useState(helpers.graphModes.goalsFor);

    const graphData = helpers
        .findGraphData(props.allTeams, props.activeTeams, graphMode, props.maxGameweek);
    const series = fp.flow(fp.range(0, props.maxGameweek + 2)
        .map(x => fp.set(`${x}.curveType`, 'function')))({});

    return (
        <div className={props.styles.chartWrapper}>
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

            {props.activeTeams.length > 0 ? (
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
    );
};

Graph.propTypes = {
    activeTeams: PropTypes.arrayOf(PropTypes.shape({})),
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    maxGameweek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string)
};

Graph.defaultProps = {
    activeTeams: [],
    allTeams: [],
    maxGameweek: 0,
    styles: defaultStyles
};

export default Graph;
