import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { noop } from 'lodash';
import defaultStyles from './CreatePlayer.module.scss';
import Dropdown from '../../common/dropdown/Dropdown';
import {
    createPlayerRequest, fetchTeamsRequest, closeSuccessMessage
} from '../actions';
import StyledButton from '../../common/StyledButton/StyledButton';
import Spinner from '../../common/spinner/Spinner';
import SuccessModal from '../../common/modal/SuccessModal';
import TextInput from '../../common/TextInput/TextInput';
import * as textInputConstants from '../../common/TextInput/constants';
import Switch from '../../common/Switch/Switch';

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
    const [previousScore, setPreviousScore] = useState(0);

    useEffect(() => {
        props.fetchTeamsRequest();
        // eslint-disable-next-line
    }, [props.fetchTeamsRequest]);

    const createPlayer = useCallback(() => {
        props.createPlayerRequest(playerName, playerPosition,
            playerPrice, playerTeam, previousScore);
        // eslint-disable-next-line
    }, [playerName, playerPrice, playerPosition, playerTeam,
        props.createPlayerRequest, previousScore]);

    const [suppressPopup, setSuppressPopup] = useState(false);

    const toggleSuppressPopup = useCallback(() => {
        setSuppressPopup(!suppressPopup);
    }, [suppressPopup, setSuppressPopup]);

    return (
        <>
            <div className={props.styles.createPlayerWrapper}>
                <div className={props.styles.createPlayerHeader}>
                    <StyledButton
                        color="primary"
                        onClick={createPlayer}
                        text="Create Player"
                        disabled={!playerName
                            || !playerPosition
                            || !playerTeam
                            || (!playerPrice && playerPrice !== 0) || props.creatingPlayer}
                    />
                </div>
                <div className={props.styles.createPlayerForm}>
                    <TextInput
                        label="Name"
                        onChange={setPlayerName}
                        value={playerName}
                        icon={textInputConstants.textInputIcons.user}
                        iconColor="primary"
                    />
                    <TextInput
                        label="Price"
                        onChange={setPlayerPrice}
                        type="number"
                        value={playerPrice}
                        icon={textInputConstants.textInputIcons.money}
                        iconColor="primary"
                    />
                    <div className={props.styles.createPlayerDropdowns}>
                        <Dropdown value={playerPosition} onChange={setPlayerPosition} options={options} title="Position" />
                        <Dropdown value={playerTeam} onChange={setPlayerTeam} options={props.allTeams} title="Team" />
                        <TextInput
                            label="Previous Score"
                            onChange={setPreviousScore}
                            type="number"
                            value={previousScore.toString()}
                        />
                    </div>
                </div>

                <div className={classNames({
                    [props.styles.hidden]: !props.creatingPlayer
                })}
                >
                    <Spinner color="secondary" />
                </div>
                <div className={props.styles.suppressPopupWrapper}>
                    <div className={props.styles.suppressMessage}>
                        Suppress popup
                    </div>
                    <Switch
                        onChange={toggleSuppressPopup}
                        checked={suppressPopup}
                    />
                </div>
            </div>
            <SuccessModal
                backdrop
                closeModal={props.closeSuccessMessage}
                isOpen={props.successMessage.length > 0 && !suppressPopup}
                isSuccess
                headerMessage={props.successMessage}
                toggleModal={noop}
            />
        </>
    );
};

CreatePlayer.defaultProps = {
    allTeams: [],
    styles: defaultStyles,
    successMessage: ''
};

CreatePlayer.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    closeSuccessMessage: PropTypes.func.isRequired,
    creatingPlayer: PropTypes.bool.isRequired,
    createPlayerRequest: PropTypes.func.isRequired,
    fetchTeamsRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    successMessage: PropTypes.string
};

const mapDispatchToProps = {
    createPlayerRequest,
    closeSuccessMessage,
    fetchTeamsRequest
};

const mapStateToProps = state => ({
    allTeams: state.admin.allTeams,
    creatingPlayer: state.admin.creatingPlayer,
    successMessage: state.admin.successMessage
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlayer);

export { CreatePlayer as CreatePlayerUnconnected };
