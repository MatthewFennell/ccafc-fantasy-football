import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

const sidebarLinks = [
    {
        title: 'Join Game',
        redirect: '/join-game',
        component: <FlashOnIcon />
    },
    {
        title: 'Create Game',
        redirect: '/create-game',
        component: <ShuffleIcon />
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
            {['All mail', 'Trash', 'Spam'].map(text => (
                <ListItem button key={text}>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary={text} />
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
