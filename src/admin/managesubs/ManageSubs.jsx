import React, { useCallback, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import _ from 'lodash';
import defaultStyles from './ManageSubs.module.scss';
import { fetchAllPlayersRequest } from '../../transfers/actions';
import Grid from '../../common/grid/Grid';
import StyledButton from '../../common/StyledButton/StyledButton';
import { setHasPaidSubsRequest } from '../actions';
import Checkbox from '../../common/Checkbox/Checkbox';
import Dropdown from '../../common/dropdown/Dropdown';
import RadioButton from '../../common/radio/RadioButton';
import * as helpers from './helpers';
import * as constants from './constants';
import TextInput from '../../common/TextInput/TextInput';
import * as textInputConstants from '../../common/TextInput/constants';
import { generateCsvTitle } from '../../helperFunctions';

const ManageSubs = props => {
    useEffect(() => {
        props.fetchAllPlayersRequest();
        // eslint-disable-next-line
    }, [props.fetchAllPlayersRequest]);

    const [differences, setDifferences] = useState([]);
    const [teamFilter, setTeamFilter] = useState('All');
    const [nameFilter, setNameFilter] = useState('');
    const [toggleFilter, setToggleFilter] = useState('All');
    const [csvLink, setLink] = useState(null);

    useEffect(() => {
        setLink(React.createRef());
    }, [setLink]);

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

    const saveChanges = useCallback(() => {
        const changes = differences.map(playerId => ({
            playerId,
            hasPaidSubs: !props.allPlayers.find(x => x.id === playerId).hasPaidSubs
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
            <div className={props.styles.subsWrapper}>
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
            </div>
            <CSVLink
                data={generateCsvData()}
                filename={generateCsvTitle('Subs')}
                className="hidden"
                ref={csvLink}
                target="_blank"
            />
        </>
    );
};

ManageSubs.defaultProps = {
    allPlayers: [],
    fetchingAllPlayers: false,
    styles: defaultStyles,
    updatingSubs: false
};

ManageSubs.propTypes = {
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    fetchAllPlayersRequest: PropTypes.func.isRequired,
    fetchingAllPlayers: PropTypes.bool,
    setHasPaidSubsRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    updatingSubs: PropTypes.bool
};

const mapDispatchToProps = {
    fetchAllPlayersRequest,
    setHasPaidSubsRequest
};

const mapStateToProps = state => ({
    allPlayers: state.transfers.allPlayers,
    fetchingAllPlayers: state.transfers.fetchingAllPlayers,
    updatingSubs: state.admin.updatingSubs
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageSubs);

export { ManageSubs as ManageSubsUnconnected };
