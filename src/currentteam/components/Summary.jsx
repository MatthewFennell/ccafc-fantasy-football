import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import noop from 'lodash';
import Dropdown from '../../common/dropdown/Dropdown';
import StyledButton from '../../common/StyledButton/StyledButton';
import defaultStyles from './Summary.module.scss';
import Spinner from '../../common/spinner/Spinner';
import LoadingDiv from '../../common/loadingDiv/LoadingDiv';

const findCaptainName = (players, captainId) => {
    const captain = players.find(p => p.id === captainId);
    return fp.get('name')(captain) || 'Not set';
};

const Summary = props => {
    const entry = (key, value) => (
        <div className={props.styles.detailWrapper}>
            <div className={props.styles.key}>
                {key}
            </div>
            <div className={props.styles.value}>
                {value}
            </div>
        </div>
    );

    return (
        props.loading
            ? (
                <div className={props.styles.loadingSpinner}>
                    <Spinner color="secondary" />
                </div>
            )
            : (
                <>
                    <div className={props.styles.summaryHeader}>
                        Summary
                    </div>
                    {entry('Captain', findCaptainName(props.players, props.captain))}
                    <div className={props.styles.captainWrapper}>
                        <Dropdown
                            value={props.captainToUpdate}
                            onChange={props.setCaptainToUpdate}
                            title="Update captain"
                            options={props.players.map(p => ({
                                id: p.id,
                                value: p.id,
                                text: p.name
                            }))}
                        />

                        <div className={props.styles.updateCaptainButton}>
                            <LoadingDiv
                                isLoading={Boolean(props.isUpdatingCaptain
                                    && props.captainToUpdate)}
                                isBorderRadius
                                isFitContent
                                isNoPadding
                            >
                                <StyledButton
                                    disabled={props.isUpdatingCaptain
                                    || !props.captainToUpdate
                                    || props.captainToUpdate === props.captain}
                                    onClick={props.makePlayerCaptain}
                                    text="Update captain"
                                />
                            </LoadingDiv>
                        </div>
                    </div>

                </>
            )
    );
};

Summary.defaultProps = {
    captain: '',
    captainToUpdate: '',
    isUpdatingCaptain: false,
    loading: false,
    makePlayerCaptain: noop,
    setCaptainToUpdate: noop,
    styles: defaultStyles,
    players: []
};

Summary.propTypes = {
    captain: PropTypes.string,
    captainToUpdate: PropTypes.string,
    isUpdatingCaptain: PropTypes.bool,
    loading: PropTypes.bool,
    makePlayerCaptain: PropTypes.func,
    setCaptainToUpdate: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    players: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string
    }))
};

export default Summary;
