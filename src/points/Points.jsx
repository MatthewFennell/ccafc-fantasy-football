import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import classNames from 'classnames';
import fp from 'lodash/fp';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SuccessModal from '../common/modal/SuccessModal';
import Pitch from '../common/pitch/Pitch';
import * as appConstants from '../constants';
import { generatePointsRoute } from '../helperFunctions';
import materialStyles from '../materialStyles';
import { updateTeamNameRequest } from '../profile/actions';
import { getProfile } from '../profile/selectors';
import { fetchUserPointsForWeekRequest, fetchUserPointsForWeekRequestBackground } from './actions';
import defaultStyles from './Points.module.scss';
import PointsTable from './PointsTable/PointsTable';
import * as selectors from './selectors';
import activePlayerStyles from './ShirtStyles/ActivePlayer.module.scss';
import goalkeeperStyles from './ShirtStyles/Goalkeeper.module.scss';
import UserInfo from './UserInfo';

const Points = props => {
    const [playerModalOpen, setPlayerModalOpen] = useState(false);
    const [playerObj, setPlayerObj] = useState({});
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);
    const classes = makeStyles(materialStyles)();

    useEffect(() => {
        props.fetchUserPointsForWeekRequest(props.userId, props.currentGameWeek);
        // eslint-disable-next-line
    }, [props.userId, props.currentGameWeek, props.fetchUserPointsForWeekRequest]);

    const loadPreviousWeek = useCallback(() => {
        if (props.currentGameWeek > 1) {
            props.history.push(generatePointsRoute(props.userId, props.currentGameWeek - 1));
        }
    }, [props.history, props.currentGameWeek, props.userId]);

    const loadNextWeek = useCallback(() => {
        if (props.currentGameWeek < props.maxGameWeek) {
            props.history.push(generatePointsRoute(props.userId, props.currentGameWeek + 1));
        }
    }, [props.history, props.currentGameWeek, props.userId, props.maxGameWeek]);

    useEffect(() => {
        if (props.currentGameWeek > 1) {
            props.fetchUserPointsForWeekRequestBackground(props.userId, props.currentGameWeek - 1);
        }
        // eslint-disable-next-line
    }, [props.userId, props.currentGameWeek, props.fetchUserPointsForWeekRequestBackground]);

    const playerClick = useCallback(player => {
        setPlayerObj(player);
        setPlayerModalOpen(true);
    }, [setPlayerModalOpen, setPlayerObj]);

    const captainId = fp.get('player_id')(props.currentTeam.find(x => x.isCaptain));

    const pitch = (
        <Pitch
            additionalInfo={player => player.points}
            activeTeam={props.currentTeam}
            activePlayerStyles={activePlayerStyles}
            captain={captainId}
            goalkeeperStyles={goalkeeperStyles}
            loading={props.loading}
            isMaxHeight
            onPlayerClick={playerClick}
            renderEmptyPlayers
            showCaptain
        />
    );

    const arrowSection = isMobileApp => (
        <div className={props.styles.gameWeekText}>
            <div className={props.styles.arrowBackWrapper}>
                <ArrowBackIcon
                    color={props.currentGameWeek > 1 ? 'secondary' : 'disabled'}
                    onClick={loadPreviousWeek}
                    fontSize={isMobileApp ? 'default' : 'large'}
                />
            </div>
            <div className={props.styles.gameWeekTextWrapper}>
                {`Week ${props.currentGameWeek}`}
            </div>
            <div className={props.styles.arrowForwardWrapper}>
                <ArrowForwardIcon
                    color={props.currentGameWeek === props.maxGameWeek ? 'disabled' : 'secondary'}
                    onClick={loadNextWeek}
                    fontSize={isMobileApp ? 'default' : 'large'}
                />
            </div>
        </div>
    );

    return (
        <div className={props.styles.pitchWrapper}>
            {isMobile && (
                <>
                    {arrowSection(true)}
                    <div className={props.styles.currentTeamWrapper}>
                        {pitch}
                    </div>
                </>
            )}
            {!isMobile && (
                <div className={props.styles.desktopWrapper}>
                    <Paper
                        elevation={4}
                        className={classNames({
                            [classes.paper]: !isMobile,
                            [classes.maxWidth]: true
                        })}
                    >
                        {pitch}
                    </Paper>
                    <Paper
                        elevation={4}
                        className={classNames({
                            [classes.paper]: !isMobile,
                            [classes.thirtyWidth]: true
                        })}
                    >
                        {arrowSection(false)}
                        <UserInfo
                            displayName={props.displayName}
                            fetchingDetails={props.fetchingDetails || props.loading}
                            photoUrl={props.photoUrl}
                            team={props.currentTeam}
                            teamName={props.teamName}
                            loggedInUser={props.auth.uid}
                            userBeingViewed={props.userId}
                            loggedInTeamName={props.profile.teamName}
                            updateTeamNameRequest={props.updateTeamNameRequest}
                            updatingTeamName={props.updatingTeamName}
                        />
                    </Paper>
                </div>
            )}
            <SuccessModal
                backdrop
                closeModal={() => setPlayerModalOpen(false)}
                error
                isOpen={playerModalOpen}
                headerMessage="Player Stats"
                toggleModal={() => setPlayerModalOpen(false)}
            >
                {playerObj.player_id
                    ? (
                        <div className={props.styles.modalWrapper}>
                            <PointsTable player={playerObj} />
                        </div>
                    ) : (
                        <div className={props.styles.noStats}>
                            Stats will appear here for real players
                        </div>
                    ) }
            </SuccessModal>
        </div>
    );
};

