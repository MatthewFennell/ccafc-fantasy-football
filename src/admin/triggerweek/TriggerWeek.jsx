import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import defaultStyles from './TriggerWeek.module.scss';
import { closeTriggerWeekError, triggerWeekRequest } from '../actions';
import StyledButton from '../../common/StyledButton/StyledButton';
import ErrorModal from '../../common/modal/ErrorModal';
import Spinner from '../../common/spinner/Spinner';
import Dropdown from '../../common/dropdown/Dropdown';

const TriggerWeek = props => {
    const [week, setWeek] = useState(null);

    const triggerWeek = useCallback(() => {
        props.triggerWeekRequest(week);
        setWeek(null);
    }, [props.triggerWeekRequest, week]);

    return (
        <div className={props.styles.triggerWeekWrapper}>
            <div className={props.styles.triggerWeekHeader}>
                <StyledButton
                    color="primary"
                    onClick={triggerWeek}
                    text="Trigger Week"
                />
            </div>
            <div className={props.styles.triggerWeekForm}>
                <Dropdown
                    activeValue={week}
                    onChange={setWeek}
                    options={[{
                        id: props.maxGameWeek + 1,
                        value: props.maxGameWeek + 1,
                        text: props.maxGameWeek + 1
                    }]}
                    title="Week"
                    key="Week"
                />
            </div>
            <ErrorModal
                closeModal={props.closeTriggerWeekError}
                headerMessage="Trigger Week"
                isOpen={props.triggerWeekError.length > 0}
                errorCode={props.triggerWeekErrorCode}
                errorMessage={props.triggerWeekError}
            />
            <div className={classNames({
                [props.styles.hidden]: !props.triggeringWeek
            })}
            >
                <Spinner color="secondary" />
            </div>
        </div>
    );
};

TriggerWeek.defaultProps = {
    maxGameWeek: null,
    styles: defaultStyles,
    triggeringWeek: false
};

TriggerWeek.propTypes = {
    closeTriggerWeekError: PropTypes.func.isRequired,
    maxGameWeek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string),
    triggeringWeek: PropTypes.bool,
    triggerWeekError: PropTypes.string.isRequired,
    triggerWeekErrorCode: PropTypes.string.isRequired,
    triggerWeekRequest: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    closeTriggerWeekError,
    triggerWeekRequest
};

const mapStateToProps = state => ({
    triggeringWeek: state.admin.triggeringWeek,
    triggerWeekError: state.admin.triggerWeekError,
    triggerWeekErrorCode: state.admin.triggerWeekErrorCode,
    maxGameWeek: state.overview.maxGameWeek
});

export default connect(mapStateToProps, mapDispatchToProps)(TriggerWeek);
