/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './SelectProfilePicture.module.scss';

const SelectProfilePicture = props => (
    <div className={props.styles.selectProfilePictureWrapper}>
        {props.potentialPictures.map(x => (
            <div className={props.styles.imageWrapper}>
                <img
                    className={props.styles.profilePicture}
                    onClick={() => props.updateProfilePicture(x)}
                    src={x}
                    alt="new"
                />
            </div>
        ))}
    </div>
);

SelectProfilePicture.defaultProps = {
    potentialPictures: [],
    styles: defaultStyles,
    updateProfilePicture: noop
};

SelectProfilePicture.propTypes = {
    potentialPictures: PropTypes.arrayOf(PropTypes.string),
    styles: PropTypes.objectOf(PropTypes.string),
    updateProfilePicture: PropTypes.func
};

export default SelectProfilePicture;
