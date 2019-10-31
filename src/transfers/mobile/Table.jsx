import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import classNames from 'classnames';
import defaultStyles from './Table.module.scss';
import Grid from '../../common/grid/Grid';
import StyledInput from '../../common/StyledInput/StyledInput';
import inputStyles from './InputStyles.module.scss';
import StyledModal from '../../common/modal/StyledModal';
import TableModal from './TableModal';
import Dropdown from '../../common/dropdown/Dropdown';
import Slider from '../../common/slider/Slider';
import modalStyles from './StyledModal.module.scss';
import {
    RadioAscDesc, RadioPosition, marks, sortListAscDesc, getColumns
} from './helpers';

const Table = props => {
    const [columnModalOpen, setColumnModalOpen] = useState(false);

    const [sortBy, setSortBy] = useState('points');
    const [nameFilter, setNameFilter] = useState('');
    const [searchByName, setSearchByName] = useState('');
    const [pointsFilter, setPointsFilter] = useState('Desc');
    const [teamFilter, setTeamFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState('GOALKEEPER');
    const [goalFilter, setGoalFilter] = useState('Asc');
    const [assistsFilter, setAssistsFilter] = useState('Asc');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(15);
    const [priceFilter, setPriceFilter] = useState('Asc');
    const [myColumnns, setMyColumns] = useState(getColumns(() => setColumnModalOpen(true)));

    const filterPlayers = players => {
        const byName = players.filter(x => x.name.includes(searchByName));
        if (sortBy === 'name') {
            return sortListAscDesc(byName, nameFilter, 'name');
        }
        if (sortBy === 'position') {
            return byName.filter(x => x.position === positionFilter);
        }
        if (sortBy === 'team') {
            return byName.filter(x => x.team === teamFilter);
        }
        if (sortBy === 'points') {
            return sortListAscDesc(byName, pointsFilter, 'points');
        }
        if (sortBy === 'goals') {
            return sortListAscDesc(byName, goalFilter, 'goals');
        }
        if (sortBy === 'assists') {
            return sortListAscDesc(byName, assistsFilter, 'assists');
        }
        if (sortBy === 'price') {
            return sortListAscDesc(byName.filter(x => x.price >= minPrice && x.price <= maxPrice), priceFilter, 'price');
        }
        return [];
    };

    const toggleColumns = useCallback(column => {
        if (myColumnns.find(x => x.id === column).active) {
            setMyColumns(myColumnns.map(x => (x.id === column ? ({ ...x, active: false }) : x)));
            if (sortBy === column) {
                setSortBy('name');
            }
        } else {
            setMyColumns(myColumnns.map(x => (x.id === column ? ({ ...x, active: true }) : x)));
        }
    });

    const findSortingComponent = useCallback(id => {
        if (id === 'name') {
            return RadioAscDesc(nameFilter, setNameFilter, 'Direction');
        }
        if (id === 'position') {
            return RadioPosition(positionFilter, setPositionFilter, 'Filter by Position');
        }
        if (id === 'team') {
            return (
                <Dropdown
                    options={props.allTeams.map(x => ({
                        id: x.id,
                        value: x.team_name,
                        text: x.team_name
                    }))}
                    onChange={setTeamFilter}
                    activeValue={teamFilter}
                />
            );
        }
        if (id === 'price') {
            return (
                <div className={props.styles.priceWrapper}>
                    <Slider marks={marks} min={0} max={10} step={1} text="Min Price" onChange={setMinPrice} defaultValue={0} />
                    <Slider marks={marks} min={0} max={10} step={1} text="Max Price" onChange={setMaxPrice} defaultValue={10} />
                    {RadioAscDesc(priceFilter, setPriceFilter, 'Direction')}
                </div>
            );
        }
        if (id === 'points') {
            return RadioAscDesc(pointsFilter, setPointsFilter, 'Direction');
        }
        if (id === 'goals') {
            return RadioAscDesc(goalFilter, setGoalFilter, 'Direction');
        }
        if (id === 'assists') {
            return RadioAscDesc(assistsFilter, setAssistsFilter, 'Direction');
        }
        return null;
    }, [nameFilter, positionFilter, teamFilter, priceFilter,
        goalFilter, assistsFilter, pointsFilter, props.allTeams]);


    return (
        <>
            <div className={props.styles.playersWrapper}>
                <div className={props.styles.header}>
                    <div className={props.styles.backIcon}>
                        <ArrowBackIcon
                            onClick={props.closePlayerTable}
                            fontSize="large"
                        />
                    </div>
                    <div className={props.styles.inputWrapper}>
                        <StyledInput
                            value={searchByName}
                            onChange={setSearchByName}
                            styles={inputStyles}
                        />
                    </div>
                    <div className={props.styles.editColumns}>
                        {`£${props.remainingBudget + (props.playerToRemove.price || 0)} mil`}
                    </div>
                </div>
                <div>
                    {props.playerToRemove.name && (
                        <div className={props.styles.playerRemoved}>
                            <div className={props.styles.playerRemovedText}>
                        Player Removed
                            </div>
                            <div className={props.styles.playerInfo}>

                                <div>
                                    {props.playerToRemove.name}
                                </div>
                                <div>
                                    {props.playerToRemove.position}
                                </div>
                                <div>
                                    {`£${props.playerToRemove.price} mil`}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={classNames({
                        [props.styles.bigMarginTop]: props.playerToRemove.name,
                        [props.styles.smallMarginTop]: !props.playerToRemove.name
                    })}
                    >
                        <Grid
                            columns={myColumnns.filter(x => x.active)}
                            loading={props.fetchingAllPlayers}
                            onRowClick={props.onTransfersRequest}
                            rows={filterPlayers(props.allPlayers).map(x => ({
                                ...x,
                                position: x.position.charAt(0) + x.position.slice(1).toLowerCase()
                            }))}
                            rowsPerPageOptions={[50]}
                        />
                    </div>
                </div>

            </div>
            <StyledModal
                backdrop
                closeModal={() => setColumnModalOpen(false)}
                isOpen={columnModalOpen}
                headerMessage="Select Columns"
                styles={modalStyles}
            >
                <TableModal
                    activeColumns={myColumnns.filter(x => x.active)}
                    columnOptions={myColumnns}
                    setSortBy={setSortBy}
                    sortBy={sortBy}
                    sortingComponent={findSortingComponent(myColumnns
                        .find(x => x.id === sortBy).id)}
                    toggleColumns={toggleColumns}
                />
            </StyledModal>
        </>
    );
};

Table.defaultProps = {
    addPlayerToCurrentTeamRequest: noop,
    allPlayers: [],
    allTeams: [],
    closePlayerTable: noop,
    fetchingAllPlayers: false,
    onTransfersRequest: noop,
    remainingBudget: 0,
    styles: defaultStyles,
    playerToRemove: {}
};

Table.propTypes = {
    addPlayerToCurrentTeamRequest: PropTypes.func,
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    closePlayerTable: PropTypes.func,
    fetchingAllPlayers: PropTypes.bool,
    onTransfersRequest: PropTypes.func,
    playerToRemove: PropTypes.shape({
        name: PropTypes.string,
        position: PropTypes.string,
        price: PropTypes.number
    }),
    remainingBudget: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default Table;
