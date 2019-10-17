import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import classNames from 'classnames';
import defaultStyles from './UpdateDisplayName.module.scss';
import StyledInput from '../../common/StyledInput/StyledInput';
import StyledButton from '../../common/StyledButton/StyledButton';
import Spinner from '../../common/spinner/Spinner';
import ErrorModal from '../../common/modal/ErrorModal';

const UpdateDisplayName = props => {
    const [displayName, setDisplayName] = useState('');
    const update = useCallback(() => {
        props.updateDisplayName(displayName);
    }, [displayName, props.updateDisplayName]);

    return (
        <div className={props.styles.updateDisplayNameWrapper}>
            <StyledInput label="Display Name" onChange={setDisplayName} value={displayName} />
            <StyledButton
                color="primary"
                onClick={update}
                text="Update Display Name"
            />
            <div className={classNames({
                [props.styles.hidden]: !props.loading
            })}
            >
                <Spinner color="secondary" />
            </div>
            <ErrorModal
                closeModal={props.closeDisplayNameError}
                headerMessage="Display Name Error"
                isOpen={props.updateDisplayNameError.length > 0}
                errorCode={props.updateDisplayNameErrorCode}
                errorMessage={props.updateDisplayNameError}
            />
        </div>
    );
};

UpdateDisplayName.defaultProps = {
    closeDisplayNameError: noop,
    styles: defaultStyles,
    updateDisplayName: noop,
    updateDisplayNameError: '',
    updateDisplayNameErrorCode: '',
    loading: false
};

UpdateDisplayName.propTypes = {
    closeDisplayNameError: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    updateDisplayName: PropTypes.func,
    updateDisplayNameError: PropTypes.string,
    updateDisplayNameErrorCode: PropTypes.string,
    loading: PropTypes.bool
};

export default UpdateDisplayName;
