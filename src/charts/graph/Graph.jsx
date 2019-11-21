import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import fp from 'lodash/fp';
import { noop } from 'lodash';
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
    console.log('graph');

    return (
        <div className={props.styles.chartWrapper}>

            <div className={props.styles.graphChoiceWrapper}>
                <RadioButton
                    radioLabel="Graph Choice"
                    onChange={props.setGraphMode}
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
                    value={props.graphMode}
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
                    data={props.graphData}
                    options={{
                        hAxis: {
                            title: 'Time',
                            ticks: fp.range(1, props.maxGameweek + 1),
                            viewWindow: { min: 1 }
                        },
                        vAxis: {
                            title: graphTitle[props.graphMode],
                            viewWindow: { min: 0 }
                        },
                        series: props.series,
                        legend: 'bottom',
                        title: graphTitle[props.graphMode]
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
    graphData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    graphMode: PropTypes.string,
    maxGameweek: PropTypes.number,
    series: PropTypes.arrayOf(PropTypes.number),
    setGraphMode: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

Graph.defaultProps = {
    activeTeams: [],
    graphData: [],
    graphMode: '',
    maxGameweek: 0,
    series: [],
    setGraphMode: noop,
    styles: defaultStyles
};

export default Graph;
