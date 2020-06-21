/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './LinkAccounts.module.scss';
import GoogleImage from '../../common/images/google-image.jpg';
import FacebookImage from '../../common/images/facebook-image.jpg';

const LinkAccounts = props => (
    <div className={props.styles.linkAccountsWrapper}>
        <div className={props.styles.facebookLinkWrapper}>
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
        <div className={props.styles.googleLinkWrapper}>
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
    </div>
);

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
