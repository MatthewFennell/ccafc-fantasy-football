import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import classNames from 'classnames';
import _, { noop } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import Linear from '../spinner/LinearSpinner';
import StyledButton from '../StyledButton/StyledButton';
import defaultStyles from './Grid.module.scss';

const defaultGridStyles = maxHeight => ({
    root: {
        width: '100%'
    },
    tableWrapper: {
        // maxHeight: 440,
        overflow: 'auto'
    },
    maxHeightSet: {
        maxHeight
    }
});

const Grid = props => {
    const classes = makeStyles(props.gridStyles(props.maxHeight))();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPageOptions[0] || 5);
    const [csvLink, setLink] = useState(null);

    useEffect(() => {
        setLink(React.createRef());
    }, [setLink]);

    const handleChangePage = (event, newPage) => {
        if (props.controlPagination) {
            props.setPage(setPage, newPage);
        } else {
            setPage(newPage);
        }
    };

    const handleChangeRowsPerPage = event => {
        if (props.controlPagination) {
            props.setRowsPerPage(setRowsPerPage, event.target.value);
        } else {
            setRowsPerPage(event.target.value);
        }
        setPage(0);
    };

    const downloadAsCsv = useCallback(() => {
        csvLink.current.link.click();
    }, [csvLink]);

    const generateCsvData = useCallback(() => props.rows.map(r => props.rowMapping(r)),
    // eslint-disable-next-line
        [props.rows, props.rowMapping]);

    return (
        <>
            <Paper className={classes.root}>
                <div className={classNames({
                    [classes.tableWrapper]: true,
                    [classes.maxHeightSet]: props.maxHeight > 0,
                    [props.styles.tableWrap]: true
                })}
                >

                    <div id="tableTitle" className={props.styles.gridHeader}>
                        {props.renderBackButton
                            && (
                                <div className={props.styles.backButton}>
                                    <ArrowBackIcon onClick={props.backButtonLink} />
                                </div>
                            )}

                        {props.gridHeader && (
                            <div className={props.styles.gridHeaderText}>
                                {props.gridHeader}
                            </div>
                        )}
                    </div>
                    {props.loading && <Linear color={props.loadingColor} />}
                    <Table stickyHeader aria-label="sticky table">
                        {/* <Table stickyHeader> */}
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
                <div className={props.styles.gridFooter}>
                    {props.showDownloadAsCsv
                    && (
                        <StyledButton
                            onClick={downloadAsCsv}
                            text="Download as CSV"
                        />
                    ) }
                    {props.showPagination
            && (
                <TablePagination
                    rowsPerPageOptions={props.rowsPerPageOptions}
                    component="div"
                    count={props.numberOfUsersInLeague || props.rows.length}
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
                </div>
            </Paper>
            <CSVLink
                data={generateCsvData()}
                filename={props.csvTitle || 'data.csv'}
                className="hidden"
                ref={csvLink}
                target="_blank"
            />
        </>
    );
};

Grid.defaultProps = {
    activeRow: () => false,
    backButtonLink: noop,
    columns: [],
    controlPagination: false,
    csvTitle: '',
    gridHeader: '',
    gridStyles: defaultGridStyles,
    loading: false,
    loadingColor: 'primary',
    maxHeight: 0,
    numberOfUsersInLeague: 0,
    setPage: noop,
    setRowsPerPage: noop,
    showDownloadAsCsv: false,
    onRowClick: noop,
    renderBackButton: false,
    rowMapping: _.identity,
    rows: [],
    rowsPerPageOptions: [5, 10],
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
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.oneOfType([
                PropTypes.arrayOf(PropTypes.node),
                PropTypes.node
            ])]),
        minWidth: PropTypes.number,
        style: PropTypes.objectOf(PropTypes.string)
    })),
    controlPagination: PropTypes.bool,
    csvTitle: PropTypes.string,
    gridHeader: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    gridStyles: PropTypes.func,
    loading: PropTypes.bool,
    loadingColor: PropTypes.string,
    maxHeight: PropTypes.number,
    setPage: PropTypes.func,
    setRowsPerPage: PropTypes.func,
    showDownloadAsCsv: PropTypes.bool,
    onRowClick: PropTypes.func,
    numberOfUsersInLeague: PropTypes.number,
    renderBackButton: PropTypes.bool,
    rowMapping: PropTypes.func,
    rows: PropTypes.arrayOf(PropTypes.shape({})),
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    showPagination: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default Grid;
