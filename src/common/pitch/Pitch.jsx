import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './Pitch.module.scss';
import Player from '../player/Player';
import Spinner from '../spinner/Spinner';
import defaultActivePlayerStyles from './ActivePlayer.module.scss';
import defaultGoalkeeperStyles from './Goalkeeper.module.scss';

const Pitch = props => {
    const renderPlayers = (position, styles) => props.activeTeam
        .filter(player => player.position === position).map(player => (
            <Player
                additionalInfo={props.additionalInfo(player)}
                name={player.name}
                shirtStyles={styles}
                size="3x"
                key={player.name}
            />
        ));

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
                        </div>
                        <div className={props.styles.defenders}>
                            {renderPlayers('DEFENDER', props.activePlayerStyles)}
                        </div>
                        <div className={props.styles.midfielders}>
                            {renderPlayers('MIDFIELDER', props.activePlayerStyles)}
                        </div>

                        <div className={props.styles.attackers}>
                            {renderPlayers('ATTACKER', props.activePlayerStyles)}
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
    goalkeeperStyles: defaultGoalkeeperStyles,
    loading: false,
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
    goalkeeperStyles: PropTypes.objectOf(PropTypes.string),
    loading: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default Pitch;
