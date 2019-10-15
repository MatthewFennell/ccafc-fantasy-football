import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import defaultStyles from './CurrentTeam.module.scss';
import * as selectors from './selectors';
import { fetchActiveTeamRequest } from './actions';
import goalkeeperStyles from './ShirtStyles/Goalkeeper.module.scss';
import activePlayerStyles from './ShirtStyles/ActivePlayer.module.scss';
import Pitch from '../common/pitch/Pitch';

const CurrentTeam = props => {
    useEffect(() => {
        props.fetchActiveTeamRequest(props.userId);
    }, [props.fetchActiveTeamRequest, props.userId]);

    return (
        <div className={props.styles.currentTeamWrapper}>
            <Pitch
                additionalInfo={player => player.team}
                activeTeam={props.activeTeam}
                activePlayerStyles={activePlayerStyles}
                loading={props.fetchingForUser}
                goalkeeperStyles={goalkeeperStyles}
                renderEmptyPlayers
            />
        </div>
    );
};

CurrentTeam.defaultProps = {
    activeTeam: [],
    fetchingForUser: false,
    styles: defaultStyles
};

CurrentTeam.propTypes = {
    activeTeam: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        position: PropTypes.string,
        team: PropTypes.string
    })),
    fetchActiveTeamRequest: PropTypes.func.isRequired,
    fetchingForUser: PropTypes.bool,
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
