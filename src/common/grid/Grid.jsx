import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { noop } from 'lodash';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import classNames from 'classnames';
import defaultStyles from './Grid.module.scss';
import Linear from '../spinner/LinearSpinner';

const defaultGridStyles = {
    root: {
        width: '100%'
    },
    tableWrapper: {
        maxHeight: 440,
        overflow: 'auto'
    }
};

const Grid = props => {
    const classes = makeStyles(props.gridStyles)();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPageOptions[0] || 10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>

                <div id="tableTitle" className={props.styles.gridHeader}>
                    {props.renderBackButton
                            && (
                                <div className={props.styles.backButton}>
                                    <ArrowBackIcon onClick={props.backButtonLink} />
                                </div>
                            )}

                    <div className={props.styles.gridHeaderText}>
                        {props.gridHeader ? props.gridHeader : ''}
                    </div>
                </div>
                {props.loading && <Linear color={props.loadingColor} />}
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {props.columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(row => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.id}
                                    onClick={() => props.onRowClick(row)}
                                    className={classNames({
                                        [props.styles.active]: props.activeRow(row)
                                    })}
                                >
                                    {props.columns.map(column => {
                                        const value = row[column.id];

                                        if (column.renderCell) {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {row[column.id]}
                                                </TableCell>
                                            );
                                        }
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
            {props.showPagination
            && (
                <TablePagination
                    rowsPerPageOptions={props.rowsPerPageOptions}
                    component="div"
                    count={props.rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page'
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            )}
        </Paper>
    );
};

Grid.defaultProps = {
    activeRow: () => false,
    backButtonLink: noop,
    columns: [],
    gridHeader: '',
    gridStyles: defaultGridStyles,
    loading: false,
    loadingColor: 'primary',
    onRowClick: noop,
    renderBackButton: false,
    rows: [],
    rowsPerPageOptions: [10, 25, 100],
    showPagination: true,
    styles: defaultStyles
};

Grid.propTypes = {
    activeRow: PropTypes.func,
    backButtonLink: PropTypes.func,
    columns: PropTypes.arrayOf(PropTypes.shape({
        align: PropTypes.string,
        format: PropTypes.func,
        key: PropTypes.string,
        label: PropTypes.string,
        minWidth: PropTypes.number,
        style: PropTypes.objectOf(PropTypes.string)
    })),
    gridHeader: PropTypes.string,
    gridStyles: PropTypes.objectOf(PropTypes.shape({})),
    loading: PropTypes.bool,
    loadingColor: PropTypes.string,
    onRowClick: PropTypes.func,
    renderBackButton: PropTypes.bool,
    rows: PropTypes.arrayOf(PropTypes.shape({})),
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    showPagination: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default Grid;
