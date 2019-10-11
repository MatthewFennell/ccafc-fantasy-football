import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import defaultStyles from './CurrentTeam.module.scss';
import * as selectors from './selectors';
import { fetchActiveTeamRequest } from './actions';
import Player from '../common/player/Player';
import ShirtStyles from './ShirtStyles.module.scss';

const CurrentTeam = props => {
    useEffect(() => {
        props.fetchActiveTeamRequest(props.userId);
    }, [props.fetchActiveTeamRequest, props.userId]);

    return (
        <div className={props.styles.currentTeamWrapper}>
            <div className={props.styles.pitchBackground}>
                <div className={props.styles.goalKeepers}>
                    <Player name="De Bruyne" shirtStyles={ShirtStyles} />
                </div>
                <div className={props.styles.defenders}>
                    <Player name="De Bruyne" shirtStyles={ShirtStyles} />
                    <Player name="De Bruyne" shirtStyles={ShirtStyles} />
                    <Player name="De Bruyne" shirtStyles={ShirtStyles} />
                    <Player name="De Bruyne" shirtStyles={ShirtStyles} />
                    <Player name="De Bruyne" shirtStyles={ShirtStyles} />
                </div>
                <div className={props.styles.midfielders}>
                    <Player name="De Bruyne" shirtStyles={ShirtStyles} />
                    <Player name="De Bruyne" shirtStyles={ShirtStyles} />
                    {/* <Player name="De Bruyne" shirtStyles={ShirtStyles} /> */}
                    <Player name="De Bruyne" shirtStyles={ShirtStyles} />
                    <Player name="De Bruyne" shirtStyles={ShirtStyles} />
                </div>

                <div className={props.styles.attackers}>
                    <Player name="De Bruyne" shirtStyles={ShirtStyles} />
                    <Player name="De Bruyne" shirtStyles={ShirtStyles} />
                </div>
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
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    userId: PropTypes.string.isRequired
};

const mapStateToProps = (state, props) => ({
    activeTeam: selectors.getActiveTeam(state, props),
    userId: selectors.getUserId(props)
});

const mapDispatchToProps = {
    fetchActiveTeamRequest
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CurrentTeam));
