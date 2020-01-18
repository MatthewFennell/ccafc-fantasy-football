import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './FixtureFilters.module.scss';
import RadioButton from '../../common/radio/RadioButton';
import Toggle from '../../common/Toggle/Toggle';
import StyledInput from '../../common/StyledInput/StyledInput';

const FixtureFilters = props => (
    <>
        <RadioButton
            radioLabel="Filter"
            onChange={props.setRadioValue}
            options={props.radioOptions}
            value={props.radioValue}
        />
        <div className={props.styles.extraFilters}>
            <div className={props.styles.collingwoodOnly}>
                <div>
                    Collingwood Only
                </div>
                <div>
                    <Toggle
                        color="primary"
                        checked={props.collingwoodOnly}
                        onChange={props.toggleCollingwoodOnly}
                    />
                </div>
            </div>
            <div className={props.styles.collingwoodOnly}>
                <div>
                    Upcoming Matches Only
                </div>
                <div>
                    <Toggle
                        color="primary"
                        checked={props.upcomingMatchesOnly}
                        onChange={props.toggleUpcomingOnly}
                    />
                </div>
            </div>
            <div className={props.styles.searchByName}>
                <StyledInput label="Team Name" onChange={props.searchByTeamName} value={props.teamNameFilter} />
            </div>
        </div>
    </>
);

FixtureFilters.defaultProps = {
    collingwoodOnly: false,
    radioOptions: [],
    radioValue: '',
    searchByTeamName: noop,
    setRadioValue: noop,
    styles: defaultStyles,
    teamNameFilter: '',
    toggleCollingwoodOnly: noop,
    toggleUpcomingOnly: noop,
    upcomingMatchesOnly: false
};

FixtureFilters.propTypes = {
    collingwoodOnly: PropTypes.bool,
    radioOptions: PropTypes.arrayOf(PropTypes.shape({
        radioLabel: PropTypes.string,
        value: PropTypes.string
    })),
    radioValue: PropTypes.string,
    searchByTeamName: PropTypes.func,
    setRadioValue: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    teamNameFilter: PropTypes.string,
    toggleCollingwoodOnly: PropTypes.func,
    toggleUpcomingOnly: PropTypes.func,
    upcomingMatchesOnly: PropTypes.bool
};

export default FixtureFilters;
