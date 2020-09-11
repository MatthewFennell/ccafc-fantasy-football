import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import { fetchAllTeamsRequest } from './actions';
import Graph from './graph/Graph';
import LeagueTable from './leaguetable/LeagueTable';
import { fetchFixturesRequest } from '../fixtures/actions';
import FadingCollapsable from '../common/fadingCollapsable/FadingCollapsable';
import defaultStyles from './Charts.module.scss';

const Heading = props => (
    <div
        className={defaultStyles.titleMessage}
        onClick={() => props.setIsCollapsableOpen(true)}
        role="button"
        tabIndex={0}
    >
        {props.titleMessage}
    </div>
);

Heading.defaultProps = {
    setIsCollapsableOpen: noop,
    titleMessage: ''
};

Heading.propTypes = {
    setIsCollapsableOpen: PropTypes.func,
    titleMessage: PropTypes.string
};

const Charts = props => {
    useEffect(() => {
        props.fetchAllTeamsRequest();
        props.fetchFixturesRequest();
        // eslint-disable-next-line
    }, [props.fetchAllTeamsRequest]);

    const filterFixtures = useCallback(() => props.fixtures
        .filter(x => x.teamOne.includes('Collingwood') || x.teamTwo.includes('Collingwood'))
        .filter(x => x.completed)
        .filter(x => !x.isCup),
    [props.fixtures]);

    return (
        <>
            <FadingCollapsable
                isBigSideMargins
                isNoPhoneMargin
                isBorderRadiusTiny
                title={(
                    <Heading titleMessage="Graphs (Click to expand)" />
                )}
            >
                <Graph
                    fixtures={props.fixtures.filter(x => x.completed && !x.isCup)}
                    loadingFixtures={props.loadingFixtures}
                    title="Graphs"
                />
            </FadingCollapsable>
            <div className={props.styles.leagueWrapper}>
                <FadingCollapsable
                    isBigSideMargins
                    isNoPhoneMargin
                    isBorderRadiusTiny
                    title={(
                        <Heading titleMessage="League Table (Click to expand)" />
                    )}
                >
                    <LeagueTable
                        allTeams={props.allTeams}
                        fixtures={filterFixtures()}
                        loadingFixtures={props.loadingFixtures}
                        title="LeagueTable"
                    />
                </FadingCollapsable>
            </div>
        </>
    );
};

Charts.defaultProps = {
    allTeams: [],
    fixtures: [],
    loadingFixtures: false,
    styles: defaultStyles
};

Charts.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    fetchAllTeamsRequest: PropTypes.func.isRequired,
    fetchFixturesRequest: PropTypes.func.isRequired,
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
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    fetchAllTeamsRequest,
    fetchFixturesRequest
};

const mapStateToProps = state => ({
    allTeams: state.charts.allTeams,
    fetchingAllTeams: state.charts.fetchingAllTeams,
    fixtures: state.fixtures.fixtures,
    loadingFixtures: state.fixtures.loadingFixtures,
    maxGameweek: state.overview.maxGameWeek
});

export default connect(mapStateToProps, mapDispatchToProps)(Charts);

export { Charts as ChartsUnconnected };
