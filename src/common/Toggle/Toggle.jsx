import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import { Switch } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import defaultStyles from './Toggle.module.scss';

const Toggle = props => (

    <FormGroup row className={props.styles.formGroupToggle}>
        <div className={props.styles.wrapper}>
            <FormControlLabel
                className={props.styles.toggleLabel}
                control={(
                    <Switch
                        checked={props.checked}
                        onChange={props.onChange}
                        disabled={props.disabled}
                        checkedIcon={<FiberManualRecordSharpIcon />}
                        icon={<FiberManualRecordSharpIcon />}
                        color={props.color}
                        className={props.styles.switch}
                    />
                )}
                label={props.label}
            />
        </div>
    </FormGroup>
);

Toggle.propTypes = {
    checked: PropTypes.bool,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string)
};

Toggle.defaultProps = {
    checked: false,
    color: 'primary',
    disabled: false,
    onChange: fp.noop,
    label: '',
    styles: defaultStyles
};

export default Toggle;
