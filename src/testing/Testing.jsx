import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import defaultStyles from './Testing.module.scss';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import { createLeague } from './actions';

const Testing = props => {
  const [leagueName, setLeagueName] = useState('');

  const makeLeague = useCallback(() => {
    props.createLeague(leagueName);
  }, [leagueName, props]);

  console.log('props', Object.values(props.leagues));

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
        <div>
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
  leagues: PropTypes.arrayOf(PropTypes.shape({
    leagueName: PropTypes.string
  })),
  styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
  createLeague
};

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    leagues: state.firestore.data.leagues
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'leagues' }
  ])
)(Testing);
