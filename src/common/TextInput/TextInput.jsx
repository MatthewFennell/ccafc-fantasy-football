import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SearchIcon from '@material-ui/icons/Search';
import FaceIcon from '@material-ui/icons/Face';
import { noop } from 'lodash';
import * as constants from './constants';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%'
        }
    }
}));

const generateIcon = Icon => (
    <InputAdornment position="start">
        <Icon />
    </InputAdornment>
);

const iconMapping = {
    [constants.textInputIcons.user]: generateIcon(AccountCircle),
    [constants.textInputIcons.email]: generateIcon(EmailIcon),
    [constants.textInputIcons.lock]: generateIcon(LockIcon),
    [constants.textInputIcons.football]: generateIcon(SportsSoccerIcon),
    [constants.textInputIcons.money]: generateIcon(AttachMoneyIcon),
    [constants.textInputIcons.search]: generateIcon(SearchIcon),
    [constants.textInputIcons.face]: generateIcon(FaceIcon)
};

const TextInput = props => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                id="outlined-secondary"
                label={props.label}
                variant={props.variant}
                type={props.type}
                color={props.color}
                onBlur={props.onBlur}
                onChange={e => props.onChange(e.target.value)}
                disabled={props.disabled}
                value={props.value}
                InputProps={{
                    startAdornment: iconMapping[props.icon]
                }}
            />
        </form>
    );
};

TextInput.defaultProps = {
    color: 'primary',
    icon: null,
    label: '',
    onBlur: noop,
    onChange: noop,
    variant: 'outlined',
    disabled: false,
    type: '',
    value: ''
};

TextInput.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    variant: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string
};

export default TextInput;
