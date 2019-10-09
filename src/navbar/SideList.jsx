import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import DetailsIcon from '@material-ui/icons/Details';
import GradeIcon from '@material-ui/icons/Grade';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LayersIcon from '@material-ui/icons/Layers';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import * as constants from '../constants';

const signedInLinks = [
    {
        title: 'Overview',
        redirect: constants.URL.OVERVIEW,
        component: <DetailsIcon />
    },
    {
        title: 'Current Team',
        redirect: '/current-team',
        component: <PeopleAltIcon />
    },
    {
        title: 'Transfers',
        redirect: '/transfers',
        component: <PersonAddIcon />
    },
    {
        title: 'Points',
        redirect: '/points',
        component: <GradeIcon />
    },
    {
        title: 'Leagues',
        redirect: constants.URL.LEAGUES,
        component: <LayersIcon />
    }
];

const signedOutLinks = [
    {
        title: 'Sign In',
        redirect: constants.URL.SIGN_IN,
        component: <DoubleArrowIcon />
    },
    {
        title: 'Sign Up',
        redirect: constants.URL.SIGN_UP,
        component: <AccountBoxIcon />
    }
];

const adminLinks = [
    {
        title: 'Create Player',
        redirect: constants.ADMIN_URL.CREATE_PLAYER,
        component: <PersonAddIcon />
    },
    {
        title: 'Create Team',
        redirect: constants.ADMIN_URL.CREATE_TEAM,
        component: <PersonAddIcon />
    }
];

const SideList = props => {
    const linksToRender = props.isSignedIn ? signedInLinks : signedOutLinks;
    return (
        <div
            role="presentation"
            onClick={props.closeNavbar}
            onKeyDown={props.closeNavbar}
        >
            <List>
                {linksToRender.map(item => (
                    <ListItem button key={item.title} onClick={() => props.redirect(item.redirect)}>
                        <ListItemIcon>{item.component}</ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
            {props.isAdmin && (
            <>
                <Divider />
                <List>
                    {adminLinks.map(item => (
                        <ListItem
                            button
                            key={item.title}
                            onClick={() => props.redirect(item.redirect)}
                        >
                            <ListItemIcon>{item.component}</ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    ))}
                </List>
            </>
            )}
        </div>
    );
};

SideList.defaultProps = {
    closeNavbar: noop,
    isAdmin: false,
    isSignedIn: false,
    redirect: noop
};

SideList.propTypes = {
    closeNavbar: PropTypes.func,
    isAdmin: PropTypes.bool,
    isSignedIn: PropTypes.bool,
    redirect: PropTypes.func
};


export default SideList;
