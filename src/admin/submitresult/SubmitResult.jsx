import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import fp from 'lodash/fp';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getCorrectYear } from '../../common';
import Dropdown from '../../common/dropdown/Dropdown';
import LoadingDiv from '../../common/loadingDiv/LoadingDiv';
import SuccessModal from '../../common/modal/SuccessModal';
import Spinner from '../../common/spinner/Spinner';
import StyledButton from '../../common/StyledButton/StyledButton';
import * as textInputConstants from '../../common/TextInput/constants';
import TextInput from '../../common/TextInput/TextInput';
import * as appConstants from '../../constants';
import { isDefensive } from '../../helperFunctions';
import materialStyles from '../../materialStyles';
import { fetchMaxGameWeekRequest } from '../../overview/actions';
import {
    fetchPlayersForTeamRequest, fetchTeamsRequest, submitCustumResults,
    submitExtraStatsRequest, submitResultRequest
} from '../actions';
import ExtraStats from './ExtraStats';
import ResultsHistory from './ResultsHistory';
import defaultStyles from './SubmitResult.module.scss';

const generateWeekOptions = maxGameWeek => {
    const options = [];
    for (let x = 1; x < maxGameWeek + 1; x += 1) {
        options.push({
            id: x,
            text: x,
            value: x
        });
    }
    return options;
};

const SubmitResult = props => {
    const classes = makeStyles(materialStyles)();
    useEffect(() => {
        props.fetchTeamsRequest();
        // eslint-disable-next-line
    }, [props.fetchTeamsRequest]);

    const [teamName, setTeamName] = useState('');
    const [goalsFor, setGoalsFor] = useState('');
    const [goalsAgainst, setGoalsAgainst] = useState('');
    const [gameWeek, setGameWeek] = useState('');
    const [motm, setMotm] = useState('');
    const [dotd, setDotd] = useState('');
    const [isShowingHistory, setIsShowingHistory] = useState(false);

    const [goalScorers, setGoalscorers] = useState({});
    const [assisters, setAssisters] = useState({});
    const [cleanSheets, setCleanSheets] = useState({});

    useEffect(() => {
        props.fetchMaxGameWeekRequest();

        // eslint-disable-next-line
    }, [props.fetchMaxGameWeekRequest])

    const toggleShowingHistory = useCallback(() => {
        setIsShowingHistory(!isShowingHistory);
    }, [setIsShowingHistory, isShowingHistory]);

    const setTeam = useCallback(name => {
        setTeamName(name);
        props.fetchPlayersForTeamRequest(name);
        // eslint-disable-next-line
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

        const motmId = motm ? nameToId(motm) : '';
        const dotdId = dotd ? nameToId(dotd) : '';

        resultObject = motmId ? fp.set(`${motmId}.manOfTheMatch`, true)(resultObject) : resultObject;
        resultObject = dotdId ? fp.set(`${dotdId}.dickOfTheDay`, true)(resultObject) : resultObject;

        props.submitResultRequest(
            teamId,
            goalsFor || goalsFor === 0 ? parseFloat(goalsFor, 10) : '',
            goalsAgainst || goalsAgainst === 0 ? parseFloat(goalsAgainst, 10) : '',
            parseFloat(gameWeek, 10) || '',
            resultObject
        );
        setTeamName('');
        setGoalsFor('');
        setGoalsAgainst('');
        setMotm('');
        setDotd('');
        setGoalscorers({});
        setAssisters({});
        setCleanSheets({});
        // eslint-disable-next-line
    }, [teamName, goalsFor, goalsAgainst, gameWeek, goalScorers,
        assisters, cleanSheets, props.submitResultRequest, motm, dotd, nameToId]);

    const scorers = [];
    for (let x = 0; x < goalsFor; x += 1) {
        scorers.push(<Dropdown
            key={x}
            value={getNthGoalscorer(x)}
            onChange={name => setNthGoalscorer(name, x)}
            options={playersForActiveTeam}
            title={`Goal ${x + 1}`}
        />);
    }

    const assists = [];
    for (let x = 0; x < goalsFor; x += 1) {
        assists.push(<Dropdown
            key={x}
            value={getNthAssister(x)}
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
                value={getNthCleanSheet(x)}
                onChange={name => setNthCleanSheet(name, x)}
                options={unSelectedCleanSheets.concat(defensivePlayersForActiveTeam
                    .filter(y => y.value === getNthCleanSheet(x)))}
                title={`Clean Sheet ${x + 1}`}
            />
        );
    });

    console.log('test', props.resultsHistory);

    return (
        <>
            <Paper
                elevation={4}
                className={classes.paper}
            >
                <div className={props.styles.submitButtonWrapper}>
                    {(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') && (
                        <StyledButton
                            text="Custom submit"
                            onClick={() => props.submitCustumResults(gameWeek)}
                            disabled={!gameWeek}
                        />
                    )}
                    <StyledButton
                        color="primary"
                        onClick={submitResult}
                        text="Submit Result"
                        disabled={!gameWeek
                            || !teamName
                            || !(goalsFor && goalsFor !== 0)
                            || !(goalsAgainst && goalsAgainst !== 0)}
                    />
                    <StyledButton
                        color="primary"
                        onClick={toggleShowingHistory}
                        text="Results history"
                    />
                </div>
                <LoadingDiv
                    isLoading={props.isFetchingTeams}
                    isFitContent
                    isNoPadding
                    isBorderRadius
                >
                    <Dropdown value={teamName} onChange={setTeam} options={props.allTeams} title="Team" />
                </LoadingDiv>
                <div className={props.styles.goalsForWrapper}>
                    <TextInput
                        label="Goals For"
                        onChange={setGoalsFor}
                        type="number"
                        value={goalsFor}
                        icon={textInputConstants.textInputIcons.football}
                        iconColor="primary"
                    />
                    <TextInput
                        label="Goals Against"
                        onChange={setGoalsAgainst}
                        type="number"
                        value={goalsAgainst}
                        icon={textInputConstants.textInputIcons.football}
                        iconColor="primary"
                    />
                </div>
                <LoadingDiv
                    isLoading={Boolean(props.isFetchingPlayersForTeam && teamName)}
                    isFitContent
                    isBorderRadius
                >
                    <div>
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
                        <div className={props.styles.matchAwardsWrapper}>
                            <Dropdown
                                key="motm"
                                value={motm}
                                onChange={setMotm}
                                options={playersForActiveTeam}
                                title="MOTM"
                            />
                            <Dropdown
                                key="dotd"
                                value={dotd}
                                onChange={setDotd}
                                options={playersForActiveTeam}
                                title="DOTD"
                            />
                            <Dropdown
                                value={gameWeek}
                                onChange={setGameWeek}
                                options={generateWeekOptions(props.maxGameWeek)}
                                title="Week"
                            />
                        </div>
                    </div>
                </LoadingDiv>
                <div className={classNames({
                    [props.styles.hidden]: !props.submittingResult,
                    [props.styles.spinner]: true
                })}
                >
                    <Spinner color="secondary" />
                </div>
            </Paper>
            <ExtraStats
                allTeams={props.allTeams}
                fetchPlayersForTeamRequest={props.fetchPlayersForTeamRequest}
                isFetchingPlayersForTeam={props.isFetchingPlayersForTeam}
                maxGameWeek={props.maxGameWeek}
                setTeam={setTeam}
                submitExtraStatsRequest={props.submitExtraStatsRequest}
                submittingExtraResult={props.submittingExtraResult}
                teamsWithPlayers={props.teamsWithPlayers}
            />
            <SuccessModal
                backdrop
                closeModal={() => setIsShowingHistory(false)}
                isOpen={isShowingHistory}
                headerMessage="Results History"
                toggleModal={toggleShowingHistory}
            >
                <ResultsHistory resultsHistory={props.resultsHistory} />
            </SuccessModal>
        </>
    );
};

