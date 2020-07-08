import React, { useState, useCallback } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import classNames from 'classnames';
import * as routes from '../routes';
import defaultStyles from './SideList.module.scss';
import { MyContext } from '../Context';
import SuccessModal from '../common/modal/SuccessModal';
import { teamsAreDifferent } from '../transfers/helpers';
import * as constants from '../constants';
import StyledButton from '../common/StyledButton/StyledButton';

const SideList = props => {
    const linksToRender = props.isSignedIn ? routes.signedInLinks : routes.signedOutLinks;
    const [isUnsavedChangeOpen, setIsUnsavedChangesOpen] = useState(false);

    const [itemToRouteTo, setItemToRouteTo] = useState(null);

    const onItemClick = useCallback(item => {
        const unsavedChanges = teamsAreDifferent(props.originalTeam, props.currentTeam);

        if (props.currentPath === constants.URL.TRANSFERS && unsavedChanges) {
            setItemToRouteTo(item);
            setIsUnsavedChangesOpen(true);
        } else {
            props.redirect(item.path(props));
        }
    }, [props]);

    const closeModal = useCallback(() => {
        setIsUnsavedChangesOpen(false);
        setItemToRouteTo(null);
    }, [setIsUnsavedChangesOpen, setItemToRouteTo]);

    const continueWithRouting = useCallback(() => {
        props.redirect(itemToRouteTo.path(props));
        setIsUnsavedChangesOpen(false);
    }, [props, itemToRouteTo]);

    return (
        <MyContext.Consumer>
            {context => (
                <>
                    <div
                        role="presentation"
                        onClick={props.closeNavbar}
                        onKeyDown={props.closeNavbar}
                    >
                        <List>
                            {linksToRender.filter(x => !context.disabledPages.includes(x.title))
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
                        <>
                            <Divider />
                            <List>
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
                    <SuccessModal
                        backdrop
                        closeModal={closeModal}
                        isOpen={isUnsavedChangeOpen}
                        headerMessage="Unsaved Changes"
                        toggleModal={closeModal}
                    >
                        <div className={props.styles.modalWrapper}>
                            <div className={props.styles.unsavedChangesMessage}>
                                {'You have unsaved changes. The changes will maintain if you leave this page (but don\'t refresh), but you will still need to save them'}

                            </div>

                            <div className={props.styles.confirmButtonsWrapper}>
                                <StyledButton
                                    text="Continue"
                                    onClick={continueWithRouting}
                                />
                                <StyledButton
                                    text="Cancel"
                                    onClick={closeModal}
                                    color="secondary"
                                />
                            </div>
                        </div>
                    </SuccessModal>
                </>
            )}
        </MyContext.Consumer>
    );
};

SideList.defaultProps = {
    closeNavbar: noop,
    currentPath: '',
    currentTeam: [],
    isSignedIn: false,
    originalTeam: [],
    redirect: noop,
    styles: defaultStyles,
    userPermissions: []
};

SideList.propTypes = {
    closeNavbar: PropTypes.func,
    currentTeam: PropTypes.arrayOf(PropTypes.shape({})),
    currentPath: PropTypes.string,
    isSignedIn: PropTypes.bool,
    originalTeam: PropTypes.arrayOf(PropTypes.shape({})),
    redirect: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    userPermissions: PropTypes.arrayOf(PropTypes.string)
};

export default SideList;
