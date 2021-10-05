import _, { noop } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { editDisabledPageRequest } from '../../auth/actions';
import ConfirmModal from '../../common/modal/ConfirmModal';
import { deleteFeatureRequest, setBugIdToDelete } from '../actions';
import Bug from './Bug';
import defaultStyles from './ManageBugs.module.scss';
import { getCorrectYear } from '../../common';

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
                    These are the bugs that have been submitted by users
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
        </>
    );
};

ManageBugs.defaultProps = {
    bugIdToDelete: '',
    deleteFeatureRequest: noop,
    featureRequestBugs: {},
    isDeletingBug: false,
    setBugIdToDelete: noop,
    styles: defaultStyles
};

ManageBugs.propTypes = {
    bugIdToDelete: PropTypes.string,
    deleteFeatureRequest: PropTypes.func,
    featureRequestBugs: PropTypes.shape({}),
    isDeletingBug: PropTypes.bool,
    setBugIdToDelete: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    deleteFeatureRequest,
    editDisabledPageRequest,
    setBugIdToDelete
};

const mapStateToProps = state => ({
    bugIdToDelete: state.admin.bugIdToDelete,
    isDeletingBug: state.admin.isDeletingBug,
    featureRequestBugs: state.firestore.data.featureRequestBugs
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => [
        {
            collection: 'fantasy-years',
            doc: getCorrectYear(),
            subcollections: [
                { collection: 'feature-requests', where: ['isBug', '==', true] }
            ],
            storeAs: 'featureRequestBugs'
        }
    ])
)(ManageBugs);

const connected = connect(mapStateToProps, mapDispatchToProps)(ManageBugs);

export { connected as ManageBugsConnected };
export { ManageBugs as ManageBugsUnconnected };
