import Switch from '@material-ui/core/Switch';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const CustomSwitch = props => (
    <Switch
        checked={props.checked}
        onChange={e => props.onChange(e.target.checked)}
        disabled={props.disabled}
        color={props.color}
    />
);

CustomSwitch.propTypes = {
    checked: PropTypes.bool,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
};

CustomSwitch.defaultProps = {
    checked: false,
    color: 'primary',
    disabled: false,
    onChange: noop
};

export default CustomSwitch;
