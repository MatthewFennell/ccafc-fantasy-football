import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';
import Menu from '@material-ui/core/Menu';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as routes from '../routes';
import * as appConstants from '../constants';
import defaultStyles from './TopNavbar.module.scss';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
        '&:focus': {
            background: 'none',
            outline: '0px'
        },
        '&:hover': {
            backgroundColor: '#5c6bc0'
        }
    },
    userProfile: {
        '&:focus': {
            backgroundColor: 'transparent',
            outline: '0px'
        },
        '&:hover': {
            backgroundColor: '#5c6bc0'
        }
    }
}));

const TopNavbar = props => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const redirectOnClick = useCallback(val => {
        setAnchorEl(null);
        props.redirect(val);
        // eslint-disable-next-line
    }, [props.redirect, setAnchorEl, anchorEl]);

    const linksToRender = props.isSignedIn ? routes.signedInLinks : routes.signedOutLinks;

    const onItemClick = useCallback(item => {
        props.redirect(item.path(props));
    }, [props]);

    const availableAdminRoutes = routes.adminLinks.filter(route => props.userPermissions
        .includes(route.permissionRequired));

    console.log('disabled pages', props.disabledPages);

    return (
        <AppBar
            className={props.styles.topNavbar}
        >
            <Toolbar>
                {(availableAdminRoutes.length > 0 || isMobile)
                && (
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={props.toggleNavbar}
                    >
                        <MenuIcon />
                    </IconButton>
                ) }
                <Typography variant="h6" className={classes.title}>
                    <div className={props.styles.titleWrapper}>
                        CCAFC
                    </div>
                </Typography>

                {!isMobile && (
                    <List className={props.styles.navbarRoutes}>
                        {linksToRender.filter(x => !props.disabledPages.includes(x.title))
                            .map(item => (
                                <ListItem
                                    button
                                    key={item.title}
                                    onClick={() => onItemClick(item)}
                                    className={classNames({
                                        [props.styles.activeRoute]: props.currentPath
                                            .includes(item.urlIncludes)
                                    })}
                                >
                                    {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                                    <ListItemText primary={item.title} />
                                </ListItem>
                            ))}
                    </List>
                ) }
                <div className={props.styles.navbarIcon}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        className={classes.userProfile}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={open}
                        onClose={handleClose}
                    >

                        {props.auth.uid ? (
                            <div>
                                {props.auth.emailVerified
                                && (
                                    <MenuItem onClick={() => redirectOnClick(
                                        appConstants.URL.PROFILE
                                    )}
                                    >
                                        My account
                                    </MenuItem>
                                ) }
                                <MenuItem onClick={props.signOut}>Sign out</MenuItem>
                            </div>
                        ) : (
                            <div>
                                <MenuItem onClick={() => redirectOnClick(appConstants.URL.SIGN_IN)}>
                                    Sign in
                                </MenuItem>
                                <MenuItem onClick={() => redirectOnClick(
                                    appConstants.URL.SIGN_UP
                                )}
                                >
                                    Sign up
                                </MenuItem>
                                <MenuItem onClick={() => redirectOnClick(
                                    appConstants.URL.RESET_PASSWORD
                                )}
                                >
                                    Forgot password?
                                </MenuItem>
                            </div>
                        )}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

TopNavbar.defaultProps = {
    auth: {},
    currentPath: '',
    disabledPages: [],
    isSignedIn: false,
    redirect: noop,
    signOut: noop,
    styles: defaultStyles,
    toggleNavbar: noop,
    userPermissions: []
};

TopNavbar.propTypes = {
    auth: PropTypes.shape({
        uid: PropTypes.string,
        emailVerified: PropTypes.bool
    }),
    currentPath: PropTypes.string,
    disabledPages: PropTypes.arrayOf(PropTypes.string),
    isSignedIn: PropTypes.bool,
    redirect: PropTypes.func,
    signOut: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    toggleNavbar: PropTypes.func,
    userPermissions: PropTypes.arrayOf(PropTypes.string)
};

export default TopNavbar;