SubmitResult.defaultProps = {
    allTeams: [],
    isFetchingTeams: false,
    isFetchingPlayersForTeam: false,
    maxGameWeek: null,
    resultsHistory: [],
    styles: defaultStyles
};

SubmitResult.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    fetchTeamsRequest: PropTypes.func.isRequired,
    fetchPlayersForTeamRequest: PropTypes.func.isRequired,
    fetchMaxGameWeekRequest: PropTypes.func.isRequired,
    isFetchingTeams: PropTypes.bool,
    isFetchingPlayersForTeam: PropTypes.bool,
    maxGameWeek: PropTypes.number,
    resultsHistory: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.shape({
            displayName: PropTypes.string,
            email: PropTypes.string,
            uid: PropTypes.string
        }),
        type: PropTypes.string,
        week: PropTypes.number
    })),
    styles: PropTypes.objectOf(PropTypes.string),
    submitResultRequest: PropTypes.func.isRequired,
    submittingResult: PropTypes.bool.isRequired,
    submitCustumResults: PropTypes.func.isRequired,
    submitExtraStatsRequest: PropTypes.func.isRequired,
    submittingExtraResult: PropTypes.bool.isRequired,
    teamsWithPlayers: PropTypes.objectOf(PropTypes.array).isRequired
};

const mapDispatchToProps = {
    fetchTeamsRequest,
    fetchPlayersForTeamRequest,
    submitResultRequest,
    submitExtraStatsRequest,
    fetchMaxGameWeekRequest,
    submitCustumResults
};

const mapStateToProps = state => ({
    allTeams: state.admin.allTeams,
    isFetchingTeams: state.admin.isFetchingTeams,
    isFetchingPlayersForTeam: state.admin.isFetchingPlayersForTeam,
    maxGameWeek: state.overview.maxGameWeek,
    resultsHistory: state.firestore.data.resultsHistory?.history,
    submittingResult: state.admin.submittingResult,
    submittingExtraResult: state.admin.submittingExtraResults,
    submitResultError: state.admin.submitResultError,
    submitResultErrorCode: state.admin.submitResultErrorCode,
    teamsWithPlayers: state.admin.teamsWithPlayers
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => [
        {
            collection: 'fantasy-years',
            doc: getCorrectYear(),
            subcollections: [
                { collection: 'results-history', doc: appConstants.RESULTS_HISTORY_ID }
            ],
            storeAs: 'resultsHistory'
        }
    ])
)(SubmitResult);

export { SubmitResult as SubmitResultUnconnected };
