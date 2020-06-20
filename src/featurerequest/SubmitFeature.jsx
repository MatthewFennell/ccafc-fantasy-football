import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import defaultStyles from './SubmitFeature.module.scss';
import StyledButton from '../common/StyledButton/StyledButton';
import Switch from '../common/Switch/Switch';

const maxLength = 256;
const charactersLeft = description => `${maxLength - (description.length || 0)} characters left`;

const SubmitFeature = props => {
    const { isBug, setIsBug } = props;

    const toggleSwitch = useCallback(() => {
        setIsBug(!isBug);
    }, [setIsBug, isBug]);

    return (
        <SwipeableDrawer
            anchor="right"
            open={props.submitFeatureOpen}
            onClose={props.closeSubmitFeature}
            onOpen={noop}
        >
            <div className={props.styles.featureRequestWrapper}>

                <div className={props.styles.switchWrapper}>
                    <div className={props.styles.bugMessage}>
                        Is Bug
                    </div>
                    <div>
                        <Switch
                            onChange={toggleSwitch}
                            checked={isBug}
                        />
                    </div>
                </div>

                <div className={props.styles.header}>
                    Describe the feature you would like to see added to the site,
                    or describe the bug as well as you can
                </div>
                <textarea
                    value={props.description}
                    onChange={props.updateDescription}
                    className={props.styles.textArea}
                />
                <div className={props.styles.charactersRemaining}>
                    {charactersLeft(props.description)}
                </div>

                <StyledButton
                    onClick={props.submitRequest}
                    color="primary"
                    text={isBug ? 'Submit Bug' : 'Submit Feature Request'}
                    disabled={!props.description}
                />
            </div>
        </SwipeableDrawer>
    );
};

SubmitFeature.defaultProps = {
    closeSubmitFeature: noop,
    description: '',
    isBug: false,
    setIsBug: noop,
    styles: defaultStyles,
    submitFeatureOpen: false,
    submitRequest: noop,
    updateDescription: noop
};

SubmitFeature.propTypes = {
    closeSubmitFeature: PropTypes.func,
    description: PropTypes.string,
    isBug: PropTypes.bool,
    setIsBug: PropTypes.func,
    submitFeatureOpen: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string),
    submitRequest: PropTypes.func,
    updateDescription: PropTypes.func
};

export default SubmitFeature;
