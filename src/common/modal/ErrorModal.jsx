import PropTypes from 'prop-types';
import React from 'react';
import defaultStyles from './ErrorModal.module.scss';
import WithModal from './WithModal';

const ErrorModal = props => (
    <>
        <div className={props.styles.modalWrapper}>
            <div>
                {`Code: ${props.errorCode !== 'internal' ? props.errorCode : 'Internal'}`}
            </div>
            <div>
                {`Message: ${props.errorMessage !== 'INTERNAL' ? props.errorMessage : 'Internal Server Error'}`}
            </div>
        </div>
    </>
);

ErrorModal.defaultProps = {
    errorCode: '',
    errorMessage: '',
    styles: defaultStyles
};

ErrorModal.propTypes = {
    errorCode: PropTypes.string,
    errorMessage: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default WithModal(ErrorModal);
