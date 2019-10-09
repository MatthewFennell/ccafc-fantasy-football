import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fp from 'lodash/fp';
import defaultStyles from './SubmitResult.module.scss';
import { fetchTeamsRequest, fetchPlayersForTeamRequest } from '../actions';
import * as selectors from '../selectors';
import Dropdown from '../../common/dropdown/Dropdown';
import StyledInput from '../../common/StyledInput/StyledInput';

const SubmitResult = props => {
    useEffect(() => {
        props.fetchTeamsRequest();
    }, [props.fetchTeamsRequest]);

    const [teamName, setTeamName] = useState('');
    const [goalsFor, setGoalsFor] = useState(0);
    const [goalsAgainst, setGoalsAgainst] = useState('');

    const [goalScorers, setGoalscorers] = useState({});
    const [assisters, setAssisters] = useState({});

    const setTeam = useCallback(name => {
        setTeamName(name);
        props.fetchPlayersForTeamRequest(name);
    }, [props.fetchPlayersForTeamRequest, teamName, setTeamName]);

    const getNthGoalscorer = n => fp.get(n)(goalScorers);
    const setNthGoalscorer = (val, n) => setGoalscorers(fp.set(n, val)(goalScorers));

    const getNthAssister = n => fp.get(n)(assisters);
    const setNthAssister = (val, n) => setAssisters(fp.set(n, val)(assisters));
    const playersForActiveTeam = fp.get(teamName)(props.teamsWithPlayers);

    const scorers = [];
    for (let x = 0; x < goalsFor; x += 1) {
        scorers.push(<Dropdown
            key={x}
            activeValue={getNthGoalscorer(x)}
            onChange={name => setNthGoalscorer(name, x)}
            options={playersForActiveTeam}
            title={`Goal ${x + 1}`}
        />);
    }

    const assists = [];
    for (let x = 0; x < goalsFor; x += 1) {
        assists.push(<Dropdown
            key={x}
            activeValue={getNthAssister(x)}
            onChange={name => setNthAssister(name, x)}
            options={playersForActiveTeam}
            title={`Assist ${x + 1}`}
        />);
    }


    return (
        <div className={props.styles.submitResultWrapper}>
            <div className={props.styles.teamDropdownWrapper}>
                <Dropdown activeValue={teamName} onChange={setTeam} options={props.allTeams} title="Team" />
            </div>
            <div className={props.styles.goalsForWrapper}>
                <StyledInput label="Goals For" onChange={setGoalsFor} type="number" />
                <StyledInput label="Goals Against" onChange={setGoalsAgainst} type="number" />
            </div>

            <div className={props.styles.goalScorersWrapper}>
                {scorers}
            </div>
            <div className={props.styles.assistsWrapper}>
                {assists}
            </div>
        </div>
    );
};

SubmitResult.defaultProps = {
    allTeams: [],
    styles: defaultStyles
};

SubmitResult.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    fetchTeamsRequest: PropTypes.func.isRequired,
    fetchPlayersForTeamRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    teamsWithPlayers: PropTypes.objectOf(PropTypes.array).isRequired
};

const mapDispatchToProps = {
    fetchTeamsRequest,
    fetchPlayersForTeamRequest
};

const mapStateToprops = state => ({
    allTeams: selectors.getAllTeams(state),
    teamsWithPlayers: selectors.getTeamsWithPlayers(state)
});

export default connect(mapStateToprops, mapDispatchToProps)(SubmitResult);
