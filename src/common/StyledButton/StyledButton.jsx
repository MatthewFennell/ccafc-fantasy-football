import React from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { red, indigo } from '@material-ui/core/colors';
import { noop } from 'lodash';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1)
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: indigo[500]
        },
        secondary: {
            main: red[500]
        }
    }
});

const StyledButton = props => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Button
                variant="contained"
                color={props.color}
                className={classes.margin}
                onClick={props.onClick}
                type={props.type}
            >
                {props.text}
            </Button>
        </ThemeProvider>
    );
};


StyledButton.defaultProps = {
    color: 'primary',
    onClick: noop,
    text: 'Button',
    type: ''
};

StyledButton.propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string,
    type: PropTypes.string
};

export default StyledButton;
