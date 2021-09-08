import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import Dropdown from '../../common/dropdown/Dropdown';
import Spinner from '../../common/spinner/Spinner';
import StyledButton from '../../common/StyledButton/StyledButton';
import materialStyles from '../../materialStyles';
import { compressPlayersDatabase, recalculateLeaguePositionsRequest, triggerWeekRequest } from '../actions';
import defaultStyles from './TriggerWeek.module.scss';

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
                <div className={props.styles.databaseButtons}>
                    <StyledButton
                        color="primary"
                        onClick={() => props.compressPlayersDatabase()}
                        text="Compress Players Database"
                        disabled={props.isRecalculatingLeaguePositions
                             || props.isCompressingDatabase}
                    />
                    <StyledButton
                        color="primary"
                        onClick={() => props.recalculateLeaguePositionsRequest()}
                        text="Recalculate League Positions"
                        disabled={props.isRecalculatingLeaguePositions
                            || props.isCompressingDatabase}
                    />
                </div>
                <div className={props.styles.recalculateInfo}>
                    Please do these only after submitting results
                    for all teams - expensive operation.
                </div>
                <div className={props.styles.recalculateInfo}>
                    You will need to compress the players database after
                    creating players for them to appear.
                </div>
            </div>
            <div className={classNames({
                [props.styles.hidden]: !props.triggeringWeek
                    && !props.isRecalculatingLeaguePositions && !props.isCompressingDatabase,
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
    compressPlayersDatabase: false,
    maxGameWeek: null,
    isCompressingDatabase: false,
    styles: defaultStyles,
    triggeringWeek: false
};

TriggerWeek.propTypes = {
    isRecalculatingLeaguePositions: PropTypes.bool,
    isCompressingDatabase: PropTypes.bool,
    compressPlayersDatabase: PropTypes.func,
    maxGameWeek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string),
    triggeringWeek: PropTypes.bool,
    recalculateLeaguePositionsRequest: PropTypes.func.isRequired,
    triggerWeekRequest: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    compressPlayersDatabase,
    recalculateLeaguePositionsRequest,
    triggerWeekRequest
};

const mapStateToProps = state => ({
    isRecalculatingLeaguePositions: state.admin.isRecalculatingLeaguePositions,
    isCompressingDatabase: state.admin.isCompressingDatabase,
    triggeringWeek: state.admin.triggeringWeek,
    triggerWeekError: state.admin.triggerWeekError,
    triggerWeekErrorCode: state.admin.triggerWeekErrorCode,
    maxGameWeek: state.overview.maxGameWeek
});

export default connect(mapStateToProps, mapDispatchToProps)(TriggerWeek);

export { TriggerWeek as TriggerWeekUnconnected };
