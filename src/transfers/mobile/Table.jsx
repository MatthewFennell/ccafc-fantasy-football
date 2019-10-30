import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import classNames from 'classnames';
import fp from 'lodash/fp';
import defaultStyles from './Table.module.scss';
import * as helpers from '../helpers';
import Grid from '../../common/grid/Grid';
import StyledInput from '../../common/StyledInput/StyledInput';
import inputStyles from './InputStyles.module.scss';
import StyledButton from '../../common/StyledButton/StyledButton';
import StyledModal from '../../common/modal/StyledModal';
import TableModal from './TableModal';
import Dropdown from '../../common/dropdown/Dropdown';
import Slider from '../../common/slider/Slider';
import modalStyles from './StyledModal.module.scss';
import RadioButton from '../../common/radio/RadioButton';

const sortListAscDesc = (list, direction, property) => {
    if (direction === 'Asc') {
        return fp.sortBy(property.toLowerCase())(list);
    }
    if (direction === 'Desc') {
        return fp.sortBy(property.toLowerCase())(list).reverse();
    }
    return list;
};

const Table = props => {
    const [columns, setColumns] = useState(['name', 'pos', 'team', 'points']);
    const [columnModalOpen, setColumnModalOpen] = useState(false);

    const [sortBy, setSortBy] = useState('Points');
    const [nameFilter, setNameFilter] = useState('Asc');
    const [pointsFilter, setPointsFilter] = useState('Asc');
    const [teamFilter, setTeamFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState('Goalkeeper');
    const [goalFilter, setGoalFilter] = useState('Asc');
    const [assistsFilter, setAssistsFilter] = useState('Asc');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [priceFilter, setPriceFilter] = useState('Asc');

    const toggleColumns = useCallback(column => {
        if (columns.includes(column)) {
            setColumns(columns.filter(x => x !== column));
        } else {
            setColumns(columns.concat([column]));
        }
        if (column.toLowerCase() === sortBy.toLowerCase()) {
            setSortBy('Name');
        }
    });

    const filterPlayers = () => {
        if (sortBy === 'Name') {
            return sortListAscDesc(props.allPlayers, nameFilter, 'name');
        }
        if (sortBy === 'Pos') {
            const positionMapping = {
                Gk: 'GOALKEEPER',
                Def: 'DEFENDER',
                Mid: 'MIDFIELDER',
                Att: 'ATTACKER'
            };
            return props.allPlayers.filter(x => x.position === positionMapping[positionFilter]);
        }
        if (sortBy === 'Team') {
            return props.allPlayers.filter(x => x.team === teamFilter);
        }
        if (sortBy === 'Points') {
            return sortListAscDesc(props.allPlayers, pointsFilter, 'points');
        }
        if (sortBy === 'Goals') {
            return sortListAscDesc(props.allPlayers, goalFilter, 'goals');
        }
        if (sortBy === 'Assists') {
            return sortListAscDesc(props.allPlayers, assistsFilter, 'assists');
        }

        return [];
    };

    const marks = [
        {
            value: 0,
            label: '0'
        },
        {
            value: 2,
            label: '2'
        },
        {
            value: 4,
            label: '4'
        },
        {
            value: 6,
            label: '6'
        },
        {
            value: 8,
            label: '8'
        },
        {
            value: 10,
            label: '10'
        }
    ];

    const RadioAscDesc = (value, onChange, label) => (
        <RadioButton
            label={label}
            onChange={onChange}
            options={[
                {
                    label: 'Asc'
                },
                {
                    label: 'Desc'
                }
            ]}
            value={value}
        />
    );

    const RadioPosition = (value, onChange, label) => (
        <RadioButton
            label={label}
            onChange={onChange}
            options={[
                {
                    label: 'GK'
                },
                {
                    label: 'Def'
                },
                {
                    label: 'Mid'
                },
                {
                    label: 'Att'
                }
            ]}
            value={value}
        />
    );

    const columnOptions = [
        {
            id: 'name',
            name: 'Name',
            button: false,
            fixed: true,
            component: RadioAscDesc(nameFilter, setNameFilter, 'Direction')
        },
        {
            id: 'pos',
            name: 'Pos',
            button: true,
            fixed: false,
            component: RadioPosition(positionFilter, setPositionFilter, 'Filter by Position')
        },
        {
            id: 'team',
            name: 'Team',
            button: true,
            fixed: false,
            component: <Dropdown
                options={props.allTeams.map(x => ({
                    id: x.id,
                    value: x.team_name,
                    text: x.team_name
                }))}
                onChange={setTeamFilter}
                activeValue={teamFilter}
            />
        },
        {
            id: 'price',
            name: 'Price',
            button: true,
            fixed: false,
            component:
    <div className={props.styles.priceWrapper}>
        <Slider marks={marks} min={0} max={10} step={1} text="Min Price" onChange={setMinPrice} />
        <Slider marks={marks} min={0} max={10} step={1} text="Max Price" onChange={setMaxPrice} />
        {RadioAscDesc(priceFilter, setPriceFilter, 'Direction')}
    </div>
        },
        {
            id: 'points',
            name: 'Points',
            button: true,
            fixed: false,
            component: RadioAscDesc(pointsFilter, setPointsFilter, 'Direction')
        },
        {
            id: 'goals',
            name: 'Goals',
            button: true,
            fixed: false,
            component: RadioAscDesc(goalFilter, setGoalFilter, 'Direction')
        },
        {
            id: 'assists',
            name: 'Assists',
            button: true,
            fixed: false,
            component: RadioAscDesc(assistsFilter, setAssistsFilter, 'Direction')
        }
    ];

    const generateColumns = () => columns.map(x => {
        const obj = columnOptions.find(y => y.id === x);
        return ({
            id: obj.id,
            label: obj.button ? (
                <StyledButton
                    text={obj.name}
                    smallButton
                    onClick={() => setColumnModalOpen(true)}
                />
            ) : obj.name,
            align: 'center'
        });
    });

    console.log('sort by', sortBy);

    return (
        <>
            <div className={props.styles.playersWrapper}>
                <div className={props.styles.header}>
                    <div className={props.styles.backIcon}>
                        <ArrowBackIcon onClick={props.closePlayerTable} fontSize="large" />
                    </div>
                    <div className={props.styles.inputWrapper}>
                        <StyledInput value={props.nameFilter} onChange={props.setNameFilter} styles={inputStyles} />
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
                            columns={generateColumns()}
                            loading={props.fetchingAllPlayers}
                            onRowClick={props.onTransfersRequest}
                            rows={filterPlayers()}
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
                    activeColumns={columns}
                    columnOptions={columnOptions}
                    setSortBy={setSortBy}
                    sortBy={sortBy}
                    sortingComponent={columnOptions.find(x => x.name === sortBy).component}
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
    maxPriceFilter: '',
    minPriceFilter: '',
    nameFilter: '',
    onTransfersRequest: noop,
    positionFilter: '',
    remainingBudget: 0,
    setNameFilter: noop,
    sortByFilter: '',
    styles: defaultStyles,
    teamFilter: '',
    playerToRemove: {}
};

Table.propTypes = {
    addPlayerToCurrentTeamRequest: PropTypes.func,
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    closePlayerTable: PropTypes.func,
    fetchingAllPlayers: PropTypes.bool,
    maxPriceFilter: PropTypes.string,
    minPriceFilter: PropTypes.string,
    nameFilter: PropTypes.string,
    onTransfersRequest: PropTypes.func,
    playerToRemove: PropTypes.shape({
        name: PropTypes.string,
        position: PropTypes.string,
        price: PropTypes.number
    }),
    positionFilter: PropTypes.string,
    remainingBudget: PropTypes.number,
    setNameFilter: PropTypes.func,
    sortByFilter: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string),
    teamFilter: PropTypes.string
};

export default Table;
