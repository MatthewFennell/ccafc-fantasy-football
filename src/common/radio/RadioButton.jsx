import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1)
    }
}));

const RadioButton = props => {
    const classes = useStyles();

    const onChange = event => {
        console.log('yes');
        props.onChange(event.target.value);
    };

    return (
        <div>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{props.label}</FormLabel>
                <RadioGroup
                    aria-label={props.label}
                    name={props.label}
                    value={props.value}
                    onChange={onChange}
                >
                    {props.options.map(option => (
                        <FormControlLabel
                            value={option.label}
                            control={<Radio color="primary" />}
                            label={option.label}
                        />
                    ))}
                </RadioGroup>
            </FormControl>

        </div>
    );
};

RadioButton.defaultProps = {
    onChange: noop,
    label: '',
    options: [],
    value: ''
};

RadioButton.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string
    })),
    value: PropTypes.string
};


export default RadioButton;
