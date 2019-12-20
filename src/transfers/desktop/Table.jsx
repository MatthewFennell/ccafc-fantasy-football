import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './Table.module.scss';
import Grid from '../../common/grid/Grid';
import StyledInput from '../../common/StyledInput/StyledInput';
import inputStyles from '../common/InputStyles.module.scss';
import Dropdown from '../../common/dropdown/Dropdown';

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
    console.log('h');
    const {
        searchByName,
        setSearchByName
    } = props.stateObj;
    return (

        <div className={props.styles.tableWrapper}>
            <div className={props.styles.filterWrapper}>
                <StyledInput
                    value={searchByName}
                    onChange={setSearchByName}
                    styles={inputStyles}
                    label="Player Name"
                />
                <Dropdown
                    activeValue={props.positionFilter}
                    onChange={props.setPositionFilter}
                    options={positionOptions}
                    title="Position"
                />
            </div>
            <div className={props.styles.gridWrapper}>
                <Grid
                    columns={props.desktopColumns.filter(x => x.active)}
                    loading={props.fetchingAllPlayers}
                    onRowClick={props.onTransfersRequest}
                    rows={props.allPlayers.map(x => ({
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
    allPlayers: [],
    desktopColumns: [],
    fetchingAllPlayers: false,
    onTransfersRequest: noop,
    positionFilter: '',
    setPositionFilter: noop,
    stateObj: {
        searchByName: '',
        setSearchByName: noop
    },
    styles: defaultStyles
};

Table.propTypes = {
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    desktopColumns: PropTypes.arrayOf(PropTypes.shape({})),
    fetchingAllPlayers: PropTypes.bool,
    onTransfersRequest: PropTypes.func,
    positionFilter: PropTypes.string,
    setPositionFilter: PropTypes.func,
    stateObj: PropTypes.shape({
        searchByName: PropTypes.string,
        setSearchByName: PropTypes.func
    }),
    styles: PropTypes.objectOf(PropTypes.string)
};

export default Table;
