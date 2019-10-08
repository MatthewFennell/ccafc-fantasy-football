import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import StyledInput from '../common/StyledInput/StyledInput';
import inputOverrideStyles from './styles/InputOverride.module.scss';
import StyledButton from '../common/StyledButton/StyledButton';
import defaultStyles from './styles/LeagueForm.module.scss';

const JoinLeague = props => (
    <div className={props.styles.joinLeagueWrapper}>
        <StyledInput label="League Name" onChange={props.setLeagueName} styles={inputOverrideStyles} />
        <StyledButton
            color="primary"
            onClick={props.onJoin}
            text="Join"
            type="submit"
        />
    </div>
);

JoinLeague.defaultProps = {
    onJoin: noop,
    setLeagueName: noop,
    styles: defaultStyles
};

JoinLeague.propTypes = {
    onJoin: PropTypes.func,
    setLeagueName: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default JoinLeague;
