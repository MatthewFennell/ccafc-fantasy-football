/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import LoadingDiv from '../../common/loadingDiv/LoadingDiv';
import StyledButton from '../../common/StyledButton/StyledButton';
import * as textInputConstants from '../../common/TextInput/constants';
import TextInput from '../../common/TextInput/TextInput';
import materialStyles from '../../materialStyles';
import defaultStyles from './SelectProfilePicture.module.scss';

const SelectProfilePicture = props => {
    const classes = makeStyles(materialStyles)();
    const [ownPhotoUrl, setOwnPhotoUrl] = useState(props.currentPhotoUrl);

    const updateImage = useCallback(photoUrl => {
        if (photoUrl !== props.currentPhotoUrl) {
            props.updateProfilePicture(photoUrl);
        }
        // eslint-disable-next-line
    }, [props.updateProfilePicture, setOwnPhotoUrl, props.currentPhotoUrl]);

    return (
        <Paper
            elevation={4}
            className={classes.paper}
        >
            <div className={props.styles.selectAvatar}>
                Select your own avatar
            </div>
            <div className={props.styles.potentialPicturesWrapper}>
                {props.potentialPictures.filter(photoUrl => Boolean(photoUrl)).map(photoUrl => (
                    <div className={props.styles.imageWrapper} key={photoUrl}>
                        <div
                            className={classNames({
                                [props.styles.activeAvatar]: true,
                                [props.styles.hidden]: props.currentPhotoUrl !== photoUrl
                            })}
                        >
                            Active Avatar
                        </div>
                        <LoadingDiv
                            isLoading={photoUrl === props.photoUrlBeingUpdated}
                            isBorderRadius
                        >
                            <img
                                className={classNames({
                                    [props.styles.profilePicture]: true,
                                    [props.styles.borderProfile]: props.currentPhotoUrl !== photoUrl
                                })}
                                onClick={() => updateImage(photoUrl)}
                                src={photoUrl}
                                alt="new"
                            />
                        </LoadingDiv>
                    </div>
                ))}
            </div>
            <div className={props.styles.selectOwnPictureWrapper}>
                <div className={props.styles.uploadOwnIconMessage}>
                    Upload your own avatar
                </div>
                <div className={props.styles.ownPictureOptions}>
                    <div className={props.styles.enterOwnUrl}>
                        <TextInput
                            onChange={setOwnPhotoUrl}
                            value={ownPhotoUrl}
                            label="Enter the URL of your own image"
                            icon={textInputConstants.textInputIcons.face}
                            iconColor="secondary"
                        />
                        <div className={props.styles.infoText}>
                            The image to the right is what your avatar will look like.
                            You can often get the URL by
                            clicking
                            <i> Copy Image Address </i>
                            on Google
                        </div>
                    </div>
                    <div className={props.styles.ownImageExample}>
                        <img
                            className={props.styles.exampleImage}
                            src={ownPhotoUrl}
                            alt="new"
                        />
                        <div>
                            <StyledButton
                                color="primary"
                                onClick={() => updateImage(ownPhotoUrl)}
                                text="Change my icon"
                                disabled={Boolean(props.photoUrlBeingUpdated)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    );
};

SelectProfilePicture.defaultProps = {
    currentPhotoUrl: '',
    photoUrlBeingUpdated: '',
    potentialPictures: [],
    styles: defaultStyles,
    updateProfilePicture: noop
};

SelectProfilePicture.propTypes = {
    currentPhotoUrl: PropTypes.string,
    photoUrlBeingUpdated: PropTypes.string,
    potentialPictures: PropTypes.arrayOf(PropTypes.string),
    styles: PropTypes.objectOf(PropTypes.string),
    updateProfilePicture: PropTypes.func
};

export default SelectProfilePicture;
