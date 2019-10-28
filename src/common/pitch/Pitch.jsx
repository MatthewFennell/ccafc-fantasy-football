import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './Pitch.module.scss';
import Player from '../player/Player';
import Spinner from '../spinner/Spinner';
import defaultActivePlayerStyles from './ActivePlayer.module.scss';
import defaultGoalkeeperStyles from './Goalkeeper.module.scss';
import inactivePlayerStyles from './InactivePlayer.module.scss';

const Pitch = props => {
    const renderPlayers = (position, styles) => props.activeTeam
        .filter(player => player.position === position).map(player => (
            <Player
                additionalInfo={props.additionalInfo(player)}
                isCaptain={props.captain === player.player_id}
                name={player.name}
                onClick={() => props.onPlayerClick(player)}
                shirtStyles={player.inactive === true ? inactivePlayerStyles : styles}
                showCaptain={props.showCaptain}
                size="4x"
                key={player.name}
            />
        ));

    const renderEmptyPlayer = (position, maxPlayers) => {
        const players = [];
        const numInPos = props.activeTeam.filter(x => x.position === position).length;
        for (let x = numInPos; x < maxPlayers; x++) {
            players.push(<Player
                additionalInfo=""
                name="No player selected"
                onClick={() => props.onPlayerClick(position)}
                shirtStyles={inactivePlayerStyles}
                size="4x"
                key={x}
            />);
        }
        return players;
    };

    return (
        <div className={props.styles.pitchBackground}>
            {props.loading ? (
                <div className={props.styles.loadingSpinner}>
                    <Spinner color="secondary" />
                </div>
            )
                : (
                    <>
                        <div className={props.styles.goalKeepers}>
                            {renderPlayers('GOALKEEPER', props.goalkeeperStyles)}
                            {props.renderEmptyPlayers && renderEmptyPlayer('GOALKEEPER', 1)}
                        </div>
                        <div className={props.styles.defenders}>
                            {renderPlayers('DEFENDER', props.activePlayerStyles)}
                            {/* {props.renderEmptyPlayers && renderEmptyPlayer('DEFENDER', 4)} */}
                        </div>
                        <div className={props.styles.midfielders}>
                            {renderPlayers('MIDFIELDER', props.activePlayerStyles)}
                            {props.renderEmptyPlayers && renderEmptyPlayer('MIDFIELDER', 4)}
                        </div>

                        <div className={props.styles.attackers}>
                            {renderPlayers('ATTACKER', props.activePlayerStyles)}
                            {props.renderEmptyPlayers && renderEmptyPlayer('ATTACKER', 2)}
                        </div>
                    </>
                )}
        </div>
    );
};

Pitch.defaultProps = {
    activePlayerStyles: defaultActivePlayerStyles,
    activeTeam: [],
    additionalInfo: noop,
    captain: '',
    goalkeeperStyles: defaultGoalkeeperStyles,
    loading: false,
    onPlayerClick: noop,
    renderEmptyPlayers: false,
    showCaptain: false,
    styles: defaultStyles
};

Pitch.propTypes = {
    activePlayerStyles: PropTypes.objectOf(PropTypes.string),
    activeTeam: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        position: PropTypes.string,
        team: PropTypes.string
    })),
    additionalInfo: PropTypes.func,
    captain: PropTypes.string,
    goalkeeperStyles: PropTypes.objectOf(PropTypes.string),
    loading: PropTypes.bool,
    onPlayerClick: PropTypes.func,
    renderEmptyPlayers: PropTypes.bool,
    showCaptain: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default Pitch;
