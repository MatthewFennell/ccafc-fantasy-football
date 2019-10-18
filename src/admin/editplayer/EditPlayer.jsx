import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fp from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import defaultStyles from './EditPlayer.module.scss';
import {
    fetchTeamsRequest, fetchPlayersForTeamRequest, fetchPlayerStatsRequest, editPlayerStatsRequest
} from '../actions';
import Dropdown from '../../common/dropdown/Dropdown';
import Grid from '../../common/grid/Grid';
import StyledInput from '../../common/StyledInput/StyledInput';
import StyledButton from '../../common/StyledButton/StyledButton';

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

const columns = [
    {
        id: 'stat',
        label: 'Stat',
        align: 'center'
    },
    {
        id: 'oldValue',
        label: 'Old Value',
        align: 'center'
    },
    {
        id: 'newValue',
        label: 'New Value',
        align: 'center',
        renderCell: true
    }
];

const WithSmallDiv = Component => {
    const divWrapper = props => (
        <div style={{
            width: '25%', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'
        }}
        >
            <Component {...props} />
        </div>
    );
    return divWrapper;
};

const SmallerInput = WithSmallDiv(StyledInput);
const SmallerDropdown = WithSmallDiv(Dropdown);

const booleanOptions = [
    {
        id: 'false',
        value: 'false',
        text: 'false'
    },
    {
        id: 'true',
        value: 'true',
        text: 'true'
    }
];

