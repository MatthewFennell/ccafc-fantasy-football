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

const sidebarLinks = [
    {
        title: 'Overview',
        redirect: '/overview',
        component: <DetailsIcon />
    },
    {
        title: 'Current Team',
        redirect: '/current-team',
        component: <PeopleAltIcon />
    }
];

const sidebarLinksTwo = [
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
        redirect: '/leagues',
        component: <LayersIcon />
    }
];

const SideList = props => (
    <div
        role="presentation"
        onClick={props.closeNavbar}
        onKeyDown={props.closeNavbar}
    >
        <List>
            {sidebarLinks.map(item => (
                <ListItem button key={item.title} onClick={() => props.redirect(item.redirect)}>
                    <ListItemIcon>{item.component}</ListItemIcon>
                    <ListItemText primary={item.title} />
                </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            {sidebarLinksTwo.map(item => (
                <ListItem button key={item.title} onClick={() => props.redirect(item.redirect)}>
                    <ListItemIcon>{item.component}</ListItemIcon>
                    <ListItemText primary={item.title} />
                </ListItem>
            ))}
        </List>
    </div>
);

SideList.defaultProps = {
    closeNavbar: noop,
    redirect: noop
};

SideList.propTypes = {
    closeNavbar: PropTypes.func,
    redirect: PropTypes.func
};


export default SideList;
