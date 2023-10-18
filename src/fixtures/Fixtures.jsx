import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { noop } from 'lodash';
import fp from 'lodash/fp';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Fade from '../common/Fade/Fade';
import Grid from '../common/grid/Grid';
import { generateCsvTitle } from '../helperFunctions';
import materialStyles from '../materialStyles';
import {
    fetchFixturesRequest, fetchMyTeamRequest, setMyTeamRequest
} from './actions';
import defaultStyles from './Fixtures.module.scss';
import {
    columns, filterFixtures, fixturesFilters, generateBothCollingwoodTeams, gridStyles
} from './helpers';
import FixtureFilter from './view/FixtureFilters';
import SetTeam from './view/SetTeam';

const convertResult = result => {
    const split = result.split(' - ');
    return (`(${fp.head(split)}) - (${fp.tail(split)})`);
};

const getColumns = (columns, upcomingOnly) => upcomingOnly ? columns.filter(c => c.id !== "result") : columns

const Fixtures = props => {
    const [myTeam, setMyTeam] = useState('');
    const [radioValue, setRadioValue] = useState('All');
    const [collingwoodOnly, setCollingwoodOnly] = useState(true);
    const [upcomingMatchesOnly, setUpcomingMatchesOnly] = useState(false);
    const [teamNameFilter, setTeamNameFilter] = useState('');
    const classes = makeStyles(materialStyles)();

    useEffect(() => {
        props.fetchFixturesRequest();
        props.fetchMyTeamRequest();
        // eslint-disable-next-line
    }, [props.fetchMyTeamRequest]);

    useEffect(() => {
        if (props.myTeam !== 'No team set') {
            setRadioValue(props.myTeam);
        } else {
            setRadioValue('All');
        }
    }, [props.myTeam]);

    console.log('fixtures', props.fixtures)

    const updateMyTeam = useCallback(() => {
        props.setMyTeamRequest(myTeam);
        // eslint-disable-next-line
    }, [props.setMyTeamRequest, props.myTeam, myTeam]);

    const searchByTeamName = useCallback(teamName => {
        setTeamNameFilter(teamName);
        setCollingwoodOnly(false);
    }, [setTeamNameFilter, setCollingwoodOnly]);

    const toggleCollingwoodOnly = useCallback(() => {
        setCollingwoodOnly(!collingwoodOnly);
    }, [collingwoodOnly, setCollingwoodOnly]);

    const toggleUpcomingOnly = useCallback(() => {
        setUpcomingMatchesOnly(!upcomingMatchesOnly);
    }, [setUpcomingMatchesOnly, upcomingMatchesOnly]);

    const [editingFilters, setEditingFilters] = useState(false);

    const toggleFilters = useCallback(() => {
        setEditingFilters(!editingFilters);
    }, [setEditingFilters, editingFilters]);

    return (
        <div>
            <Paper elevation={4} className={classes.paper}>
                <SetTeam
                    activeTeam={myTeam}
                    loadingMyTeam={props.loadingMyTeam}
                    loadingFixtures={props.loadingFixtures}
                    myTeam={props.myTeam}
                    setActiveTeam={setMyTeam}
                    teamOptions={generateBothCollingwoodTeams(props.fixtures)}
                    updateMyTeam={updateMyTeam}
                />
                <div className={props.styles.editFiltersWrapper}>
                    <Fade
                        checked={editingFilters}
                        label="Edit filters"
                        includeCheckbox
                        onChange={toggleFilters}
                    >
                        <FixtureFilter
                            collingwoodOnly={collingwoodOnly}
                            radioOptions={fixturesFilters(props.myTeam, props.fixtures)}
                            radioValue={radioValue}
                            searchByTeamName={searchByTeamName}
                            setRadioValue={setRadioValue}
                            teamNameFilter={teamNameFilter}
                            toggleCollingwoodOnly={toggleCollingwoodOnly}
                            toggleUpcomingOnly={toggleUpcomingOnly}
                            upcomingMatchesOnly={upcomingMatchesOnly}
                        />
                    </Fade>
                </div>
            </Paper>
            <Paper elevation={4} className={classes.paper}>
                <Grid
                    columns={getColumns(columns, upcomingMatchesOnly)}
                    csvTitle={generateCsvTitle('Fixtures')}
                    gridHeader="Fixtures"
                    loading={props.loadingFixtures}
                    onRowClick={noop}
                    rows={filterFixtures(
                        props.fixtures,
                        radioValue,
                        collingwoodOnly,
                        upcomingMatchesOnly,
                        teamNameFilter
                    )}
                    showDownloadAsCsv
                    showPagination={false}
                    rowMapping={row => ({
                        'Home Team': row.teamOne,
                        'Away Team': row.teamTwo,
                        Result: row.completed ? convertResult(row.result) : 'Not played yet',
                        Location: row.location,
                        Date: row.time,
                        League: row.league
                    })}
                    rowsPerPageOptions={[100000]}
                    maxHeight={600}
                    gridStyles={gridStyles}
                />
            </Paper>
        </div>
    );
};

Fixtures.defaultProps = {
    fetchFixturesRequest: noop,
    fetchMyTeamRequest: noop,
    fixtures: [],
    loadingFixtures: false,
    loadingMyTeam: false,
    myTeam: '',
    setMyTeamRequest: noop,
    styles: defaultStyles
};

Fixtures.propTypes = {
    fetchFixturesRequest: PropTypes.func,
    fetchMyTeamRequest: PropTypes.func,
    fixtures: PropTypes.arrayOf(PropTypes.shape({
        teamOne: PropTypes.string,
        result: PropTypes.string,
        teamTwo: PropTypes.string,
        location: PropTypes.string,
        time: PropTypes.string,
        completed: PropTypes.bool,
        league: PropTypes.string
    })),
    loadingFixtures: PropTypes.bool,
    loadingMyTeam: PropTypes.bool,
    myTeam: PropTypes.string,
    setMyTeamRequest: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapStateToProps = state => ({
    fixtures: state.fixtures.fixtures,
    loadingFixtures: state.fixtures.loadingFixtures,
    loadingMyTeam: state.fixtures.loadingMyTeam,
    myTeam: state.fixtures.myTeam
});

const mapDispatchToProps = {
    fetchFixturesRequest,
    fetchMyTeamRequest,
    setMyTeamRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Fixtures);

export { Fixtures as FixturesUnconnected };
