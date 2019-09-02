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

  return (
    <div className={props.styles.testingWrapper}>
      <Button
        onClick={makeLeague}
        text="CreateLeague"
      />
      <div className={props.styles.textInputWrapper}>
        <TextInput onChange={setLeagueName} />
      </div>
    </div>
  );
};

Testing.defaultProps = {
  styles: defaultStyles
};

Testing.propTypes = {
  createLeague: PropTypes.func.isRequired,
  styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
  createLeague
};

const mapStateToProps = {

};

export default compose(
  firestoreConnect(() => ['leagues']), // sync todos collection from Firestore into redux
  connect(null, mapDispatchToProps)
)(Testing);
