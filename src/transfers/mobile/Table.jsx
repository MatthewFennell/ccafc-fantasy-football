import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import classNames from 'classnames';
import EditIcon from '@material-ui/icons/Edit';
import defaultStyles from './Table.module.scss';
import * as helpers from '../helpers';
import Grid from '../../common/grid/Grid';
import StyledInput from '../../common/StyledInput/StyledInput';
import inputStyles from './InputStyles.module.scss';

const Table = props => {
    console.log('eh');
    return (
        <div className={props.styles.playersWrapper}>
            <div className={props.styles.header}>
                <div className={props.styles.backIcon}>
                    <ArrowBackIcon onClick={props.closePlayerTable} fontSize="large" />
                </div>
                <div className={props.styles.inputWrapper}>
                    <StyledInput value={props.nameFilter} onChange={props.setNameFilter} styles={inputStyles} />
                </div>
                <div className={props.styles.editColumns}>
                    <EditIcon />
                </div>
            </div>
            <div>
                {props.playerToRemove.name && (
                    <div className={props.styles.playerRemoved}>
                        {/* <div className={props.styles.playerRemovedText}>
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
                        <div className={props.styles.remainingBudget}>
                            {`Budget: £${props.remainingBudget + (props.playerToRemove.price || 0)} mil`}
                        </div> */}
                    </div>
                )}

                <div className={classNames({
                    [props.styles.bigMarginTop]: props.playerToRemove.name,
                    [props.styles.smallMarginTop]: !props.playerToRemove.name
                })}
                >
                    <Grid
                        columns={helpers.columnsWhenSmallScreen(props.sortByFilter)}
                        // gridHeader={<EditIcon />}
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
    );
};

Table.defaultProps = {
    addPlayerToCurrentTeamRequest: noop,
    allPlayers: [],
    fetchingAllPlayers: false,
    maxPriceFilter: '',
    minPriceFilter: '',
    nameFilter: '',
    positionFilter: '',
    sortByFilter: '',
    styles: defaultStyles,
    teamFilter: '',
    playerToRemove: {}
};

Table.propTypes = {
    addPlayerToCurrentTeamRequest: PropTypes.func,
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    fetchingAllPlayers: PropTypes.bool,
    maxPriceFilter: PropTypes.string,
    minPriceFilter: PropTypes.string,
    nameFilter: PropTypes.string,
    positionFilter: PropTypes.string,
    sortByFilter: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string),
    teamFilter: PropTypes.string
};

export default Table;
