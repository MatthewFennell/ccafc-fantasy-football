import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './Testing.module.scss';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import { createLeague, fetchLeagues, joinLeague } from './actions';
import * as selectors from './selectors';

const Testing = props => {
  const [leagueName, setLeagueName] = useState('');

  console.log('props', props.allLeagues);

  useEffect(() => {
    props.fetchLeagues();
  }, [props.fetchLeagues]);

  const makeLeague = useCallback(() => {
    props.createLeague(leagueName);
  }, [leagueName, props]);

  return (
    <div className={props.styles.testingWrapper}>
      <Button
        onClick={makeLeague}
        text="CreateLeague"
      />
      <div className={props.styles.textInputWrapper}>
        <TextInput onChange={setLeagueName} />
      </div>

      <div className={props.styles.allLeagues}>
      All leagues
        {props.allLeagues.map(league => (
          <div role="button" tabIndex={0} key={league.leagueName} onClick={() => props.joinLeague(league.id)}>
        League:
            {' '}
            {league.leagueName}
          </div>
        ))}
      </div>

      <div className={props.styles.myLeagues}>
        Leagues I am in
        {props.leaguesIAmIn.map(league => (
          <div key={league.leagueName}>
          League:
            {' '}
            {league.leagueName}
          </div>
        ))}

      </div>


    </div>
  );
};

Testing.defaultProps = {
  allLeagues: [],
  leaguesIAmIn: [],
  styles: defaultStyles
};

Testing.propTypes = {
  allLeagues: PropTypes.arrayOf(PropTypes.shape({})),
  createLeague: PropTypes.func.isRequired,
  fetchLeagues: PropTypes.func.isRequired,
  joinLeague: PropTypes.func.isRequired,
  leaguesIAmIn: PropTypes.arrayOf(PropTypes.shape({})),
  styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
  createLeague,
  fetchLeagues,
  joinLeague
};

const mapStateToProps = state => ({
  allLeagues: selectors.getAllLeagues(state),
  auth: state.firebase.auth,
  leaguesIAmIn: selectors.getLeagueIAmIn(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Testing);
