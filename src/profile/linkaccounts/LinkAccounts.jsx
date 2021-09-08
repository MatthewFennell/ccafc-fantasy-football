/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import FacebookImage from '../../common/images/facebook-image.jpg';
import GoogleImage from '../../common/images/google-image.jpg';
import materialStyles from '../../materialStyles';
import defaultStyles from './LinkAccounts.module.scss';

const LinkAccounts = props => {
    const classes = makeStyles(materialStyles)();
    return (
        <div className={props.styles.linkAccountsWrapper}>
            <Paper
                elevation={4}
                className={classes.paperNoPadding}
            >
                <div className={classNames({
                    [props.styles.facebookLinkWrapper]: true,
                    [props.styles.clickFacebook]: !props.isSignedInWithFacebook
                })}
                >
                    <div
                        className={props.styles.facebookLinkMessage}
                        onClick={props.linkProfileToFacebook}
                        role="button"
                        tabIndex={0}
                    >
                        {props.isSignedInWithFacebook ? 'You have linked your Facebook account ' : 'Link your Facebook account'}
                    </div>
                    <div className={props.styles.facebookLinkImage}>
                        <img alt="Facebook" className={props.styles.facebookImage} src={FacebookImage} onClick={props.linkProfileToFacebook} />
                    </div>
                </div>
            </Paper>
            <Paper
                elevation={4}
                className={classes.paperNoPadding}
            >
                <div className={classNames({
                    [props.styles.googleLinkWrapper]: true,
                    [props.styles.clickGoogle]: !props.isSignedInWithGoogle
                })}
                >
                    <div
                        className={props.styles.googleLinkMessage}
                        onClick={props.linkProfileToGoogle}
                        role="button"
                        tabIndex={0}
                    >
                        {props.isSignedInWithGoogle ? 'You have linked your Google account ' : 'Link your Google account'}
                    </div>
                    <div className={props.styles.googleLinkImage}>
                        <img alt="Google" className={props.styles.googleImage} src={GoogleImage} onClick={props.linkProfileToGoogle} />
                    </div>
                </div>
            </Paper>
        </div>
    );
};

LinkAccounts.propTypes = {
    isSignedInWithFacebook: PropTypes.bool,
    isSignedInWithGoogle: PropTypes.bool,
    linkProfileToFacebook: PropTypes.func,
    linkProfileToGoogle: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

LinkAccounts.defaultProps = {
    isSignedInWithFacebook: false,
    isSignedInWithGoogle: false,
    linkProfileToFacebook: noop,
    linkProfileToGoogle: noop,
    styles: defaultStyles
};

export default LinkAccounts;
