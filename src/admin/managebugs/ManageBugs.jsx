import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _, { noop } from 'lodash';
import { firestoreConnect } from 'react-redux-firebase';
import ErrorModal from '../../common/modal/ErrorModal';
import defaultStyles from './ManageBugs.module.scss';
import { closeAdminError, deleteFeatureRequest, setBugIdToDelete } from '../actions';
import { editDisabledPageRequest } from '../../auth/actions';
import ConfirmModal from '../../common/modal/ConfirmModal';
import Bug from './Bug';

const convertToBugs = bugs => (bugs ? Object.keys(bugs)
    .filter(x => !_.isEmpty(bugs[x])).map(bug => ({
        ...bugs[bug],
        id: bug
    })) : []);

const ManageBugs = props => {
    const confirmBugToDelete = useCallback(() => {
        props.deleteFeatureRequest(props.bugIdToDelete);
        // eslint-disable-next-line
    }, [props.deleteFeatureRequest, props.bugIdToDelete])

    return (
        <>
            <div className={props.styles.manageBugsWrapper}>
                <div className={props.styles.bugsHeader}>
                    These are bugs that have been submitted by users
                </div>

                <div className={props.styles.listOfBugs}>
                    {convertToBugs(props.featureRequestBugs).map(bug => (
                        <Bug
                            dateCreated={bug.dateCreated}
                            deleteFeatureRequest={props.deleteFeatureRequest}
                            description={bug.description}
                            displayName={bug.displayName}
                            key={bug.id}
                            id={bug.id}
                            setBugIdToDelete={props.setBugIdToDelete}
                        />
                    ))}
                </div>
            </div>
            <ConfirmModal
                cancel={() => props.setBugIdToDelete('')}
                closeModal={() => props.setBugIdToDelete('')}
                isButtonsDisabled={props.isDeletingBug}
                isLoading={props.isDeletingBug}
                isOpen={Boolean(props.bugIdToDelete)}
                submit={confirmBugToDelete}
                text="Delete Bug?"
            />
            <ErrorModal
                closeModal={props.closeAdminError}
                headerMessage={props.errorHeader}
                isOpen={props.errorMessage.length > 0}
                errorCode={props.errorCode}
                errorMessage={props.errorMessage}
            />
        </>
    );
};

ManageBugs.defaultProps = {
    bugIdToDelete: '',
    closeAdminError: noop,
    deleteFeatureRequest: noop,
    errorMessage: '',
    errorCode: '',
    errorHeader: '',
    featureRequestBugs: {},
    isDeletingBug: false,
    setBugIdToDelete: noop,
    styles: defaultStyles
};

ManageBugs.propTypes = {
    bugIdToDelete: PropTypes.string,
    closeAdminError: PropTypes.func,
    deleteFeatureRequest: PropTypes.func,
    errorMessage: PropTypes.string,
    errorCode: PropTypes.string,
    errorHeader: PropTypes.string,
    featureRequestBugs: PropTypes.shape({}),
    isDeletingBug: PropTypes.bool,
    setBugIdToDelete: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    closeAdminError,
    deleteFeatureRequest,
    editDisabledPageRequest,
    setBugIdToDelete
};

const mapStateToProps = state => ({
    bugIdToDelete: state.admin.bugIdToDelete,
    errorMessage: state.admin.errorMessage,
    errorCode: state.admin.errorCode,
    errorHeader: state.admin.errorHeader,
    isDeletingBug: state.admin.isDeletingBug,
    featureRequestBugs: state.firestore.data.featureRequestBugs
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => [
        {
            collection: 'feature-requests',
            storeAs: 'featureRequestBugs',
            where: ['isBug', '==', true]
        }
    ])
)(ManageBugs);

export { ManageBugs as ManageBugsUnconnected };
