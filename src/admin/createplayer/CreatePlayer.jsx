import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Dropdown from '../../common/dropdown/Dropdown';
import defaultStyles from './CreatePlayer.module.scss';
import {
    createPlayerRequest, fetchTeamsRequest
} from '../actions';
import StyledButton from '../../common/StyledButton/StyledButton';
import Spinner from '../../common/spinner/Spinner';
import TextInput from '../../common/TextInput/TextInput';
import * as textInputConstants from '../../common/TextInput/constants';
import materialStyles from '../../materialStyles';
import * as appConstants from '../../constants';

const options = [
    { value: 'GOALKEEPER', text: 'Goalkeeper', id: 'GOALKEEPER' },
    { value: 'DEFENDER', text: 'Defender', id: 'DEFENDER' },
    { value: 'MIDFIELDER', text: 'Midfielder', id: 'MIDFIELDER' },
    { value: 'ATTACKER', text: 'Attacker', id: 'ATTACKER' }
];

const CreatePlayer = props => {
    const classes = makeStyles(materialStyles)();
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);
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

    return (
        <Paper
            elevation={4}
            className={classNames({
                [classes.paper]: !isMobile,
                [classes.paperMobile]: isMobile
            })}
        >
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
                [props.styles.spinner]: true,
                [props.styles.hidden]: !props.creatingPlayer
            })}
            >
                <Spinner color="secondary" />
            </div>
        </Paper>
    );
};

CreatePlayer.defaultProps = {
    allTeams: [],
    styles: defaultStyles
};

CreatePlayer.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    creatingPlayer: PropTypes.bool.isRequired,
    createPlayerRequest: PropTypes.func.isRequired,
    fetchTeamsRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    createPlayerRequest,
    fetchTeamsRequest
};

const mapStateToProps = state => ({
    allTeams: state.admin.allTeams,
    creatingPlayer: state.admin.creatingPlayer
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlayer);

export { CreatePlayer as CreatePlayerUnconnected };
