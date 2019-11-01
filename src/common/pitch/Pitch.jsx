/* eslint-disable max-len */
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
    const numberOfSpareSpots = position => {
        const numAttIHaveToAdd = Math.max(1 - props.activeTeam.filter(x => x.position === 'ATTACKER').length, 0);
        const numMidIHaveToAdd = Math.max(3 - props.activeTeam.filter(x => x.position === 'MIDFIELDER').length, 0);
        const numDefIHaveToAdd = Math.max(3 - props.activeTeam.filter(x => x.position === 'DEFENDER').length, 0);
        const numGkIHaveToAdd = Math.max(1 - props.activeTeam.filter(x => x.position === 'GOALKEEPER').length, 0);

        if (position === 'ATTACKER') {
            return 11 - props.activeTeam.filter(x => !x.inactive).length - numMidIHaveToAdd - numDefIHaveToAdd - numGkIHaveToAdd;
        }
        if (position === 'MIDFIELDER') {
            return 11 - props.activeTeam.filter(x => !x.inactive).length - numAttIHaveToAdd - numDefIHaveToAdd - numGkIHaveToAdd;
        }
        if (position === 'DEFENDER') {
            return 11 - props.activeTeam.filter(x => !x.inactive).length - numAttIHaveToAdd - numMidIHaveToAdd - numGkIHaveToAdd;
        }
        return 11 - props.activeTeam.filter(x => !x.inactive).length - numAttIHaveToAdd - numMidIHaveToAdd - numDefIHaveToAdd;
    };

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

    const calculateToRender = (maxInRow, pos) => {
        const numInRow = props.activeTeam.filter(x => x.position === pos).length;
        const numSpareSpots = numberOfSpareSpots(pos);
        const numToRender = Math.min(maxInRow - numInRow, numSpareSpots);
        const players = [];
        for (let x = 0; x < numToRender; x++) {
            players.push(<Player
                additionalInfo=""
                name="No player selected"
                onClick={() => props.onPlayerClick({ position: pos })}
                shirtStyles={inactivePlayerStyles}
                size="4x"
                key={x}
            />);
        }
        return players;
    };

    calculateToRender(3, 'ATTACKER');
    calculateToRender(5, 'MIDFIELDER');
    calculateToRender(5, 'DEFENDER');
    calculateToRender(1, 'GOALKEEPER');

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
                            {calculateToRender(props.maxInPos.GOALKEEPER, 'GOALKEEPER')}
                        </div>
                        <div className={props.styles.defenders}>
                            {renderPlayers('DEFENDER', props.activePlayerStyles)}
                            {calculateToRender(props.maxInPos.DEFENDER, 'DEFENDER')}
                        </div>
                        <div className={props.styles.midfielders}>
                            {renderPlayers('MIDFIELDER', props.activePlayerStyles)}
                            {calculateToRender(props.maxInPos.MIDFIELDER, 'MIDFIELDER')}
                        </div>

                        <div className={props.styles.attackers}>
                            {renderPlayers('ATTACKER', props.activePlayerStyles)}
                            {calculateToRender(props.maxInPos.ATTACKER, 'ATTACKER')}
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
    maxInPos: {
        GOALKEEPER: 1,
        DEFENDER: 4,
        MIDFIELDER: 4,
        ATTACKER: 2
    },
    onPlayerClick: noop,
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
    maxInPos: PropTypes.shape({
        GOALKEEPER: PropTypes.number,
        DEFENDER: PropTypes.number,
        MIDFIELDER: PropTypes.number,
        ATTACKER: PropTypes.number
    }),
    onPlayerClick: PropTypes.func,
    showCaptain: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default Pitch;
