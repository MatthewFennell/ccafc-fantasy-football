import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fp from 'lodash/fp';
import defaultStyles from './EditPlayer.module.scss';
import { fetchTeamsRequest, fetchPlayersForTeamRequest, fetchPlayerStatsRequest } from '../actions';
import Dropdown from '../../common/dropdown/Dropdown';

const generateWeekOptions = maxGameWeek => {
    const options = [];
    for (let x = 0; x < maxGameWeek; x++) {
        options.push({
            id: x,
            text: x,
            value: x
        });
    }
    return options;
};

const EditPlayer = props => {
    const [playerTeam, setPlayerTeam] = useState('');
    const [playerToEdit, setPlayerToEdit] = useState('');
    const [week, setWeek] = useState(null);

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
              Hey
            </div>
        </div>
    );
};

EditPlayer.defaultProps = {
    allTeams: [],
    maxGameWeek: null,
    styles: defaultStyles,
    teamsWithPlayers: {}
};

EditPlayer.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    fetchPlayerStatsRequest: PropTypes.func.isRequired,
    fetchPlayersForTeamRequest: PropTypes.func.isRequired,
    fetchTeamsRequest: PropTypes.func.isRequired,
    maxGameWeek: PropTypes.number,
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
    teamsWithPlayers: state.admin.teamsWithPlayers
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPlayer);
