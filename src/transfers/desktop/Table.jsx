import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './Table.module.scss';
import Grid from '../../common/grid/Grid';

const Table = props => {
    console.log('h');
    return (
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
    );
};

Table.defaultProps = {
    allPlayers: [],
    desktopColumns: [],
    fetchingAllPlayers: false,
    onTransfersRequest: noop,
    stateObj: {
        myColumns: []
    },
    styles: defaultStyles
};

Table.propTypes = {
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    desktopColumns: PropTypes.arrayOf(PropTypes.shape({})),
    fetchingAllPlayers: PropTypes.bool,
    onTransfersRequest: PropTypes.func,
    stateObj: PropTypes.shape({
        myColumns: PropTypes.arrayOf(PropTypes.shape({}))
    }),
    styles: PropTypes.objectOf(PropTypes.string)
};

export default Table;
