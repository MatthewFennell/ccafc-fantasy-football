import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import fp from 'lodash/fp';
import defaultStyles from './Points.module.scss';
import * as selectors from './selectors';
import { fetchUserPointsForWeekRequest, fetchUserPointsForWeekRequestBackground } from './actions';
import Pitch from '../common/pitch/Pitch';
import activePlayerStyles from './ShirtStyles/ActivePlayer.module.scss';
import goalkeeperStyles from './ShirtStyles/Goalkeeper.module.scss';
import StyledModal from '../common/modal/StyledModal';
import PointsTable from './PointsTable/PointsTable';
import { generatePointsRoute } from '../helperFunctions';

const Points = props => {
    const [playerModalOpen, setPlayerModalOpen] = useState(false);
    const [playerObj, setPlayerObj] = useState({});

    useEffect(() => {
        props.fetchUserPointsForWeekRequest(props.userId, props.currentGameWeek);
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
    }, [props.userId, props.currentGameWeek, props.fetchUserPointsForWeekRequestBackground]);

    const playerClick = useCallback(player => {
        setPlayerObj(player);
        setPlayerModalOpen(true);
        console.log('player', player);
    }, [playerModalOpen, playerObj, setPlayerModalOpen, setPlayerObj]);

    const captainId = fp.get('player_id')(props.currentPoints.find(x => x.isCaptain));

    return (
        <div className={props.styles.pageWrapper}>
            <div className={props.styles.gameWeekWrapper}>
                <div className={props.styles.gameWeekText}>
                    <div className={props.styles.arrowBackWrapper}>
                        <ArrowBackIcon color={props.currentGameWeek > 1 ? 'secondary' : 'disabled'} onClick={loadPreviousWeek} />
                    </div>
                    <div className={props.styles.gameWeekTextWrapper}>
                        {`Gameweek ${props.currentGameWeek}`}
                    </div>
                    <div className={props.styles.arrowForwardWrapper}>
                        <ArrowForwardIcon color={props.currentGameWeek === props.maxGameWeek ? 'disabled' : 'secondary'} onClick={loadNextWeek} />
                    </div>
                </div>
            </div>
            <div className={props.styles.pointsWrapper}>
                <Pitch
                    additionalInfo={player => player.points}
                    activeTeam={props.currentPoints}
                    activePlayerStyles={activePlayerStyles}
                    captain={captainId}
                    goalkeeperStyles={goalkeeperStyles}
                    loading={props.loading}
                    onPlayerClick={playerClick}
                    renderEmptyPlayers
                    showCaptain
                />
            </div>
            <StyledModal
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
                        No stats for empty players
                        </div>
                    ) }
            </StyledModal>
        </div>
    );
};

Points.defaultProps = {
    currentGameWeek: null,
    currentPoints: [],
    loading: false,
    maxGameWeek: null,
    styles: defaultStyles,
    userId: null
};

Points.propTypes = {
    currentGameWeek: PropTypes.number,
    currentPoints: PropTypes.arrayOf(PropTypes.shape({
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
    fetchUserPointsForWeekRequest: PropTypes.func.isRequired,
    fetchUserPointsForWeekRequestBackground: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    loading: PropTypes.bool,
    maxGameWeek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string),
    userId: PropTypes.string
};

const mapDispatchToProps = {
    fetchUserPointsForWeekRequest,
    fetchUserPointsForWeekRequestBackground
};

const mapStateToProps = (state, props) => ({
    currentGameWeek: selectors.getCurrentGameWeek(props),
    currentPoints: selectors.getCurrentInfo(state, props, 'team'),
    loading: selectors.getCurrentInfo(state, props, 'fetching'),
    maxGameWeek: state.overview.maxGameWeek,
    userId: selectors.getUserId(props)
});

export default connect(mapStateToProps, mapDispatchToProps)(Points);
