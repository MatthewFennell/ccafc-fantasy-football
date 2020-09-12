import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { fetchFixturesRequest } from '../fixtures/actions';
import defaultStyles from './CurrentTeam.module.scss';
import * as selectors from './selectors';
import {
    fetchActiveTeamRequest, makeCaptainRequest, setPlayerModalOpen,
    setCaptainToUpdate
} from './actions';
import goalkeeperStyles from './ShirtStyles/Goalkeeper.module.scss';
import activePlayerStyles from './ShirtStyles/ActivePlayer.module.scss';
import Pitch from '../common/pitch/Pitch';
import ConfirmModal from '../common/modal/ConfirmModal';
import SuccessModal from '../common/modal/SuccessModal';
import Summary from './components/Summary';
import NextMatch from './components/NextMatch';
import * as appConstants from '../constants';
import materialStyles from '../materialStyles';

const CurrentTeam = props => {
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);
    const classes = makeStyles(materialStyles)();

    useEffect(() => {
        props.fetchActiveTeamRequest(props.userId);
        // eslint-disable-next-line
    }, [props.fetchActiveTeamRequest, props.userId]);

    const [emptyPlayerOpen, setEmptyPlayerOpen] = useState(false);
    const [modalPlayer, setModalPlayer] = useState({});

    const makePlayerCaptain = useCallback(() => {
        props.makeCaptainRequest(props.captainToUpdate);
        // eslint-disable-next-line
    }, [ props.makeCaptainRequest, props.captainToUpdate])

    const onPlayerClick = useCallback(p => {
        const { position, ...rest } = p;
        if (!_.isEmpty(rest)) {
            setModalPlayer(p);
            props.setPlayerModalOpen(true);
        } else {
            setEmptyPlayerOpen(true);
        }
        // eslint-disable-next-line
    }, [props.setPlayerModalOpen, setEmptyPlayerOpen]);

    const closeEmptyPlayerModal = useCallback(() => {
        setEmptyPlayerOpen(false);
    }, [setEmptyPlayerOpen]);

    const closeModal = useCallback(() => {
        props.setPlayerModalOpen(false);
        setModalPlayer({});
        // eslint-disable-next-line
    }, [setModalPlayer]);

    const submit = useCallback(() => {
        props.makeCaptainRequest(modalPlayer.id);
        setModalPlayer({});
        // eslint-disable-next-line
    }, [setModalPlayer, props.makeCaptainRequest, modalPlayer.id]);

    return (
        <div className={props.styles.pitchWrapper}>
            {isMobile && (
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
            )}
            {!isMobile && (
                <div className={props.styles.desktopWrapper}>
                    <Paper
                        elevation={4}
                        className={classNames({
                            [classes.paper]: true,
                            [classes.maxWidth]: true
                        })}
                    >
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
                    </Paper>
                    <Paper
                        elevation={4}
                        className={classNames({
                            [classes.paper]: true,
                            [classes.thirtyWidth]: true
                        })}
                    >
                        <Summary
                            captain={props.captain}
                            captainToUpdate={props.captainToUpdate}
                            isUpdatingCaptain={props.isUpdatingCaptain}
                            loading={props.fetchingForUser}
                            players={props.activeTeam}
                            makePlayerCaptain={makePlayerCaptain}
                            setCaptainToUpdate={props.setCaptainToUpdate}
                        />

                        <NextMatch
                            fetchFixturesRequest={props.fetchFixturesRequest}
                            fixtures={props.fixtures}
                            loadingFixtures={props.loadingFixtures}
                            players={props.activeTeam}
                        />
                    </Paper>

                </div>
            )}
            <ConfirmModal
                cancel={closeModal}
                closeModal={closeModal}
                isButtonsDisabled={props.isUpdatingCaptain && !props.captainToUpdate}
                isLoading={props.isUpdatingCaptain && !props.captainToUpdate}
                isOpen={props.isPlayerModalOpen}
                submit={submit}
                text="Make captain?"
            />
            <SuccessModal
                closeModal={closeEmptyPlayerModal}
                isOpen={emptyPlayerOpen}
                cancel={closeEmptyPlayerModal}
                headerMessage="Go to the transfers page to make your team"
            />
        </div>
    );
};

CurrentTeam.defaultProps = {
    activeTeam: [],
    captain: '',
    captainToUpdate: '',
    fetchingForUser: false,
    fixtures: [],
    loadingFixtures: false,
    isUpdatingCaptain: false,
    styles: defaultStyles,
    userId: ''
};

CurrentTeam.propTypes = {
    activeTeam: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        position: PropTypes.string,
        team: PropTypes.string
    })),
    captain: PropTypes.string,
    captainToUpdate: PropTypes.string,
    fetchActiveTeamRequest: PropTypes.func.isRequired,
    fetchFixturesRequest: PropTypes.func.isRequired,
    fetchingForUser: PropTypes.bool,
    fixtures: PropTypes.arrayOf(PropTypes.shape({

    })),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    loadingFixtures: PropTypes.bool,
    isPlayerModalOpen: PropTypes.bool.isRequired,
    isUpdatingCaptain: PropTypes.bool,
    makeCaptainRequest: PropTypes.func.isRequired,
    setCaptainToUpdate: PropTypes.func.isRequired,
    setPlayerModalOpen: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    userId: PropTypes.string
};

const mapStateToProps = (state, props) => ({
    activeTeam: selectors.getFieldForUser(state, props, 'players'),
    captain: selectors.getFieldForUser(state, props, 'captain'),
    captainToUpdate: state.currentTeam.captainToUpdate,
    isPlayerModalOpen: state.currentTeam.isPlayerModalOpen,
    isUpdatingCaptain: state.currentTeam.isUpdatingCaptain,
    loadingFixtures: state.fixtures.loadingFixtures,
    fetchingForUser: selectors.getFieldForUser(state, props, 'fetching'),
    fixtures: state.fixtures.fixtures,
    userId: selectors.getUserId(props)
});

const mapDispatchToProps = {
    fetchActiveTeamRequest,
    fetchFixturesRequest,
    makeCaptainRequest,
    setPlayerModalOpen,
    setCaptainToUpdate
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CurrentTeam));

export { CurrentTeam as CurrentTeamUnconnected };
