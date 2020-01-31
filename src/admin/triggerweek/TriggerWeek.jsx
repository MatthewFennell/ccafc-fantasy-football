import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { noop } from 'lodash';
import defaultStyles from './TriggerWeek.module.scss';
import { closeTriggerWeekError, triggerWeekRequest, closeSuccessMessage } from '../actions';
import StyledButton from '../../common/StyledButton/StyledButton';
import ErrorModal from '../../common/modal/ErrorModal';
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
                        options={calculateOptions}
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
            <SuccessModal
                backdrop
                closeModal={props.closeSuccessMessage}
                isOpen={props.successMessage.length}
                headerMessage={props.successMessage}
                toggleModal={noop}
            />
        </>
    );
};

TriggerWeek.defaultProps = {
    maxGameWeek: null,
    successMessage: '',
    styles: defaultStyles,
    triggeringWeek: false
};

TriggerWeek.propTypes = {
    closeSuccessMessage: PropTypes.func.isRequired,
    closeTriggerWeekError: PropTypes.func.isRequired,
    maxGameWeek: PropTypes.number,
    successMessage: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string),
    triggeringWeek: PropTypes.bool,
    triggerWeekError: PropTypes.string.isRequired,
    triggerWeekErrorCode: PropTypes.string.isRequired,
    triggerWeekRequest: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    closeSuccessMessage,
    closeTriggerWeekError,
    triggerWeekRequest
};

const mapStateToProps = state => ({
    triggeringWeek: state.admin.triggeringWeek,
    triggerWeekError: state.admin.triggerWeekError,
    triggerWeekErrorCode: state.admin.triggerWeekErrorCode,
    maxGameWeek: state.overview.maxGameWeek,
    successMessage: state.admin.successMessage
});

export default connect(mapStateToProps, mapDispatchToProps)(TriggerWeek);
