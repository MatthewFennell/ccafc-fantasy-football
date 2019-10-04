import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import { Switch } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';

const Toggle = props => (
    <FormGroup row>
        <FormControlLabel
            control={(
                <Switch
                    checked={props.checked}
                    onChange={props.onChange}
                    disabled={props.disabled}
                    checkedIcon={<FiberManualRecordSharpIcon />}
                    icon={<FiberManualRecordSharpIcon />}
                    color={props.color}
                />
            )}
            label={props.label}
        />
    </FormGroup>
);

Toggle.propTypes = {
    checked: PropTypes.bool,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string
};

Toggle.defaultProps = {
    checked: false,
    color: 'primary',
    disabled: false,
    onChange: fp.noop,
    label: ''
};

export default Toggle;
