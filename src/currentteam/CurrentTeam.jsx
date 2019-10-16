import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import defaultStyles from './CurrentTeam.module.scss';
import * as selectors from './selectors';
import { fetchActiveTeamRequest, makeCaptainRequest } from './actions';
import goalkeeperStyles from './ShirtStyles/Goalkeeper.module.scss';
import activePlayerStyles from './ShirtStyles/ActivePlayer.module.scss';
import Pitch from '../common/pitch/Pitch';
import ConfirmModal from '../common/modal/ConfirmModal';

const CurrentTeam = props => {
    useEffect(() => {
        props.fetchActiveTeamRequest(props.userId);
    }, [props.fetchActiveTeamRequest, props.userId]);

    const [playerModalOpen, setPlayerModalOpen] = useState(false);
    const [modalPlayer, setModalPlayer] = useState({});

    const onPlayerClick = useCallback(p => {
        setModalPlayer(p);
        setPlayerModalOpen(true);
    }, [modalPlayer, playerModalOpen]);

    const closeModal = useCallback(() => {
        setPlayerModalOpen(false);
        setModalPlayer({});
    }, [modalPlayer, playerModalOpen]);

    const submit = useCallback(() => {
        props.makeCaptainRequest(modalPlayer.player_id);
        setPlayerModalOpen(false);
        setModalPlayer({});
    }, [setModalPlayer, props.makeCaptainRequest, modalPlayer.player_id]);

    return (
        <div className={props.styles.pitchWrapper}>
            <div className={props.styles.currentTeamWrapper}>
                <Pitch
                    additionalInfo={player => player.team}
                    activeTeam={props.activeTeam}
                    activePlayerStyles={activePlayerStyles}
                    captain={props.captain}
                    loading={props.fetchingForUser}
                    goalkeeperStyles={goalkeeperStyles}
                    onPlayerClick={onPlayerClick}
                    renderEmptyPlayers
                    showCaptain
                />
            </div>
            <ConfirmModal
                cancel={closeModal}
                closeModal={closeModal}
                isOpen={playerModalOpen}
                submit={submit}
                text="Make captain?"
            />
        </div>
    );
};

CurrentTeam.defaultProps = {
    activeTeam: [],
    captain: '',
    fetchingForUser: false,
    styles: defaultStyles
};

CurrentTeam.propTypes = {
    activeTeam: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        position: PropTypes.string,
        team: PropTypes.string
    })),
    captain: PropTypes.string,
    fetchActiveTeamRequest: PropTypes.func.isRequired,
    fetchingForUser: PropTypes.bool,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    makeCaptainRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    userId: PropTypes.string.isRequired
};

const mapStateToProps = (state, props) => ({
    activeTeam: selectors.getActiveTeam(state, props),
    captain: selectors.getCurrentCaptain(state, props),
    fetchingForUser: selectors.getFetchingForUser(state, props),
    userId: selectors.getUserId(props)
});

const mapDispatchToProps = {
    fetchActiveTeamRequest,
    makeCaptainRequest
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CurrentTeam));
