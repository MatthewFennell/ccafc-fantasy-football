import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import defaultStyles from './Table.module.scss';
import Grid from '../../common/grid/Grid';
import inputStyles from '../common/InputStyles.module.scss';
import Dropdown from '../../common/dropdown/Dropdown';
import Slider from '../../common/slider/Slider';
import { generateMarks, sortListAscDescDesktop } from '../common/helpers';
import TextInput from '../../common/TextInput/TextInput';
import * as textInputConstants from '../../common/TextInput/constants';
import { generateCsvTitle } from '../../helperFunctions';
import materialStyles from '../../materialStyles';

const positionOptions = [
    {
        text: 'GK',
        value: 'GOALKEEPER',
        id: 'GOALKEEPER'
    },
    {
        text: 'Def',
        value: 'DEFENDER',
        id: 'DEFENDER'
    },
    {
        text: 'Mid',
        value: 'MIDFIELDER',
        id: 'MIDFIELDER'
    },
    {
        text: 'Att',
        value: 'ATTACKER',
        id: 'ATTACKER'
    }
];

const Table = props => {
    const classes = makeStyles(materialStyles)();
    const {
        maxPrice,
        minPrice,
        searchByName,
        setSearchByName,
        teamFilter,
        setTeamFilter,
        setMaxPrice,
        setMinPrice
    } = props.stateObj;

    const filterPlayers = players => {
        let byName = players.filter(x => x.name.toLowerCase()
            .includes(searchByName.toLowerCase()));

        if (props.positionFilter) {
            byName = byName.filter(x => x.position === props.positionFilter);
        }

        if (props.stateObj.teamFilter) {
            byName = byName.filter(x => x.team === props.stateObj.teamFilter);
        }

        byName = byName.filter(x => x.price >= minPrice);
        byName = byName.filter(x => x.price <= maxPrice);

        if (props.sortBy === 'Name') {
            return sortListAscDescDesktop(byName, !props.isAscendingSort, 'name');
        }
        if (props.sortBy === 'Position') {
            return sortListAscDescDesktop(byName, props.isAscendingSort, 'position');
        }
        if (props.sortBy === 'Team') {
            return sortListAscDescDesktop(byName, props.isAscendingSort, 'team');
        }
        if (props.sortBy === 'Points') {
            return sortListAscDescDesktop(byName, props.isAscendingSort, 'points');
        }
        if (props.sortBy === 'Goals') {
            return sortListAscDescDesktop(byName, props.isAscendingSort, 'goals');
        }
        if (props.sortBy === 'Assists') {
            return sortListAscDescDesktop(byName, props.isAscendingSort, 'assists');
        }
        if (props.sortBy === 'Price') {
            return sortListAscDescDesktop(byName, props.isAscendingSort, 'price');
        }
        if (props.sortBy === 'PreviousScore') {
            return sortListAscDescDesktop(byName, props.isAscendingSort, 'previousScore');
        }
        return byName;
    };

    return (
        <Paper
            elevation={4}
            className={classNames({
                [classes.paperSmallMargin]: true
            })}
        >
            <div className={props.styles.filterWrapper}>
                <div className={props.styles.sliderWrapper}>
                    <Slider showMarker={false} marks={generateMarks(0, 16, 2)} min={0} max={16} step={1} text="Min Price" onChange={setMinPrice} defaultValue={0} />
                    <Slider showMarker={false} marks={generateMarks(0, 16, 2)} min={0} max={16} step={1} text="Max Price" onChange={setMaxPrice} defaultValue={10} />
                </div>
                <div className={props.styles.rightHandWrapper}>
                    <div className={props.styles.dropdownsWrapper}>
                        <Dropdown
                            value={props.positionFilter}
                            onChange={props.setPositionFilter}
                            options={positionOptions}
                            title="Position"
                        />
                        <Dropdown
                            options={props.allTeams.map(x => ({
                                id: x.id,
                                value: x.team_name,
                                text: x.team_name
                            }))}
                            onChange={setTeamFilter}
                            value={teamFilter}
                            title="Team"
                        />
                    </div>
                    <TextInput
                        value={searchByName}
                        onChange={setSearchByName}
                        styles={inputStyles}
                        label="Player Name"
                        icon={textInputConstants.textInputIcons.search}
                        iconColor="primary"
                    />
                </div>
            </div>

            <div className={props.styles.gridWrapper}>
                <Grid
                    columns={props.desktopColumns.filter(x => x.active)}
                    csvTitle={generateCsvTitle('Players')}
                    loading={props.fetchingAllPlayers}
                    onRowClick={props.onTransfersRequest}
                    rows={filterPlayers(props.allPlayers, searchByName).map(x => ({
                        ...x,
                        position: x.position.charAt(0) + x.position.slice(1).toLowerCase()
                    }))}
                    rowsPerPageOptions={[50]}
                    rowMapping={row => ({
                        Name: row.name,
                        Position: row.position,
                        Team: row.team,
                        Price: row.price,
                        Points: row.points,
                        Goals: row.goals,
                        Assists: row.assists,
                        'Previous Score': row.previousScore
                    })}
                    showDownloadAsCsv
                    maxHeight={550}
                />
            </div>
        </Paper>
    );
};

Table.defaultProps = {
    allPlayers: [],
    allTeams: [],
    desktopColumns: [],
    fetchingAllPlayers: false,
    isAscendingSort: false,
    onTransfersRequest: noop,
    positionFilter: '',
    setPositionFilter: noop,
    sortBy: '',
    stateObj: {
        maxPrice: 0,
        minPrice: 0,
        searchByName: '',
        setMaxPrice: noop,
        setMinPrice: noop,
        setSearchByName: noop,
        setTeamFilter: noop,
        teamFilter: ''
    },
    styles: defaultStyles
};

Table.propTypes = {
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    desktopColumns: PropTypes.arrayOf(PropTypes.shape({})),
    fetchingAllPlayers: PropTypes.bool,
    isAscendingSort: PropTypes.bool,
    onTransfersRequest: PropTypes.func,
    positionFilter: PropTypes.string,
    setPositionFilter: PropTypes.func,
    sortBy: PropTypes.string,
    stateObj: PropTypes.shape({
        maxPrice: PropTypes.number,
        minPrice: PropTypes.number,
        searchByName: PropTypes.string,
        setMaxPrice: PropTypes.func,
        setMinPrice: PropTypes.func,
        setSearchByName: PropTypes.func,
        setTeamFilter: PropTypes.func,
        teamFilter: PropTypes.string
    }),
    styles: PropTypes.objectOf(PropTypes.string)
};

export default Table;
