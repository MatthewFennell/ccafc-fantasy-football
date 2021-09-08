import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import classNames from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Checkbox from '../../common/Checkbox/Checkbox';
import Dropdown from '../../common/dropdown/Dropdown';
import Grid from '../../common/grid/Grid';
import SuccessModal from '../../common/modal/SuccessModal';
import RadioButton from '../../common/radio/RadioButton';
import StyledButton from '../../common/StyledButton/StyledButton';
import * as textInputConstants from '../../common/TextInput/constants';
import TextInput from '../../common/TextInput/TextInput';
import * as appConstants from '../../constants';
import { generateCsvTitle } from '../../helperFunctions';
import materialStyles from '../../materialStyles';
import { fetchAllPlayersRequest } from '../../transfers/actions';
import { setHasPaidSubsRequest } from '../actions';
import * as constants from './constants';
import * as helpers from './helpers';
import defaultStyles from './ManageSubs.module.scss';
import SubsHistory from './SubsHistory';

const getSubsHistory = history => _.get(history, [appConstants.CLUB_SUBS_HISTORY_ID, 'history']);

const ManageSubs = props => {
    const classes = makeStyles(materialStyles)();
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);
    useEffect(() => {
        props.fetchAllPlayersRequest();
        // eslint-disable-next-line
    }, [props.fetchAllPlayersRequest]);

    const [differences, setDifferences] = useState([]);
    const [teamFilter, setTeamFilter] = useState('All');
    const [nameFilter, setNameFilter] = useState('');
    const [toggleFilter, setToggleFilter] = useState('All');
    const [csvLink, setLink] = useState(null);
    const [showingHistory, setShowingHistory] = useState(false);

    useEffect(() => {
        setLink(React.createRef());
    }, [setLink]);

    const toggleShowingHistory = useCallback(() => {
        setShowingHistory(!showingHistory);
    }, [showingHistory, setShowingHistory]);

    const getCurrentPaidForId = id => {
        if (differences.includes(id)) {
            return !props.allPlayers.find(x => x.id === id).hasPaidSubs;
        }
        return props.allPlayers.find(x => x.id === id).hasPaidSubs;
    };

    const toggle = useCallback(playerId => {
        if (differences.includes(playerId)) {
            setDifferences(differences.filter(x => x !== playerId));
        } else {
            setDifferences(_.union(differences, [playerId]));
        }
    }, [setDifferences, differences]);

    const cancelChanges = useCallback(() => {
        setDifferences([]);
    }, [setDifferences]);

    const setTeamFilterWithReset = useCallback(team => {
        setTeamFilter(team);
        setDifferences([]);
    }, [setTeamFilter, setDifferences]);

    const setNameFitlerWithReset = useCallback(name => {
        setNameFilter(name);
        setDifferences([]);
    }, [setNameFilter, setDifferences]);

    const setToggleFilterWithReset = useCallback(val => {
        setToggleFilter(val);
        setDifferences([]);
    }, [setToggleFilter, setDifferences]);

    const getPlayerName = useCallback(playerId => _.get(props.allPlayers.find(p => p.id === playerId), 'name'), [props.allPlayers]);

    const saveChanges = useCallback(() => {
        const changes = differences.map(playerId => ({
            playerId,
            hasPaidSubs: !props.allPlayers.find(x => x.id === playerId).hasPaidSubs,
            name: getPlayerName(playerId)
        }));
        props.setHasPaidSubsRequest(changes);
        setDifferences([]);
        // eslint-disable-next-line
    }, [props.setHasPaidSubsRequest, props.allPlayers, differences])

    const generateCsvData = useCallback(() => props.allPlayers.map(player => ({
        Name: player.name,
        Team: player.team,
        'Paid Subs': player.hasPaidSubs ? 'Yes' : 'No'
    })),
    [props.allPlayers]);

    const downloadAsCsv = useCallback(() => {
        csvLink.current.link.click();
    }, [csvLink]);

    const generateRows = players => helpers
        .filterPlayers(players, teamFilter, toggleFilter, nameFilter)
        .map(x => ({
            ...x,
            hasPaidSubs: x.hasPaidSubs
                ? (
                    <FiberManualRecordIcon className={props.styles.iconPositive} />
                )
                : <FiberManualRecordIcon className={props.styles.iconNegative} />,
            update: x.hasPaidSubs
                ? (
                    <Checkbox
                        onClick={() => toggle(x.id)}
                        checked={getCurrentPaidForId(x.id)}
                        color="green"
                    />
                )
                : (
                    <Checkbox
                        onClick={() => toggle(x.id)}
                        checked={getCurrentPaidForId(x.id)}
                        color="green"
                    />
                ),
            modified: differences.includes(x.id) ? <FiberManualRecordIcon color="primary" /> : null
        }));

    return (
        <>
            <Paper
                elevation={4}
                className={classNames({
                    [classes.paper]: !isMobile,
                    [classes.paperMobile]: isMobile
                })}
            >
                <div className={props.styles.subsHeader}>
                    Manage Subs
                </div>
                <div className={props.styles.helperMessage}>
                    Editing a filter will reset your changes
                </div>

                <div className={props.styles.filtersWrapper}>
                    <Dropdown
                        options={helpers.generateTeams(props.allPlayers)}
                        value={teamFilter}
                        onChange={setTeamFilterWithReset}
                        title="Team"
                    />
                    <RadioButton
                        onChange={setToggleFilterWithReset}
                        options={constants.radioOptions}
                        value={toggleFilter}
                    />
                    <TextInput
                        onChange={setNameFitlerWithReset}
                        value={nameFilter}
                        label="Name"
                        icon={textInputConstants.textInputIcons.user}
                        iconColor="secondary"
                    />
                </div>

                <div className={props.styles.playersGridWrapper}>
                    <Grid
                        columns={constants.columns}
                        loading={props.updatingSubs || props.fetchingAllPlayers}
                        rows={generateRows(props.allPlayers)}
                        rowsPerPageOptions={[500]}
                        showPagination={false}
                        maxHeight={600}
                    />
                </div>
                <div className={props.styles.confirmChangesWrapper}>
                    <StyledButton
                        onClick={toggleShowingHistory}
                        text="Show History"
                        color="primary"
                    />
                    <StyledButton
                        onClick={downloadAsCsv}
                        text="Download as CSV"
                        color="primary"
                    />
                    <StyledButton
                        onClick={saveChanges}
                        text="Save Changes"
                        color="primary"
                        disabled={!differences.length}
                    />
                    <StyledButton
                        onClick={cancelChanges}
                        text="Cancel"
                        color="secondary"
                        disabled={!differences.length}
                    />
                </div>
            </Paper>
            <CSVLink
                data={generateCsvData()}
                filename={generateCsvTitle('Subs')}
                className="hidden"
                ref={csvLink}
                target="_blank"
            />
            <SuccessModal
                backdrop
                closeModal={() => setShowingHistory(false)}
                isOpen={showingHistory}
                headerMessage="Update History"
                toggleModal={toggleShowingHistory}
            >
                <SubsHistory
                    subsHistory={props.subsHistory}
                />
            </SuccessModal>
        </>
    );
};

