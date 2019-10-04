import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './Leagues.module.scss';
import { fetchLeaguesRequest } from './actions';
import * as selectors from './selectors';

const Leagues = props => {
    console.log('leagues');

    console.log('state', props);
    useEffect(() => {
        props.fetchLeaguesRequest();
    }, props.fetchLeaguesRequest);

    return (
        <div className={props.styles.leaguesWrapper}>
            Leagues
            <div className={props.styles.myLeaguesWrapper}>
                My Leagues
            </div>

        </div>
    );
};

Leagues.defaultProps = {
    styles: defaultStyles
};

Leagues.propTypes = {
    fetchLeaguesRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    fetchLeaguesRequest
};

const mapStateToProps = state => (
    {
        leagues: selectors.getLeagues(state)
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Leagues);
