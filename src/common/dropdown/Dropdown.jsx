import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

const useStyles = makeStyles(theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    }
}));

const Dropdopwn = props => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleChange = event => {
        props.onChange(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <form autoComplete="off">
            <FormControl className={classes.formControl}>
                <InputLabel
                    htmlFor="demo-controlled-open-select"
                >
                    {props.title}
                </InputLabel>
                <Select
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={props.activeValue}
                    onChange={handleChange}
                    inputProps={{
                        id: 'demo-controlled-open-select'
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {props.options.map(entry => (
                        <MenuItem
                            key={entry.id}
                            value={entry.value}
                        >
                            {entry.text}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </form>
    );
};

Dropdopwn.defaultProps = {
    activeValue: '',
    onChange: noop,
    options: [],
    title: ''
};

Dropdopwn.propTypes = {
    activeValue: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
        text: PropTypes.string
    })),
    title: PropTypes.string
};

export default Dropdopwn;
