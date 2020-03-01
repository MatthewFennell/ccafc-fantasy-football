import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(4)
    }
}));

const Fade = props => {
    const classes = useStyles();

    return (
        <>
            <FormControlLabel
                control={(
                    <Switch
                        checked={props.checked}
                        onChange={props.onChange}
                        color={props.switchColor}
                    />
                )}
                label={props.label}
            />
            <Collapse in={props.checked}>
                <Paper elevation={4} className={classes.paper}>
                    {props.children}
                </Paper>
            </Collapse>
        </>
    );
};

Fade.defaultProps = {
    checked: false,
    children: null,
    label: 'Show',
    onChange: noop,
    switchColor: 'primary'
};

Fade.propTypes = {
    checked: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    label: PropTypes.string,
    onChange: PropTypes.func,
    switchColor: PropTypes.string
};

export default Fade;
