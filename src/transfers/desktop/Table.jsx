import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './Table.module.scss';
import Grid from '../../common/grid/Grid';
import StyledInput from '../../common/StyledInput/StyledInput';
import inputStyles from '../common/InputStyles.module.scss';
import Dropdown from '../../common/dropdown/Dropdown';
import Slider from '../../common/slider/Slider';
import { generateMarks } from '../common/helpers';

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
        const notInMyTeam = players.filter(x => !props.activeTeam.some(y => y.id === x.id));
        let byName = notInMyTeam.filter(x => x.name.includes(searchByName));

        if (props.positionFilter) {
            byName = byName.filter(x => x.position === props.positionFilter);
        }

        if (props.stateObj.teamFilter) {
            byName = byName.filter(x => x.team === props.stateObj.teamFilter);
        }

        byName = byName.filter(x => x.price >= minPrice);
        byName = byName.filter(x => x.price <= maxPrice);
        return byName;
    };


    return (
        <div className={props.styles.tableWrapper}>
            <div className={props.styles.filterWrapper}>
                <div className={props.styles.sliderWrapper}>
                    <Slider showMarker={false} marks={generateMarks(0, 16, 2)} min={0} max={16} step={1} text="Min Price" onChange={setMinPrice} defaultValue={0} />
                    <Slider showMarker={false} marks={generateMarks(0, 16, 2)} min={0} max={16} step={1} text="Max Price" onChange={setMaxPrice} defaultValue={10} />
                </div>
                <div className={props.styles.rightHandWrapper}>
                    <div className={props.styles.dropdownsWrapper}>
                        <Dropdown
                            activeValue={props.positionFilter}
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
                            activeValue={teamFilter}
                            title="Team"
                        />
                    </div>
                    <StyledInput
                        value={searchByName}
                        onChange={setSearchByName}
                        styles={inputStyles}
                        label="Player Name"
                    />
                </div>
            </div>

            <div className={props.styles.gridWrapper}>
                <Grid
                    columns={props.desktopColumns.filter(x => x.active)}
                    loading={props.fetchingAllPlayers}
                    onRowClick={props.onTransfersRequest}
                    rows={filterPlayers(props.allPlayers, searchByName).map(x => ({
                        ...x,
                        position: x.position.charAt(0) + x.position.slice(1).toLowerCase()
                    }))}
                    rowsPerPageOptions={[50]}
                />
            </div>
        </div>
    );
};

Table.defaultProps = {
    activeTeam: [],
    allPlayers: [],
    allTeams: [],
    desktopColumns: [],
    fetchingAllPlayers: false,
    onTransfersRequest: noop,
    positionFilter: '',
    setPositionFilter: noop,
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
    activeTeam: PropTypes.arrayOf(PropTypes.shape({})),
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    desktopColumns: PropTypes.arrayOf(PropTypes.shape({})),
    fetchingAllPlayers: PropTypes.bool,
    onTransfersRequest: PropTypes.func,
    positionFilter: PropTypes.string,
    setPositionFilter: PropTypes.func,
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
