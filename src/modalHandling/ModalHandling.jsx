import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import { closeErrorMessage, closeSuccessMessage } from './actions';
import SuccessModal from '../common/modal/SuccessModal';
import ErrorModal from '../common/modal/ErrorModal';

const Fixtures = props => (
    <>
        <ErrorModal
            closeModal={props.closeErrorMessage}
            headerMessage={props.errorHeader}
            isOpen={props.errorMessage.length > 0}
            errorCode={props.errorCode}
            errorMessage={props.errorMessage}
        />

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

Fixtures.defaultProps = {
    errorCode: '',
    errorHeader: '',
    errorMessage: '',
    successMessage: ''
};

Fixtures.propTypes = {
    closeErrorMessage: PropTypes.func.isRequired,
    closeSuccessMessage: PropTypes.func.isRequired,
    errorCode: PropTypes.string,
    errorHeader: PropTypes.string,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string
};

const mapStateToProps = state => ({
    errorCode: state.modalHandling.errorCode,
    errorHeader: state.modalHandling.errorHeader,
    errorMessage: state.modalHandling.errorMessage,
    successMessage: state.modalHandling.successMessage
});

const mapDispatchToProps = {
    closeErrorMessage,
    closeSuccessMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Fixtures);

export { Fixtures as FixturesUnconnected };
