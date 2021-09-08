import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import StyledButton from '../common/StyledButton/StyledButton';
import Switch from '../common/Switch/Switch';
import materialStyles from '../materialStyles';
import defaultStyles from './SubmitFeature.module.scss';

const maxLength = 256;
const charactersLeft = description => `${maxLength - (description.length || 0)} characters left`;

const SubmitFeature = props => {
    const classes = makeStyles(materialStyles)();
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
            <Paper
                elevation={4}
                className={classes.paper}
            >
                <div className={props.styles.backIcon}>
                    <ArrowBackIcon
                        onClick={props.closeSubmitFeature}
                        fontSize="large"
                    />
                </div>
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
            </Paper>
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
