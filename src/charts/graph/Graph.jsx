import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import _ from 'lodash';
import defaultStyles from './Graph.module.scss';
import Spinner from '../../common/spinner/Spinner';
import * as helpers from '../helpers';
import Dropdown from '../../common/dropdown/Dropdown';
import * as fixturesHelpers from '../../fixtures/helpers';
import Fade from '../../common/Fade/Fade';
import CheckboxOptions from './CheckboxOptions';
import SwitchStyles from './SwitchStyles.module.scss';
import Autocomplete from '../../common/Autocomplete/Autocomplete';

const graphTitle = {
    goalsFor: 'Goals Scored Per Week',
    goalsAgainst: 'Goals Conceded Per Week',
    totalPoints: 'Total Points'
};

const Graph = props => {
    const [graphMode, setGraphMode] = useState(helpers.graphModes.totalPoints);
    const [activeTeams, setActiveTeams] = useState([]);

    const [graphData, setGraphData] = useState([]);
    const [allCollingwoodTeams, setCollingwoodTeams] = useState([]);
    const [allDays, setAllDays] = useState([]);
    const [accumulation, setAccumulation] = useState({});
    const [weekIntervals, setWeekIntervals] = useState([]);

    // Load the graph data - main one
    useEffect(() => {
        const newGraphData = helpers.combineData(activeTeams, allDays, accumulation, graphMode);
        setGraphData(newGraphData);
    }, [props.fixtures, graphMode, activeTeams, accumulation, allDays]);

    // Find the unique collingwood teams
    // Find all the days from start -> end of fixtures
    useEffect(() => {
        setCollingwoodTeams(fixturesHelpers.generateCollingwoodTeams(props.fixtures));
        setAllDays(helpers.generateAllDays(props.fixtures));
    }, [props.fixtures]);

    useEffect(() => {
        const newAccumulation = helpers.makeGraphAccumulation(accumulation,
            props.fixtures, weekIntervals, activeTeams);
        if (!_.isEqual(newAccumulation, accumulation)) {
            setAccumulation(newAccumulation);
        }
    }, [props.fixtures, allDays, activeTeams, weekIntervals, accumulation]);

    useEffect(() => {
        const weeks = helpers.generateWeekTicks(props.fixtures);
        setWeekIntervals(weeks);
    }, [props.fixtures]);

    const updateActiveTeams = useCallback(teamId => {
        if (activeTeams.includes(teamId)) {
            setActiveTeams(activeTeams.filter(x => x !== teamId));
        } else {
            setActiveTeams(activeTeams.concat([teamId]));
        }
    }, [activeTeams, setActiveTeams]);

    const [editTeamsOpen, setEditTeamsOpen] = useState(false);

    const toggleTeamsOpen = useCallback(() => {
        setEditTeamsOpen(!editTeamsOpen);
    }, [editTeamsOpen, setEditTeamsOpen]);

    return (
        <>
            <Autocomplete />
            <div className={props.styles.graphChoiceWrapper}>

                <div className={props.styles.chartsHeader}>
                    {props.loadingFixtures ? <Spinner color="secondary" />
                        : (
                            <Fade
                                checked={editTeamsOpen}
                                onChange={toggleTeamsOpen}
                                label="Edit Collingwood Teams"
                                switchStyles={SwitchStyles}
                                switchColor="secondary"
                            >
                                <CheckboxOptions
                                    allCollingwoodTeams={allCollingwoodTeams}
                                    activeTeams={activeTeams}
                                    updateActiveTeams={updateActiveTeams}
                                />
                            </Fade>
                        ) }
                </div>
                <div className={props.styles.radioWrapper}>
                    <Dropdown
                        title="Graph Choice"
                        key="Graph Choice"
                        onChange={setGraphMode}
                        options={[
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
                            title: 'Date'
                        },
                        vAxis: {
                            title: graphTitle[graphMode],
                            viewWindow: { min: 0 }
                        },
                        series: {
                            1: { curveType: 'function' }
                        }
                    }}
                    rootProps={{ 'data-testid': '2' }}
                />
            ) : (
                <div className={props.styles.selectTeamsMessage}>
                  Please select some teams
                </div>
            )}
        </>
    );
};

Graph.propTypes = {
    loadingFixtures: PropTypes.bool,
    fixtures: PropTypes.arrayOf(PropTypes.shape({
        teamOne: PropTypes.string,
        result: PropTypes.string,
        teamTwo: PropTypes.string,
        location: PropTypes.string,
        time: PropTypes.string,
        completed: PropTypes.bool,
        league: PropTypes.string
    })),
    styles: PropTypes.objectOf(PropTypes.string)
};

Graph.defaultProps = {
    loadingFixtures: false,
    fixtures: [],
    styles: defaultStyles
};

export default Graph;
