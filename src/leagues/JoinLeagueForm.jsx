import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import StyledButton from '../common/StyledButton/StyledButton';
import TextInput from '../common/TextInput/TextInput';
import inputOverrideStyles from './styles/InputOverride.module.scss';
import defaultStyles from './styles/LeagueForm.module.scss';

const JoinLeague = props => (
    <div className={props.styles.joinLeagueWrapper}>
        <div className={props.styles.textInputWrapper}>
            <TextInput
                label="League Name"
                onChange={props.setLeagueName}
                styles={inputOverrideStyles}
                value={props.leagueNameToJoin}
                onSubmit={props.onJoin}
            />
        </div>
        <StyledButton
            color="primary"
            onClick={props.onJoin}
            text="Join"
            type="submit"
            disabled={!props.leagueNameToJoin}
        />
    </div>
);

JoinLeague.defaultProps = {
    leagueNameToJoin: '',
    onJoin: noop,
    setLeagueName: noop,
    styles: defaultStyles
};

JoinLeague.propTypes = {
    leagueNameToJoin: PropTypes.string,
    onJoin: PropTypes.func,
    setLeagueName: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default JoinLeague;
