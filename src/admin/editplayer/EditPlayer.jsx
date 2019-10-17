import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fp from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import defaultStyles from './EditPlayer.module.scss';
import { fetchTeamsRequest, fetchPlayersForTeamRequest, fetchPlayerStatsRequest } from '../actions';
import Dropdown from '../../common/dropdown/Dropdown';
import Grid from '../../common/grid/Grid';

const generateWeekOptions = maxGameWeek => {
    const options = [];
    for (let x = 0; x < maxGameWeek; x += 1) {
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
        id: 'value',
        label: 'Value',
        align: 'center'
    },
    {
        id: 'edit',
        label: 'Edit',
        align: 'center',
        renderCell: true
    }
];

const generateRows = playerStats => {
    const rows = [
        {
            id: 'goals',
            stat: 'Goals',
            value: playerStats.goals,
            edit: <div>Edit</div>
        },
        {
            id: 'assists',
            stat: 'Assists',
            value: playerStats.assists
        },
        {
            id: 'cleanSheet',
            stat: 'Clean Sheet',
            value: playerStats.cleanSheet !== undefined ? playerStats.cleanSheet.toString() : ''
        },
        {
            id: 'yellowCard',
            stat: 'Yellow Card',
            value: playerStats.yellowCard !== undefined ? playerStats.yellowCard.toString() : ''
        },
        {
            id: 'redCard',
            stat: 'Red Card',
            value: playerStats.redCard !== undefined ? playerStats.redCard.toString() : ''
        },
        {
            id: 'motm',
            stat: 'MOTM',
            value: playerStats.manOfTheMatch !== undefined ? playerStats.manOfTheMatch.toString() : ''
        }
    ];
    return rows;
};

const EditPlayer = props => {
    const [playerTeam, setPlayerTeam] = useState('');
    const [playerToEdit, setPlayerToEdit] = useState('');
    const [week, setWeek] = useState('');

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

    console.log('player stats', props.playerStats);

    return (
        <div>
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
                <div className={props.styles.oldStatsHeader}>
                    Header
                </div>
                <Grid
                    columns={columns}
                    rows={generateRows(props.playerStats)}
                    showPagination={false}
                />
            </div>
        </div>
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
        goal: PropTypes.number,
        redCard: PropTypes.bool,
        yellowCard: PropTypes.bool,
        manOfTheMatch: PropTypes.bool
    }),
    styles: PropTypes.objectOf(PropTypes.string),
    teamsWithPlayers: PropTypes.objectOf(PropTypes.array)
};

const mapDispatchToProps = {
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
