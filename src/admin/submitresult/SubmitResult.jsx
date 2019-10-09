import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fp from 'lodash/fp';
import defaultStyles from './SubmitResult.module.scss';
import { fetchTeamsRequest, fetchPlayersForTeamRequest } from '../actions';
import * as selectors from '../selectors';
import Dropdown from '../../common/dropdown/Dropdown';
import StyledInput from '../../common/StyledInput/StyledInput';
import Toggle from '../../common/Toggle/Toggle';
import { isDefensive } from '../../helperFunctions';

const SubmitResult = props => {
    useEffect(() => {
        props.fetchTeamsRequest();
    }, [props.fetchTeamsRequest]);

    const [cleanSheet, setCleanSheet] = useState(false);

    const [teamName, setTeamName] = useState('');
    const [goalsFor, setGoalsFor] = useState(0);
    const [goalsAgainst, setGoalsAgainst] = useState('');
    const [gameWeek, setGameWeek] = useState(0);

    const [goalScorers, setGoalscorers] = useState({});
    const [assisters, setAssisters] = useState({});
    const [cleanSheets, setCleanSheets] = useState({});

    const setTeam = useCallback(name => {
        setTeamName(name);
        props.fetchPlayersForTeamRequest(name);
    }, [props.fetchPlayersForTeamRequest, teamName, setTeamName]);

    const getNthGoalscorer = n => fp.get(n)(goalScorers);
    const setNthGoalscorer = (val, n) => setGoalscorers(fp.set(n, val)(goalScorers));

    const getNthAssister = n => fp.get(n)(assisters);
    const setNthAssister = (val, n) => setAssisters(fp.set(n, val)(assisters));

    const getNthCleanSheet = n => fp.get(n)(cleanSheets);
    const setNthCleanSheet = (val, n) => setCleanSheets(fp.set(n, val)(cleanSheets));

    const playersForActiveTeam = fp.getOr([], teamName)(props.teamsWithPlayers);
    const defensivePlayersForActiveTeam = playersForActiveTeam.filter(p => isDefensive(p.position));

    const unSelectedCleanSheets = defensivePlayersForActiveTeam
        .filter(x => !Object.values(cleanSheets).includes(x.value));

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

    const cleanSheetsRender = [];
    defensivePlayersForActiveTeam.forEach((player, x) => {
        cleanSheetsRender.push(
            <Dropdown
                activeValue={getNthCleanSheet(x)}
                onChange={name => setNthCleanSheet(name, x)}
                options={unSelectedCleanSheets.concat(defensivePlayersForActiveTeam
                    .filter(y => y.value === getNthCleanSheet(x)))}
                title={`Clean Sheet ${x + 1}`}
            />
        );
    });

    return (
        <div className={props.styles.submitResultWrapper}>
            <Dropdown activeValue={teamName} onChange={setTeam} options={props.allTeams} title="Team" />
            <div className={props.styles.goalsForWrapper}>
                <StyledInput label="Goals For" onChange={setGoalsFor} type="number" />
                <StyledInput label="Goals Against" onChange={setGoalsAgainst} type="number" />
                <StyledInput label="Gameweek" onChange={setGameWeek} type="number" />
            </div>

            <div className={props.styles.goalScorersWrapper}>
                {scorers}
            </div>
            <div className={props.styles.assistsWrapper}>
                {assists}
            </div>

            <div className={props.styles.cleanSheetWrapper}>
                {parseInt(goalsAgainst, 10) === 0 && (
                    <div className={props.styles.cleanSheetDropdowns}>
                        {cleanSheetsRender}
                    </div>
                ) }
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
