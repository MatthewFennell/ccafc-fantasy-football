import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _, { noop } from 'lodash';
import { connect } from 'react-redux';
import defaultStyles from './Fixtures.module.scss';
import { fetchFixturesRequest, setMyTeamRequest, fetchMyTeamRequest } from './actions';
import Dropdown from '../common/dropdown/Dropdown';
import StyledButton from '../common/StyledButton/StyledButton';
import Spinner from '../common/spinner/Spinner';
import RadioButton from '../common/radio/RadioButton';
import Toggle from '../common/Toggle/Toggle';
import StyledInput from '../common/StyledInput/StyledInput';

const fixturesFilters = (myTeam, fixtures) => {
    const leagues = fixtures.reduce((prev, curr) => _.uniqBy(
        [...prev, curr.league]
    ), []);

    return [
        {
            radioLabel: 'My Team',
            value: myTeam
        },
        {
            radioLabel: 'All Leagues',
            value: 'All'
        }
    ].concat(leagues.map(x => ({
        radioLabel: x,
        value: x
    })));
};

const tempOptions = [
    {
        id: 'Collingwood A',
        value: 'Collingwood A',
        text: 'Collingwood A'
    },
    {
        id: 'Collingwood B',
        value: 'Collingwood B',
        text: 'Collingwood B'
    },
    {
        id: 'Collingwood C',
        value: 'Collingwood C',
        text: 'Collingwood C'
    },
    {
        id: 'Collingwood D',
        value: 'Collingwood D',
        text: 'Collingwood D'
    }
];

const generateCollingwoodTeams = fixtures => fixtures
    .reduce((prev, curr) => _.uniqBy(
        [...prev, curr.teamOne, curr.teamTwo]
    ), [])
    .filter(x => x.includes('Collingwood'))
    .sort()
    .map(x => ({
        id: x,
        value: x,
        text: x
    }));

const Fixtures = props => {
    const [myTeam, setMyTeam] = useState('');
    const [radioValue, setRadioValue] = useState(props.myTeam);
    const [collingwoodOnly, setCollingwoodOnly] = useState(false);
    const [upcomingMatchesOnly, setUpcomingMatchesOnly] = useState(false);
    const [teamNameFilter, setTeamNameFilter] = useState('');

    console.log('radio value', radioValue);

    useEffect(() => {
        props.fetchFixturesRequest();
        props.fetchMyTeamRequest();
    }, []);

    useEffect(() => {
        setRadioValue(props.myTeam);
    }, [props.myTeam]);


    const updateMyTeam = useCallback(() => {
        props.setMyTeamRequest(myTeam);
    }, [props.setMyTeamRequest, props.myTeam, myTeam]);

    const searchByTeamName = useCallback(x => {
        setTeamNameFilter(x);
        setCollingwoodOnly(false);
    }, [teamNameFilter, setTeamNameFilter, collingwoodOnly, setCollingwoodOnly]);


    return (
        <div>
            <div className={props.styles.selectTeamWrapper}>
                <div>
                    {props.loadingMyTeam ? <Spinner color="secondary" /> : props.myTeam}
                </div>
                <div>
                    <Dropdown
                        activeValue={myTeam}
                        onChange={setMyTeam}
                        options={generateCollingwoodTeams(props.fixtures)}
                        // options={tempOptions}
                        title="Set Team"
                        key="Set Team"
                    />
                </div>

                <div>
                    <StyledButton
                        onClick={updateMyTeam}
                        color="primary"
                        text="Update my team"
                    />
                </div>
            </div>

            <div className={props.styles.fixturesWrapper}>
                <RadioButton
                    radioLabel="Filter"
                    onChange={setRadioValue}
                    options={fixturesFilters(props.myTeam, props.fixtures)}
                    value={radioValue}
                />
                <div className={props.styles.extraFilters}>
                    <div className={props.styles.collingwoodOnly}>
                        <div>
                            Collingwood Only
                        </div>
                        <div>
                            <Toggle
                                color="primary"
                                checked={collingwoodOnly}
                                onChange={() => setCollingwoodOnly(!collingwoodOnly)}
                            />
                        </div>
                    </div>
                    <div className={props.styles.collingwoodOnly}>
                        <div>
                            Upcoming Matches Only
                        </div>
                        <div>
                            <Toggle
                                color="primary"
                                checked={upcomingMatchesOnly}
                                onChange={() => setUpcomingMatchesOnly(!upcomingMatchesOnly)}
                            />
                        </div>
                    </div>
                    <div className={props.styles.searchByName}>
                        <StyledInput label="Team Name" onChange={searchByTeamName} value={teamNameFilter} />
                    </div>
                </div>
            </div>
        </div>
    );
};

Fixtures.defaultProps = {
    fetchFixturesRequest: noop,
    fetchMyTeamRequest: noop,
    fixtures: [],
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
    loadingMyTeam: PropTypes.bool,
    myTeam: PropTypes.string,
    setMyTeamRequest: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapStateToProps = state => ({
    fixtures: state.fixtures.fixtures,
    loadingMyTeam: state.fixtures.loadingMyTeam,
    myTeam: state.fixtures.myTeam
});

const mapDispatchToProps = {
    fetchFixturesRequest,
    fetchMyTeamRequest,
    setMyTeamRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Fixtures);
