import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { noop } from 'lodash';
import defaultStyles from './TriggerWeek.module.scss';
import {
    triggerWeekRequest, closeSuccessMessage, recalculateLeaguePositionsRequest
} from '../actions';
import StyledButton from '../../common/StyledButton/StyledButton';
import SuccessModal from '../../common/modal/SuccessModal';
import Spinner from '../../common/spinner/Spinner';
import Dropdown from '../../common/dropdown/Dropdown';

const TriggerWeek = props => {
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
        <>
            <div className={props.styles.triggerWeekWrapper}>
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
                    && !props.isRecalculatingLeaguePositions
                })}
                >
                    <Spinner color="secondary" />
                </div>
            </div>
            <SuccessModal
                backdrop
                closeModal={props.closeSuccessMessage}
                isOpen={props.successMessage.length > 0}
                isSuccess
                headerMessage={props.successMessage}
                toggleModal={noop}
            />
        </>
    );
};

TriggerWeek.defaultProps = {
    isRecalculatingLeaguePositions: false,
    maxGameWeek: null,
    successMessage: '',
    styles: defaultStyles,
    triggeringWeek: false
};

TriggerWeek.propTypes = {
    closeSuccessMessage: PropTypes.func.isRequired,
    isRecalculatingLeaguePositions: PropTypes.bool,
    maxGameWeek: PropTypes.number,
    successMessage: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string),
    triggeringWeek: PropTypes.bool,
    recalculateLeaguePositionsRequest: PropTypes.func.isRequired,
    triggerWeekRequest: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    closeSuccessMessage,
    recalculateLeaguePositionsRequest,
    triggerWeekRequest
};

const mapStateToProps = state => ({
    isRecalculatingLeaguePositions: state.admin.isRecalculatingLeaguePositions,
    triggeringWeek: state.admin.triggeringWeek,
    triggerWeekError: state.admin.triggerWeekError,
    triggerWeekErrorCode: state.admin.triggerWeekErrorCode,
    maxGameWeek: state.overview.maxGameWeek,
    successMessage: state.admin.successMessage
});

export default connect(mapStateToProps, mapDispatchToProps)(TriggerWeek);

export { TriggerWeek as TriggerWeekUnconnected };
