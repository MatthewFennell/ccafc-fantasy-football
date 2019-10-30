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

const columnOptions = [
    {
        id: 'name',
        button: false,
        fixed: true
    },
    {
        id: 'pos',
        button: true,
        fixed: false
    },
    {
        id: 'team',
        button: true,
        fixed: false
    },
    {
        id: 'price',
        button: true,
        fixed: false
    },
    {
        id: 'points',
        button: true,
        fixed: false
    }
];

const Table = props => {
    console.log('eh');

    const [columns, setColumns] = useState(['name', 'pos', 'team', 'points']);
    const [columnModalOpen, setColumnModalOpen] = useState(false);

    const toggleColumns = useCallback(column => {
        if (columns.includes(column)) {
            setColumns(columns.filter(x => x !== column));
        } else {
            setColumns(columns.concat([column]));
        }
    });

    const generateColumns = () => columns.map(x => {
        const obj = columnOptions.find(y => y.id === x);
        return ({
            id: obj.id,
            label: obj.button ? (
                <StyledButton
                    text={obj.id}
                    smallButton
                    onClick={() => setColumnModalOpen(true)}
                />
            ) : obj.id.charAt(0).toUpperCase() + obj.id.slice(1),
            align: 'center'
        });
    });

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
                            rows={helpers.filterPlayers(
                                props.allPlayers,
                                props.teamFilter,
                                props.positionFilter,
                                props.minPriceFilter,
                                props.maxPriceFilter,
                                props.sortByFilter,
                                props.nameFilter
                            )}
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
                toggleModal={() => setColumnModalOpen(false)}
            >
                <TableModal
                    activeColumns={columns}
                    columnOptions={columnOptions}
                    toggleColumns={toggleColumns}
                />
            </StyledModal>
        </>
    );
};

Table.defaultProps = {
    addPlayerToCurrentTeamRequest: noop,
    allPlayers: [],
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
