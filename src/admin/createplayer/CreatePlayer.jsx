import React, { useState } from 'react';
import PropTypes from 'prop-types';
import defaultStyles from './CreatePlayer.module.scss';
import StyledInput from '../../common/StyledInput/StyledInput';
import Dropdown from '../../common/dropdown/Dropdown';

const CreatePlayer = props => {
    const [playerName, setPlayerName] = useState('');
    const [playerPrice, setPlayerPrice] = useState('');
    return (
        <div className={props.styles.createPlayerWrapper}>
            <div className={props.styles.createPlayerHeader}>
            Create Player
            </div>
            <div className={props.styles.createPlayerForm}>
                <StyledInput label="Name" onChange={setPlayerName} />
                <StyledInput label="Price" onChange={setPlayerPrice} type="number" />
                <Dropdown />
            </div>

        </div>
    );
};

CreatePlayer.defaultProps = {
    styles: defaultStyles
};

CreatePlayer.propTypes = {
    styles: PropTypes.objectOf(PropTypes.string)
};

export default CreatePlayer;
