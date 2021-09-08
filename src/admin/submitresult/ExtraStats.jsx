import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { noop } from 'lodash';
import fp from 'lodash/fp';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import Dropdown from '../../common/dropdown/Dropdown';
import LoadingDiv from '../../common/loadingDiv/LoadingDiv';
import Spinner from '../../common/spinner/Spinner';
import StyledButton from '../../common/StyledButton/StyledButton';
import materialStyles from '../../materialStyles';
import defaultStyles from './ExtraStats.module.scss';

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

const ExtraStats = props => {
    const classes = makeStyles(materialStyles)();
    const [teamName, setTeamName] = useState('');
    const [yellowCard, setYellowCard] = useState('');
    const [redCard, setRedCard] = useState('');
    const [penaltySaved, setPenaltySaved] = useState('');
    const [penaltyMissed, setPenaltyMissed] = useState('');
    const [gameWeek, setGameWeek] = useState('');
    const [ownGoals, setOwnGoals] = useState('');

    const setTeam = useCallback(name => {
        setTeamName(name);
        props.fetchPlayersForTeamRequest(name);
        // eslint-disable-next-line
    }, [props.fetchPlayersForTeamRequest, teamName, setTeamName]);

    const playersForActiveTeam = fp.getOr([], teamName)(props.teamsWithPlayers);
    const nameToId = name => fp.get('id')(playersForActiveTeam.find(a => a.value === name));

    const submitExtraStats = useCallback(() => {
        props.submitExtraStatsRequest(
            gameWeek,
            nameToId(yellowCard),
            nameToId(redCard),
            nameToId(penaltySaved),
            nameToId(penaltyMissed),
            nameToId(ownGoals)
        );
        setYellowCard('');
        setRedCard('');
        setPenaltyMissed('');
        setPenaltySaved('');
        setOwnGoals('');
        // eslint-disable-next-line
    }, [gameWeek, yellowCard, redCard, penaltySaved,
        penaltyMissed, ownGoals, props.submitExtraStatsRequest, nameToId]);

    return (
        <Paper
            elevation={4}
            className={classes.paper}
        >
            <div className={props.styles.extraStatsTitle}>
                Extra Stats
            </div>
            <LoadingDiv
                isLoading={Boolean(props.isFetchingPlayersForTeam && teamName)}
                isBorderRadius
                isMargin
            >
                <div className={props.styles.dropdownWrapper}>
                    <Dropdown value={teamName} onChange={setTeam} options={props.allTeams} title="Team" />
                    <Dropdown value={gameWeek} onChange={setGameWeek} options={generateWeekOptions(props.maxGameWeek)} title="Week" />
                    <Dropdown
                        key="Player"
                        value={yellowCard}
                        onChange={setYellowCard}
                        options={playersForActiveTeam}
                        title="Yellow Card"
                    />
                    <Dropdown
                        key="RedCard"
                        value={redCard}
                        onChange={setRedCard}
                        options={playersForActiveTeam}
                        title="Red Card"
                    />
                    <Dropdown
                        key="PenaltySaved"
                        value={penaltySaved}
                        onChange={setPenaltySaved}
                        options={playersForActiveTeam}
                        title="Pen Save"
                    />
                    <Dropdown
                        key="PenaltyMissed"
                        value={penaltyMissed}
                        onChange={setPenaltyMissed}
                        options={playersForActiveTeam}
                        title="Pen Miss"
                    />
                    <Dropdown
                        key="OwnGoals"
                        value={ownGoals}
                        onChange={setOwnGoals}
                        options={playersForActiveTeam}
                        title="Own Goals"
                    />
                </div>
            </LoadingDiv>
            <div className={props.styles.submitExtraStatsButton}>
                <StyledButton
                    color="primary"
                    onClick={submitExtraStats}
                    text="Add Extra Stats"
                    disabled={!teamName || !gameWeek || props.submittingExtraResult}
                />
            </div>
            <div className={classNames({
                [props.styles.hidden]: !props.submittingExtraResult,
                [props.styles.central]: true
            })}
            >
                <Spinner color="secondary" />
            </div>
        </Paper>
    );
};

ExtraStats.defaultProps = {
    allTeams: [],
    fetchPlayersForTeamRequest: noop,
    isFetchingPlayersForTeam: false,
    maxGameWeek: 0,
    styles: defaultStyles,
    submitExtraStatsRequest: noop,
    submittingExtraResult: false,
    teamsWithPlayers: {}
};

ExtraStats.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    fetchPlayersForTeamRequest: PropTypes.func,
    isFetchingPlayersForTeam: PropTypes.bool,
    maxGameWeek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string),
    submitExtraStatsRequest: PropTypes.func,
    submittingExtraResult: PropTypes.bool,
    teamsWithPlayers: PropTypes.objectOf(PropTypes.array)
};

export default ExtraStats;
