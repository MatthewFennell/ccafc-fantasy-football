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
import defaultStyles from './Grid.module.scss';

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
        <>
            <div className={props.styles.gridHeader}>
                {props.gridHeader}
            </div>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
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
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {props.columns.map(column => {
                                            const value = row[column.id];
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
            </Paper>
        </>
    );
};

Grid.defaultProps = {
    columns: [],
    gridHeader: '',
    gridStyles: defaultGridStyles,
    rows: [],
    rowsPerPageOptions: [10, 25, 100],
    styles: defaultStyles
};

Grid.propTypes = {
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
    rows: PropTypes.arrayOf(PropTypes.shape({})),
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    styles: PropTypes.objectOf(PropTypes.string)
};

export default Grid;
