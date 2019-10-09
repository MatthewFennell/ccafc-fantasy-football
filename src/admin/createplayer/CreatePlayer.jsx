import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './CreatePlayer.module.scss';
import StyledInput from '../../common/StyledInput/StyledInput';
import Dropdown from '../../common/dropdown/Dropdown';
import { closeCreatePlayerError, createPlayerRequest, fetchTeamsRequest } from '../actions';
import * as selectors from '../selectors';
import StyledButton from '../../common/StyledButton/StyledButton';
import ErrorModal from '../../common/modal/ErrorModal';

const options = [
    { value: 'GOALKEEPER', text: 'Goalkeeper', id: 'GOALKEEPER' },
    { value: 'DEFENDER', text: 'Defender', id: 'DEFENDER' },
    { value: 'MIDFIELDER', text: 'Midfielder', id: 'MIDFIELDER' },
    { value: 'ATTACKER', text: 'Attacker', id: 'ATTACKER' }
];

const CreatePlayer = props => {
    const [playerName, setPlayerName] = useState('');
    const [playerPrice, setPlayerPrice] = useState('');
    const [playerPosition, setPlayerPosition] = useState('');
    const [playerTeam, setPlayerTeam] = useState('');

    useEffect(() => {
        props.fetchTeamsRequest();
    }, [props.fetchTeamsRequest]);

    const createPlayer = useCallback(() => {
        props.createPlayerRequest(playerName, playerPrice, playerPosition, playerTeam);
    }, [playerName, playerPrice, playerPosition, playerTeam, props.createPlayerRequest]);

    return (
        <div className={props.styles.createPlayerWrapper}>
            <div className={props.styles.createPlayerHeader}>
                <StyledButton
                    color="primary"
                    onClick={createPlayer}
                    text="Create Player"
                />
            </div>
            <div className={props.styles.createPlayerForm}>
                <StyledInput label="Name" onChange={setPlayerName} />
                <StyledInput label="Price" onChange={setPlayerPrice} type="number" />
                <div className={props.styles.createPlayerDropdowns}>
                    <Dropdown activeValue={playerPosition} onChange={setPlayerPosition} options={options} title="Position" />
                    <Dropdown activeValue={playerTeam} onChange={setPlayerTeam} options={props.allTeams} title="Team" />
                </div>
            </div>
            <ErrorModal
                closeModal={props.closeCreatePlayerError}
                headerMessage="Create Player Error"
                isOpen={props.createPlayerError.length > 0}
                errorCode={props.createPlayerErrorCode}
                errorMessage={props.createPlayerError}
            />
        </div>
    );
};

CreatePlayer.defaultProps = {
    allTeams: [],
    styles: defaultStyles
};

CreatePlayer.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    closeCreatePlayerError: PropTypes.func.isRequired,
    createPlayerError: PropTypes.string.isRequired,
    createPlayerErrorCode: PropTypes.string.isRequired,
    createPlayerRequest: PropTypes.func.isRequired,
    fetchTeamsRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    closeCreatePlayerError,
    createPlayerRequest,
    fetchTeamsRequest
};

const mapStateToProps = state => ({
    allTeams: selectors.getAllTeams(state),
    createPlayerError: selectors.getCreatePlayerError(state),
    createPlayerErrorCode: selectors.getCreatePlayerErrorCode(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlayer);