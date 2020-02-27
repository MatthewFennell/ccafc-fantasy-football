import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1)
        }
    }
}));

const TextInput = props => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                id="outlined-secondary"
                label={props.label}
                variant={props.type}
                color={props.color}
                onBlur={props.onBlur}
                onChange={props.onChange}
                disabled={props.disabled}
                value={props.value}
            />
        </form>
    );
};

TextInput.defaultProps = {
    color: 'primary',
    label: '',
    onBlur: noop,
    onChange: noop,
    type: 'outlined',
    disabled: false,
    value: ''
};

TextInput.propTypes = {
    color: PropTypes.string,
    label: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string
};

export default TextInput;
