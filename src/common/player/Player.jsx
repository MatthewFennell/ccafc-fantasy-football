import React from 'react';
import PropTypes from 'prop-types';
import { MDBIcon } from 'mdbreact';
import { noop } from 'lodash';
import defaultStyles from './Player.module.scss';
import defaultShirtStyles from './ShirtStyles.module.scss';

const Player = props => (
    <div className={props.styles.playerWrapper} onClick={props.onClick} role="button" tabIndex={0}>
        <div className={props.styles.hover}>
            <div>
                <MDBIcon icon="tshirt" size={props.size} className={props.shirtStyles.shirt} />
            </div>
            <div className={props.styles.playerInfoWrapper}>
                <div className={props.styles.nameText}>
                    {props.name}
                </div>
                <div className={props.styles.additionalInfo}>
                    {props.additionalInfo}
                </div>
            </div>
        </div>
    </div>
);

Player.defaultProps = {
    additionalInfo: '',
    name: '',
    onClick: noop,
    shirtStyles: defaultShirtStyles,
    size: '3x',
    styles: defaultStyles
};

Player.propTypes = {
    additionalInfo: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    name: PropTypes.string,
    onClick: PropTypes.func,
    shirtStyles: PropTypes.objectOf(PropTypes.string),
    size: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default Player;

// colors - https://mdbootstrap.com/docs/react/css/colors/#text-colors