ManageSubs.defaultProps = {
    allPlayers: [],
    fetchingAllPlayers: false,
    styles: defaultStyles,
    subsHistory: [],
    updatingSubs: false
};

ManageSubs.propTypes = {
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    fetchAllPlayersRequest: PropTypes.func.isRequired,
    fetchingAllPlayers: PropTypes.bool,
    setHasPaidSubsRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    subsHistory: PropTypes.arrayOf(PropTypes.shape({
        haveNotPaid: PropTypes.arrayOf(PropTypes.string),
        havePaid: PropTypes.arrayOf(PropTypes.string)
    })),
    updatingSubs: PropTypes.bool
};

const mapDispatchToProps = {
    fetchAllPlayersRequest,
    setHasPaidSubsRequest
};

const mapStateToProps = state => ({
    allPlayers: state.transfers.allPlayers,
    subsHistory: getSubsHistory(state.firestore.data.clubSubs),
    fetchingAllPlayers: state.transfers.fetchingAllPlayers,
    updatingSubs: state.admin.updatingSubs
});

// export default connect(mapStateToProps, mapDispatchToProps)(ManageSubs);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => [
        {
            collection: 'club-subs',
            storeAs: 'clubSubs'
        }
    ])
)(ManageSubs);

export { ManageSubs as ManageSubsUnconnected };
