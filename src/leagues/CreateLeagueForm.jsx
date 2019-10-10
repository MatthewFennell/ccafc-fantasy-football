import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import StyledInput from '../common/StyledInput/StyledInput';
import inputOverrideStyles from './styles/InputOverride.module.scss';
import StyledButton from '../common/StyledButton/StyledButton';
import defaultStyles from './styles/LeagueForm.module.scss';

const CreateLeague = props => (
    <div className={props.styles.createLeagueWrapper}>
        <StyledInput label="League Name" onChange={props.setLeagueName} styles={inputOverrideStyles} value={props.leagueName} />
        <StyledInput label="Start Week" onChange={props.setStartWeek} styles={inputOverrideStyles} type="number" value={props.startWeek} />
        <StyledButton
            color="primary"
            onClick={props.onCreate}
            text="Create"
            type="submit"
        />
    </div>
);

CreateLeague.defaultProps = {
    leagueName: '',
    onCreate: noop,
    setLeagueName: noop,
    setStartWeek: noop,
    startWeek: 0,
    styles: defaultStyles
};

CreateLeague.propTypes = {
    leagueName: PropTypes.string,
    onCreate: PropTypes.func,
    setLeagueName: PropTypes.func,
    setStartWeek: PropTypes.func,
    startWeek: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default CreateLeague;
