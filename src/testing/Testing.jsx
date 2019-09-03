import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import defaultStyles from './Testing.module.scss';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import { createLeague , fetchLeagues } from './actions';


const Testing = props => {
  const [leagueName, setLeagueName] = useState('');

  useEffect(() => {
    props.fetchLeagues();
  }, [props.fetchLeagues]);

  const makeLeague = useCallback(() => {
    props.createLeague(leagueName);
  }, [leagueName, props]);

  // console.log('props', Object.values(props.leagues));

  return (
    <div className={props.styles.testingWrapper}>
      <Button
        onClick={makeLeague}
        text="CreateLeague"
      />
      <div className={props.styles.textInputWrapper}>
        <TextInput onChange={setLeagueName} />
      </div>

      {Object.values(props.leagues).map(league => (
        <div key={league.leagueName}>
      Name:
          {' '}
          {league.leagueName}
        </div>
      ))}

    </div>
  );
};

Testing.defaultProps = {
  leagues: {},
  styles: defaultStyles
};

Testing.propTypes = {
  createLeague: PropTypes.func.isRequired,
  fetchLeagues: PropTypes.func.isRequired,
  leagues: PropTypes.objectOf(PropTypes.shape({})),
  styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
  createLeague,
  fetchLeagues
};

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    leagues: state.firestore.data.leagues || {}
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'leagues' }
  ])
)(Testing);
