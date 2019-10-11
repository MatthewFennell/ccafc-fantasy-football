import React from 'react';
import PropTypes from 'prop-types';
import { MDBIcon } from 'mdbreact';
import defaultStyles from './Player.module.scss';
import defaultShirtStyles from './ShirtStyles.module.scss';


const Player = props => {
    console.log('player');
    return (
        <div className={props.styles.playerWrapper}>
            <div>
                <MDBIcon icon="tshirt" size={props.size} className={props.shirtStyles.shirt} />
            </div>
            <div className={props.styles.playerInfoWrapper}>
                <div className={props.styles.nameText}>
                    {props.name}
                </div>
                <div className={props.styles.additionalInfo}>
                  Test
                </div>
            </div>
        </div>
    );
};

Player.defaultProps = {
    name: '',
    shirtStyles: defaultShirtStyles,
    size: '3x',
    styles: defaultStyles,
    team: ''
};

Player.propTypes = {
    name: PropTypes.string,
    shirtStyles: PropTypes.string,
    size: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string),
    team: PropTypes.string
};

export default Player;

// colors - https://mdbootstrap.com/docs/react/css/colors/#text-colors
