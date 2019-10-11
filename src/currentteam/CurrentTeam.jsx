import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import defaultStyles from './CurrentTeam.module.scss';
import * as selectors from './selectors';
import { fetchActiveTeamRequest } from './actions';
import Player from '../common/player/Player';
import goalkeeperStyles from './ShirtStyles/Goalkeeper.module.scss';
import activePlayerStyles from './ShirtStyles/ActivePlayer.module.scss';
import Spinner from '../common/spinner/Spinner';

const CurrentTeam = props => {
    useEffect(() => {
        props.fetchActiveTeamRequest(props.userId);
    }, [props.fetchActiveTeamRequest, props.userId]);

    const renderPlayers = (position, styles) => props.activeTeam
        .filter(player => player.position === position).map(player => (
            <Player
                additionalInfo={player.team}
                name={player.name}
                shirtStyles={styles}
                size="3x"
                key={player.name}
            />
        ));

    return (
        <div className={props.styles.currentTeamWrapper}>
            <div className={props.styles.pitchBackground}>
                {props.fetchingForUser ? (
                    <div className={props.styles.loadingSpinner}>
                        <Spinner color="secondary" />
                    </div>
                )
                    : (
                        <>
                            <div className={props.styles.goalKeepers}>
                                {renderPlayers('GOALKEEPER', goalkeeperStyles)}
                            </div>
                            <div className={props.styles.defenders}>
                                {renderPlayers('DEFENDER', activePlayerStyles)}
                            </div>
                            <div className={props.styles.midfielders}>
                                {renderPlayers('MIDFIELDER', activePlayerStyles)}
                            </div>

                            <div className={props.styles.attackers}>
                                {renderPlayers('ATTACKER', activePlayerStyles)}
                            </div>
                        </>
                    )}
            </div>
        </div>
    );
};

CurrentTeam.defaultProps = {
    activeTeam: [],
    styles: defaultStyles
};

CurrentTeam.propTypes = {
    activeTeam: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        position: PropTypes.string,
        team: PropTypes.string
    })),
    fetchActiveTeamRequest: PropTypes.func.isRequired,
    fetchingForUser: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    userId: PropTypes.string.isRequired
};

const mapStateToProps = (state, props) => ({
    activeTeam: selectors.getActiveTeam(state, props),
    fetchingForUser: selectors.getFetchingForUser(state, props),
    userId: selectors.getUserId(props)
});

const mapDispatchToProps = {
    fetchActiveTeamRequest
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CurrentTeam));