Points.defaultProps = {
    auth: {
        uid: ''
    },
    currentGameWeek: null,
    currentTeam: [],
    displayName: '',
    fetchingDetails: false,
    loading: false,
    maxGameWeek: null,
    photoUrl: '',
    profile: {
        displayName: '',
        email: '',
        teamName: ''
    },
    updatingTeamName: false,
    updateTeamNameRequest: fp.noop,
    styles: defaultStyles,
    teamName: '',
    userId: null
};

Points.propTypes = {
    auth: PropTypes.shape({
        uid: PropTypes.string
    }),
    currentGameWeek: PropTypes.number,
    currentTeam: PropTypes.arrayOf(PropTypes.shape({
        assists: PropTypes.number,
        cleanSheet: PropTypes.bool,
        goals: PropTypes.number,
        id: PropTypes.string,
        points: PropTypes.number,
        position: PropTypes.string,
        redCard: PropTypes.bool,
        team: PropTypes.string,
        yellowCard: PropTypes.bool
    })),
    displayName: PropTypes.string,
    fetchingDetails: PropTypes.bool,
    fetchUserPointsForWeekRequest: PropTypes.func.isRequired,
    fetchUserPointsForWeekRequestBackground: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    loading: PropTypes.bool,
    maxGameWeek: PropTypes.number,
    photoUrl: PropTypes.string,
    profile: PropTypes.shape({
        displayName: PropTypes.string,
        email: PropTypes.string,
        photoUrl: PropTypes.string,
        teamName: PropTypes.string
    }),
    updatingTeamName: PropTypes.bool,
    updateTeamNameRequest: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    teamName: PropTypes.string,
    userId: PropTypes.string
};

const mapDispatchToProps = {
    fetchUserPointsForWeekRequest,
    fetchUserPointsForWeekRequestBackground,
    updateTeamNameRequest
};

const mapStateToProps = (state, props) => ({
    auth: state.firebase.auth,
    currentGameWeek: selectors.getCurrentGameWeek(props),
    currentTeam: selectors.getCurrentInfo(state, props, 'team'),
    displayName: selectors.getUserDetailsProperty(state, props, 'displayName'),
    fetchingDetails: Boolean(selectors.getUserDetailsProperty(state, props, 'fetching')),
    loading: selectors.getCurrentInfo(state, props, 'fetching'),
    maxGameWeek: state.overview.maxGameWeek,
    profile: getProfile(state),
    updatingTeamName: state.profile.updatingTeamName,
    photoUrl: selectors.getUserDetailsProperty(state, props, 'photoUrl'),
    teamName: selectors.getUserDetailsProperty(state, props, 'teamName'),
    userId: selectors.getUserId(props)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Points));

export { Points as PointsUnconnected };