const EditPlayer = props => {
    const [playerTeam, setPlayerTeam] = useState('');
    const [playerToEdit, setPlayerToEdit] = useState('');
    const [week, setWeek] = useState('');
    const [goals, setGoals] = useState('');
    const [assists, setAssists] = useState('');
    const [cleanSheet, setCleanSheet] = useState('');
    const [yellowCard, setYellowCard] = useState('');
    const [redCard, setRedCard] = useState('');
    const [motm, setMotm] = useState('');

    const generateRows = playerStats => {
        const rows = [
            {
                id: 'goals',
                stat: 'Goals',
                oldValue: playerStats.goals,
                newValue: <SmallerInput onChange={setGoals} value={goals} type="number" centerText />
            },
            {
                id: 'assists',
                stat: 'Assists',
                oldValue: playerStats.assists,
                newValue: <SmallerInput onChange={setAssists} value={assists} type="number" centerText />
            },
            {
                id: 'cleanSheet',
                stat: 'Clean Sheet',
                oldValue: playerStats.cleanSheet !== undefined ? playerStats.cleanSheet.toString() : '',
                newValue: <SmallerDropdown
                    onChange={setCleanSheet}
                    options={booleanOptions}
                    activeValue={cleanSheet}
                />
            },
            {
                id: 'yellowCard',
                stat: 'Yellow Card',
                oldValue: playerStats.yellowCard !== undefined ? playerStats.yellowCard.toString() : '',
                newValue: <SmallerDropdown
                    onChange={setYellowCard}
                    options={booleanOptions}
                    activeValue={yellowCard}
                />
            },
            {
                id: 'redCard',
                stat: 'Red Card',
                oldValue: playerStats.redCard !== undefined ? playerStats.redCard.toString() : '',
                newValue: <SmallerDropdown
                    onChange={setRedCard}
                    options={booleanOptions}
                    activeValue={redCard}
                />
            },
            {
                id: 'motm',
                stat: 'MOTM',
                oldValue: playerStats.manOfTheMatch !== undefined ? playerStats.manOfTheMatch.toString() : '',
                newValue: <SmallerDropdown
                    onChange={setMotm}
                    options={booleanOptions}
                    activeValue={motm}
                />
            }
        ];
        return rows;
    };

    useEffect(() => {
        if (playerTeam && playerToEdit && week) {
            const playerId = fp.get('id')(props.teamsWithPlayers[playerTeam].find(x => x.value === playerToEdit));
            if (playerId) {
                props.fetchPlayerStatsRequest(playerId, week);
            }
        }
    }, [playerTeam, playerToEdit, week, props.teamsWithPlayers, props.fetchPlayerStatsRequest]);

    useEffect(() => {
        props.fetchTeamsRequest();
    }, [props.fetchTeamsRequest]);

    const setPlayer = useCallback(p => {
        setPlayerToEdit(p);
    }, [playerToEdit, setPlayerToEdit]);

    const setTeam = useCallback(name => {
        setPlayerTeam(name);
        setPlayerToEdit('');
        props.fetchPlayersForTeamRequest(name);
    }, [props.fetchPlayersForTeamRequest, playerTeam, setPlayerTeam]);

    const setWeekToEdit = useCallback(w => {
        setWeek(w);
    }, [week, setWeek]);

    const playersForActiveTeam = fp.getOr([], playerTeam)(props.teamsWithPlayers);

    const editPlayer = useCallback(() => {
        const isDifferent = (key, valBefore, valAfter) => {
            if (valAfter !== '' && valBefore.toString() !== valAfter.toString()) {
                return fp.set(key, valAfter);
            }
            return fp.identity;
        };
        const difference = fp.flow(
            isDifferent('goals', props.playerStats.goals, parseInt(goals, 10) || ''),
            isDifferent('assists', props.playerStats.assists, parseInt(assists, 10) || ''),
            isDifferent('cleanSheet', props.playerStats.cleanSheet, cleanSheet === 'true'),
            isDifferent('redCard', props.playerStats.redCard, redCard === 'true'),
            isDifferent('yellowCard', props.playerStats.yellowCard, yellowCard === 'true'),
            isDifferent('manOfTheMatch', props.playerStats.manOfTheMatch, motm === 'true'),
        )({});
        const playerId = fp.get('id')(props.teamsWithPlayers[playerTeam].find(x => x.value === playerToEdit));

        props.editPlayerStatsRequest(playerId, week, difference);
    }, [goals, assists, cleanSheet, redCard, yellowCard, motm,
        props.teamsWithPlayers, props.editPlayerStatsRequest]);

    return (
        <>
            <div className={props.styles.findPlayerDropdowns}>
                <div className={props.styles.teamDropdown}>
                    <Dropdown activeValue={playerTeam} onChange={setTeam} options={props.allTeams} title="Team" />
                </div>
                <div className={props.styles.playerDropdown}>
                    <Dropdown
                        activeValue={playerToEdit}
                        onChange={setPlayer}
                        options={playersForActiveTeam}
                        title="Player to edit"
                    />
                </div>
                <div>
                    <Dropdown activeValue={week} onChange={setWeekToEdit} options={generateWeekOptions(props.maxGameWeek)} title="Week" />
                </div>
            </div>
            <div className={props.styles.oldStatsWrapper}>
                <Grid
                    columns={columns}
                    rows={generateRows(props.playerStats)}
                    showPagination={false}
                />
                <div className={props.styles.buttonWrapper}>
                    <StyledButton
                        color="primary"
                        onClick={editPlayer}
                        text="Edit Stats"
                    />
                </div>
            </div>
        </>
    );
};

EditPlayer.defaultProps = {
    allTeams: [],
    maxGameWeek: null,
    playerStats: {},
    styles: defaultStyles,
    teamsWithPlayers: {}
};

EditPlayer.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    editPlayerStatsRequest: PropTypes.func.isRequired,
    fetchPlayerStatsRequest: PropTypes.func.isRequired,
    fetchPlayersForTeamRequest: PropTypes.func.isRequired,
    fetchTeamsRequest: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    maxGameWeek: PropTypes.number,
    playerStats: PropTypes.shape({
        fetching: PropTypes.bool,
        assists: PropTypes.number,
        cleanSheet: PropTypes.bool,
        goals: PropTypes.number,
        redCard: PropTypes.bool,
        yellowCard: PropTypes.bool,
        manOfTheMatch: PropTypes.bool
    }),
    styles: PropTypes.objectOf(PropTypes.string),
    teamsWithPlayers: PropTypes.objectOf(PropTypes.array)
};

const mapDispatchToProps = {
    editPlayerStatsRequest,
    fetchPlayersForTeamRequest,
    fetchPlayerStatsRequest,
    fetchTeamsRequest
};

const mapStateToProps = state => ({
    allTeams: state.admin.allTeams,
    maxGameWeek: state.overview.maxGameWeek,
    playerStats: state.admin.playerStats,
    teamsWithPlayers: state.admin.teamsWithPlayers
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPlayer));
