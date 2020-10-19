import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import defaultStyles from './TriggerWeek.module.scss';
import {
    triggerWeekRequest, recalculateLeaguePositionsRequest
} from '../actions';
import StyledButton from '../../common/StyledButton/StyledButton';
import Spinner from '../../common/spinner/Spinner';
import Dropdown from '../../common/dropdown/Dropdown';
import materialStyles from '../../materialStyles';

const TriggerWeek = props => {
    const classes = makeStyles(materialStyles)();
    const [week, setWeek] = useState('');

    const triggerWeek = useCallback(() => {
        props.triggerWeekRequest(week);
        setWeek('');
        // eslint-disable-next-line
    }, [props.triggerWeekRequest, week]);

    const calculateOptions = (props.maxGameWeek || props.maxGameWeek === 0) ? [{
        id: props.maxGameWeek + 1,
        value: props.maxGameWeek + 1,
        text: props.maxGameWeek + 1
    }] : [];

    return (
        <Paper
            elevation={4}
            className={classes.paper}
        >
            <div className={props.styles.triggerWeekForm}>
                <Dropdown
                    value={week}
                    onChange={setWeek}
                    options={calculateOptions}
                    title="Week"
                    key="Week"
                />
            </div>
            <div className={props.styles.triggerWeekHeader}>
                <StyledButton
                    color="primary"
                    onClick={triggerWeek}
                    text="Trigger Week"
                    disabled={!(week && week !== 0)}
                />
            </div>
            <div className={props.styles.recalculateLeaguePositions}>
                <StyledButton
                    color="primary"
                    onClick={() => props.recalculateLeaguePositionsRequest()}
                    text="Recalculate League Positions"
                    disabled={props.isRecalculatingLeaguePositions}
                />
                <div className={props.styles.recalculateInfo}>
                    Please do this only after submitting results
                    for all teams - expensive operation
                </div>
            </div>
            <div className={classNames({
                [props.styles.hidden]: !props.triggeringWeek
                    && !props.isRecalculatingLeaguePositions,
                [props.styles.spinner]: true
            })}
            >
                <Spinner color="secondary" />
            </div>
        </Paper>
    );
};

TriggerWeek.defaultProps = {
    isRecalculatingLeaguePositions: false,
    maxGameWeek: null,
    styles: defaultStyles,
    triggeringWeek: false
};

TriggerWeek.propTypes = {
    isRecalculatingLeaguePositions: PropTypes.bool,
    maxGameWeek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string),
    triggeringWeek: PropTypes.bool,
    recalculateLeaguePositionsRequest: PropTypes.func.isRequired,
    triggerWeekRequest: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    recalculateLeaguePositionsRequest,
    triggerWeekRequest
};

const mapStateToProps = state => ({
    isRecalculatingLeaguePositions: state.admin.isRecalculatingLeaguePositions,
    triggeringWeek: state.admin.triggeringWeek,
    triggerWeekError: state.admin.triggerWeekError,
    triggerWeekErrorCode: state.admin.triggerWeekErrorCode,
    maxGameWeek: state.overview.maxGameWeek
});

export default connect(mapStateToProps, mapDispatchToProps)(TriggerWeek);

export { TriggerWeek as TriggerWeekUnconnected };
