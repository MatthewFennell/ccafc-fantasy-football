import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import _, { noop } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import LoadingDiv from '../../common/loadingDiv/LoadingDiv';
import { addDivisionRequest, deleteDivisionRequest } from '../actions';
import { getCorrectYear } from '../../common';
import SuccessModal from '../../common/modal/SuccessModal';
import ConfirmModal from '../../common/modal/ConfirmModal';
import StyledButton from '../../common/StyledButton/StyledButton';
import TextInput from '../../common/TextInput/TextInput';
import Switch from '../../common/Switch/Switch';
import * as appConstants from '../../constants';
import materialStyles from '../../materialStyles';
import defaultStyles from './Divisions.module.scss';

// const getDisabledPages = appInfo => _.get(appInfo, 'disabledPages') || [];
const getDivisions = divisions => _.get(divisions, 'Divisions') ?? [];

const Divisions = props => {
    const [isAddingDivision, setIsAddingDivision] = React.useState(false);
    const [link, setLink] = React.useState('');
    const [div, setDiv] = React.useState('');
    const [isMen, setIsMen] = React.useState(true);
    const openAddingDivisions = () => setIsAddingDivision(true);
    const closeAddingDivision = () => setIsAddingDivision(false);

    const toggleIsMen = () => setIsMen(!isMen);

    const addDivision = React.useCallback(() => {
        props.addDivisionRequest(link, isMen, div);
        closeAddingDivision();
    }, [link, div, isMen]);

    const [divToDelete, setDivToDelete] = React.useState('');
    const closeDivToDelete = () => setDivToDelete('');

    const classes = makeStyles(materialStyles)();

    const deleteDiv = React.useCallback(() => {
        props.deleteDivisionRequest(divToDelete);
        setDivToDelete('');
    }, [divToDelete, setDivToDelete]);

    React.useEffect(() => {
        if (!props.isAddingDivision) {
            setDiv('');
            setLink('');
            setIsMen(true);
        }
    }, [props.isAddingDivision]);

    console.log('isAddingDivision', props.isAddingDivision);

    return (
        <>
            <Paper
                elevation={4}
                className={classes.paper}
            >
                <div className={props.styles.headerMessage}>
                    These are the mens leagues
                </div>

                <div className={props.styles.mensLeaguesWrapper}>
                    <ul>
                        {props.divisions.filter(division => division.isMen).map(division => (
                            <li key={division.link}>
                                <div className={props.styles.divisionWrapper}>
                                    <a
                                        href={division.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {division.link}

                                    </a>
                                    <div className={props.styles.division}>
                                        - Division:
                                        {' '}
                                        {division.division}
                                    </div>
                                    <div
                                        className={props.styles.deleteDivision}
                                        onClick={() => setDivToDelete(division.link)}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <DeleteIcon fontSize="small" color="secondary" />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </Paper>
            <Paper
                elevation={4}
                className={classes.paper}
            >
                <div className={props.styles.headerMessage}>
                    These are the womens leagues
                </div>

                <div className={props.styles.mensLeaguesWrapper}>
                    <ul>
                        {props.divisions.filter(division => !division.isMen).map(division => (
                            <li key={division.link}>
                                <div className={props.styles.divisionWrapper}>
                                    <a
                                        href={division.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {division.link}

                                    </a>
                                    <div className={props.styles.division}>
                                        - Division:
                                        {' '}
                                        {division.division}
                                    </div>
                                    <div
                                        className={props.styles.deleteDivision}
                                        onClick={() => setDivToDelete(division.link)}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <DeleteIcon fontSize="small" color="secondary" />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            </Paper>

            <div className={props.styles.divisionButtons}>
                <StyledButton
                    onClick={openAddingDivisions}
                    text="Add Division"
                    disabled={false}
                />
            </div>

            <SuccessModal
                backdrop
                closeModal={closeAddingDivision}
                error
                isOpen={isAddingDivision || props.isAddingDivision}
                headerMessage="Add Division"
            >
                <div className={props.styles.modalWrapper}>
                    <div>
                        <TextInput
                            label="Link"
                            onChange={setLink}
                            value={link}
                            onSubmit={() => {}}
                        />
                        <TextInput
                            label="Division"
                            onChange={setDiv}
                            value={div}
                            onSubmit={() => {}}
                        />
                        <div className={props.styles.optionWrapper}>
                            <div>
                                Is this a Mens Division?
                            </div>
                            <Switch
                                color="primary"
                                checked={isMen}
                                onChange={toggleIsMen}
                            />
                        </div>
                    </div>
                    <LoadingDiv
                        isLoading={props.isAddingDivision}
                        isBorderRadius
                        isFitContent
                    >
                        <div className={props.styles.modalButtons}>
                            <StyledButton text="Confirm" onClick={addDivision} disabled={!link || !div || props.isAddingDivision} />
                            <StyledButton text="Cancel" color="secondary" onClick={closeAddingDivision} disabled={props.isAddingDivision} />
                        </div>
                    </LoadingDiv>
                </div>
            </SuccessModal>

            <ConfirmModal
                isLoading={props.isDeletingDivision}
                closeModal={closeDivToDelete}
                isOpen={Boolean(divToDelete) || props.isDeletingDivision}
                cancel={closeDivToDelete}
                submit={deleteDiv}
                text="Are you sure you want to remove the division?"
            />
        </>
    );
};

Divisions.defaultProps = {
    divisions: [],
    addDivisionRequest: noop,
    deleteDivisionRequest: noop,
    isAddingDivision: false,
    isDeletingDivision: false,
    styles: defaultStyles
};

Divisions.propTypes = {
    divisions: PropTypes.arrayOf(PropTypes.shape({
        link: PropTypes.string,
        isMen: PropTypes.bool
    })),
    addDivisionRequest: PropTypes.func,
    deleteDivisionRequest: PropTypes.func,
    isAddingDivision: PropTypes.bool,
    isDeletingDivision: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    addDivisionRequest,
    deleteDivisionRequest
};

const mapStateToProps = state => ({
    divisions: getDivisions(state.firestore.data.divisions),
    isAddingDivision: state.admin.isAddingDivision,
    isDeletingDivision: state.admin.isDeletingDivision,
    isEditingPage: state.auth.isEditingPage
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => [
        {
            collection: 'fantasy-years',
            doc: getCorrectYear(),
            subcollections: [
                { collection: 'divisions', doc: appConstants.DIVISIONS_ID }
            ],
            storeAs: 'divisions'
        }
    ])
)(Divisions);

const connected = connect(mapStateToProps, mapDispatchToProps)(Divisions);

export { connected as DivisionsConnected };
export { Divisions as DivisionsUnconnected };
