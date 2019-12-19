import React, { useState, useCallback } from 'react';
import fp from 'lodash/fp';
import PropTypes from 'prop-types';
import _, { noop } from 'lodash';
import defaultStyles from './ExtraStats.module.scss';
import Dropdown from '../../common/dropdown/Dropdown';
import StyledButton from '../../common/StyledButton/StyledButton';


const data = {
    yellowCard: '6jtXCivt9avUONxwnIYW',
    redCard: '6jtXCivt9avUONxwnIYW',
    penaltySaved: 'hLMglTGcDoSwf7HLY34T',
    penaltyMissed: 'DjREj5SXsj0cU66oFVFM'
};

const uniqueKeys = _.uniq(Object.values(data).filter(x => x !== null));

console.log('unique', uniqueKeys);

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
    }, [gameWeek, yellowCard, redCard, penaltySaved,
        penaltyMissed, ownGoals, props.submitExtraStatsRequest]);

    return (
        <div className={props.styles.extraStatsWrapper}>
            <div className={props.styles.extraStatsTitle}>
                Extra Stats
            </div>
            <div className={props.styles.dropdownWrapper}>
                <Dropdown activeValue={teamName} onChange={setTeam} options={props.allTeams} title="Team" />
                <Dropdown activeValue={gameWeek} onChange={setGameWeek} options={generateWeekOptions(props.maxGameWeek)} title="Week" />
                <Dropdown
                    key="Player"
                    activeValue={yellowCard}
                    onChange={setYellowCard}
                    options={playersForActiveTeam}
                    title="Yellow Card"
                />
                <Dropdown
                    key="RedCard"
                    activeValue={redCard}
                    onChange={setRedCard}
                    options={playersForActiveTeam}
                    title="Red Card"
                />
                <Dropdown
                    key="PenaltySaved"
                    activeValue={penaltySaved}
                    onChange={setPenaltySaved}
                    options={playersForActiveTeam}
                    title="Penalty Saved"
                />
                <Dropdown
                    key="PenaltyMissed"
                    activeValue={penaltyMissed}
                    onChange={setPenaltyMissed}
                    options={playersForActiveTeam}
                    title="Penalty Missed"
                />
                <Dropdown
                    key="OwnGoals"
                    activeValue={ownGoals}
                    onChange={setOwnGoals}
                    options={playersForActiveTeam}
                    title="Own Goals"
                />
            </div>
            <div className={props.styles.submitExtraStatsButton}>
                <StyledButton
                    color="primary"
                    onClick={submitExtraStats}
                    text="Add Extra Stats"
                />
            </div>
        </div>
    );
};

ExtraStats.defaultProps = {
    allTeams: [],
    fetchPlayersForTeamRequest: noop,
    maxGameWeek: 0,
    styles: defaultStyles,
    submitExtraStatsRequest: noop,
    teamsWithPlayers: []
};

ExtraStats.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    fetchPlayersForTeamRequest: PropTypes.func,
    maxGameWeek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string),
    submitExtraStatsRequest: PropTypes.func,
    teamsWithPlayers: PropTypes.arrayOf(PropTypes.shape({}))
};

export default ExtraStats;
