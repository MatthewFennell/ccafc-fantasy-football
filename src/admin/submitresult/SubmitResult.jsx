import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import fp from 'lodash/fp';
import defaultStyles from './SubmitResult.module.scss';
import {
    fetchTeamsRequest, fetchPlayersForTeamRequest, submitResultRequest,
    closeSubmitResultError
} from '../actions';
import * as selectors from '../selectors';
import Dropdown from '../../common/dropdown/Dropdown';
import StyledInput from '../../common/StyledInput/StyledInput';
import { isDefensive } from '../../helperFunctions';
import StyledButton from '../../common/StyledButton/StyledButton';
import Spinner from '../../common/spinner/Spinner';
import ErrorModal from '../../common/modal/ErrorModal';

const SubmitResult = props => {
    useEffect(() => {
        props.fetchTeamsRequest();
    }, [props.fetchTeamsRequest]);

    const [teamName, setTeamName] = useState('');
    const [goalsFor, setGoalsFor] = useState('');
    const [goalsAgainst, setGoalsAgainst] = useState('');
    const [gameWeek, setGameWeek] = useState('');

    const [goalScorers, setGoalscorers] = useState({});
    const [assisters, setAssisters] = useState({});
    const [cleanSheets, setCleanSheets] = useState({});

    const setTeam = useCallback(name => {
        setTeamName(name);
        props.fetchPlayersForTeamRequest(name);
    }, [props.fetchPlayersForTeamRequest, teamName, setTeamName]);

    const getNthGoalscorer = n => fp.get(n)(goalScorers);
    const setNthGoalscorer = (val, n) => {
        if (val) {
            setGoalscorers(fp.set(n, val)(goalScorers));
        } else {
            setGoalscorers(fp.unset(n)(goalScorers));
        }
    };

    const getNthAssister = n => fp.get(n)(assisters);
    const setNthAssister = (val, n) => {
        if (val) {
            setAssisters(fp.set(n, val)(assisters));
        } else {
            setAssisters(fp.unset(n)(assisters));
        }
    };

    const getNthCleanSheet = n => fp.get(n)(cleanSheets);
    const setNthCleanSheet = (val, n) => {
        if (val) {
            setCleanSheets(fp.set(n, val)(cleanSheets));
        } else {
            setCleanSheets(fp.unset(n)(cleanSheets));
        }
    };

    const playersForActiveTeam = fp.getOr([], teamName)(props.teamsWithPlayers);
    const defensivePlayersForActiveTeam = playersForActiveTeam.filter(p => isDefensive(p.position));

    const unSelectedCleanSheets = defensivePlayersForActiveTeam
        .filter(x => !Object.values(cleanSheets).includes(x.value));

    const nameToId = name => fp.get('id')(playersForActiveTeam.find(a => a.value === name));

    const submitResult = useCallback(() => {
        let resultObject = {};
        const goalScorerIds = Object.values(goalScorers).map(x => nameToId(x));
        const assistsIds = Object.values(assisters).map(x => nameToId(x));
        const cleanSheetIds = Object.values(cleanSheets).map(x => nameToId(x));

        goalScorerIds.forEach(playerId => {
            resultObject = fp.set(`${playerId}.goals`, fp.getOr(0, `${playerId}.goals`, resultObject) + 1, resultObject);
        });

        assistsIds.forEach(playerId => {
            resultObject = fp.set(`${playerId}.assists`, fp.getOr(0, `${playerId}.assists`, resultObject) + 1, resultObject);
        });

        cleanSheetIds.forEach(playerId => {
            resultObject = fp.set(`${playerId}.cleanSheet`, true, resultObject);
        });

        const teamId = fp.get('id')(props.allTeams.find(x => x.value === teamName)) || null;

        props.submitResultRequest(
            teamId,
            parseInt(goalsFor, 10) || '',
            parseInt(goalsAgainst, 10) || '',
            parseInt(gameWeek, 10) || '',
            resultObject
        );

        // setGoalsFor('');
        // setGoalsAgainst('');
        // setGameWeek('');
    }, [teamName, goalsFor, goalsAgainst, gameWeek, goalScorers,
        assisters, cleanSheets, props.submitResultRequest]);

    console.log('goalscorers', goalScorers);

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
                key={player.id}
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
                <StyledInput label="Goals For" onChange={setGoalsFor} type="number" value={goalsFor} />
                <StyledInput label="Goals Against" onChange={setGoalsAgainst} type="number" value={goalsAgainst} />
                <StyledInput label="Gameweek" onChange={setGameWeek} type="number" value={gameWeek} />
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
            <div className={props.styles.submitButtonWrapper}>
                <StyledButton
                    color="primary"
                    onClick={submitResult}
                    text="Submit Result"
                />
            </div>
            <ErrorModal
                closeModal={props.closeSubmitResultError}
                headerMessage="Submit Result Error"
                isOpen={props.submitResultError.length > 0}
                errorCode={props.submitResultErrorCode}
                errorMessage={props.submitResultError}
            />
            <div className={classNames({
                [props.styles.hidden]: !props.submittingResult
            })}
            >
                <Spinner color="secondary" />
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
    closeSubmitResultError: PropTypes.func.isRequired,
    fetchTeamsRequest: PropTypes.func.isRequired,
    fetchPlayersForTeamRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    submitResultError: PropTypes.string.isRequired,
    submitResultErrorCode: PropTypes.string.isRequired,
    submitResultRequest: PropTypes.func.isRequired,
    submittingResult: PropTypes.bool.isRequired,
    teamsWithPlayers: PropTypes.objectOf(PropTypes.array).isRequired
};

const mapDispatchToProps = {
    closeSubmitResultError,
    fetchTeamsRequest,
    fetchPlayersForTeamRequest,
    submitResultRequest
};

const mapStateToprops = state => ({
    allTeams: selectors.getAllTeams(state),
    submittingResult: selectors.getSubmittingResult(state),
    submitResultError: selectors.getSubmitResultError(state),
    submitResultErrorCode: selectors.getSubmitResultErrorCode(state),
    teamsWithPlayers: selectors.getTeamsWithPlayers(state)
});

export default connect(mapStateToprops, mapDispatchToProps)(SubmitResult);
