import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { connect } from 'react-redux';
import defaultStyles from './Fixtures.module.scss';
import { fetchFixturesRequest, setMyTeamRequest, fetchMyTeamRequest } from './actions';
import Grid from '../common/grid/Grid';
import FixtureFilter from './view/FixtureFilters';
import SetTeam from './view/SetTeam';
import {
    generateCollingwoodTeams, gridStyles, fixturesFilters, columns, filterFixtures
} from './helpers';

const Fixtures = props => {
    const [myTeam, setMyTeam] = useState('');
    const [radioValue, setRadioValue] = useState(props.myTeam);
    const [collingwoodOnly, setCollingwoodOnly] = useState(false);
    const [upcomingMatchesOnly, setUpcomingMatchesOnly] = useState(false);
    const [teamNameFilter, setTeamNameFilter] = useState('');

    useEffect(() => {
        props.fetchFixturesRequest();
        props.fetchMyTeamRequest();
        // eslint-disable-next-line
    }, [props.fetchMyTeamRequest]);

    useEffect(() => {
        setRadioValue(props.myTeam);
    }, [props.myTeam]);


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

    return (
        <div>
            <SetTeam
                activeTeam={myTeam}
                loadingMyTeam={props.loadingMyTeam}
                myTeam={props.myTeam}
                setActiveTeam={setMyTeam}
                teamOptions={generateCollingwoodTeams(props.fixtures)}
                updateMyTeam={updateMyTeam}
            />

            <div className={props.styles.fixturesWrapper}>

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
                <div>
                    <Grid
                        columns={columns}
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
                        showPagination={false}
                        rowsPerPageOptions={[100000]}
                        maxHeightGrid
                        gridStyles={gridStyles}
                    />
                </div>
            </div>
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
