import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import StyledInput from '../common/StyledInput/StyledInput';
import inputOverrideStyles from './InputOverride.module.scss';
import StyledButton from '../common/StyledButton/StyledButton';
import defaultStyles from './CreateLeague.module.scss';

const CreateLeague = props => (
    <div className={props.styles.createLeagueWrapper}>
        <StyledInput label="League Name" onChange={props.setLeagueName} styles={inputOverrideStyles} />
        <StyledInput label="Start Week" onChange={props.setStartWeek} styles={inputOverrideStyles} type="number" />
        <StyledButton
            color="primary"
            onClick={props.onCreate}
            text="Create"
            type="submit"
        />
    </div>
);

CreateLeague.defaultProps = {
    onCreate: noop,
    setLeagueName: noop,
    setStartWeek: noop,
    styles: defaultStyles
};

CreateLeague.propTypes = {
    onCreate: PropTypes.func,
    setLeagueName: PropTypes.func,
    setStartWeek: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default CreateLeague;
