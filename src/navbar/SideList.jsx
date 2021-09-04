import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classNames from 'classnames';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import * as constants from '../constants';
import * as routes from '../routes';
import defaultStyles from './SideList.module.scss';

const SideList = props => {
    const linksToRender = props.isSignedIn ? routes.signedInLinks : routes.signedOutLinks;

    const onItemClick = useCallback(item => {
        props.redirect(item.path(props));
    }, [props]);

    const isMobile = useMediaQuery(`(max-width:${constants.mobileScreenSize}px)`);

    return (
        <div
            role="presentation"
            onClick={props.closeNavbar}
            onKeyDown={props.closeNavbar}
        >
            {isMobile && (
                <List>
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
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItem>
                        ))}
                </List>
            ) }
            <>
                <Divider />
                <List>
                    {!isMobile && (
                        <ListItem
                            key="Disabled"
                        >
                            <ListItemText primary="Admin Pages" />
                        </ListItem>
                    )}
                    {routes.adminLinks.filter(route => props.userPermissions
                        .includes(route.permissionRequired))
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
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItem>
                        ))}
                </List>
            </>
        </div>
    );
};

SideList.defaultProps = {
    closeNavbar: noop,
    currentPath: '',
    disabledPages: [],
    isSignedIn: false,
    redirect: noop,
    styles: defaultStyles,
    userPermissions: []
};

SideList.propTypes = {
    closeNavbar: PropTypes.func,
    currentPath: PropTypes.string,
    disabledPages: PropTypes.arrayOf(PropTypes.string),
    isSignedIn: PropTypes.bool,
    redirect: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    userPermissions: PropTypes.arrayOf(PropTypes.string)
};

export default SideList;
