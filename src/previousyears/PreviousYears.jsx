import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classNames from 'classnames';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Dropdown from '../common/dropdown/Dropdown';
import Grid from '../common/grid/Grid';
import * as appConstants from '../constants';
import materialStyles from '../materialStyles';
import { fetchHistoryForYear, fetchPreviousYearsAvailable } from './actions';
import TextInput from '../common/TextInput/TextInput';
import * as textInputConstants from '../common/TextInput/constants';
import defaultStyles from './PreviousYears.module.scss';
import * as helpers from './helpers';

const generateOptions = years => years.map(year => ({
    id: year,
    value: year,
    text: `${year}/${Number(year) + 1}`
}));

const filterPlayers = (history, sortBy, isAscendingSort, playerName) => {
    if (!history) {
        return [];
    }
    const updatedVals = history.map(x => ({
        ...x,
        ownGoals: x?.ownGoals || 0,
        penaltySaves: x?.penaltySaves || 0,
        penaltyMisses: x?.penaltyMisses || 0,
        cleanSheets: x?.cleanSheets || 0,
        redCards: x?.redCards || 0,
        yellowCards: x?.yellowCards || 0,
        manOfTheMatchs: x?.manOfTheMatchs || 0,
        dickOfTheDays: x?.dickOfTheDays || 0
    })).filter(x => x.name.toLowerCase().includes(playerName.toLowerCase()));
    if (sortBy === 'Name') {
        return helpers.sortListAscDescDesktop(updatedVals, !isAscendingSort, 'name');
    }
    if (sortBy === 'Team') {
        return helpers.sortListAscDescDesktop(updatedVals, !isAscendingSort, 'team');
    }
    if (sortBy === 'Position') {
        return helpers.sortListAscDescDesktop(updatedVals, isAscendingSort, 'position');
    }
    if (sortBy === 'Points') {
        return helpers.sortListAscDescDesktop(updatedVals, isAscendingSort, 'points');
    }
    if (sortBy === 'Goals') {
        return helpers.sortListAscDescDesktop(updatedVals, isAscendingSort, 'goals');
    }
    if (sortBy === 'Assists') {
        return helpers.sortListAscDescDesktop(updatedVals, isAscendingSort, 'assists');
    }
    if (sortBy === 'Price') {
        return helpers.sortListAscDescDesktop(updatedVals, isAscendingSort, 'price');
    }
    if (sortBy === 'MOTMs') {
        return helpers.sortListAscDescDesktop(updatedVals, isAscendingSort, 'manOfTheMatchs');
    }
    if (sortBy === 'DOTDs') {
        return helpers.sortListAscDescDesktop(updatedVals, isAscendingSort, 'dickOfTheDays');
    }
    if (sortBy === 'Yellows') {
        return helpers.sortListAscDescDesktop(updatedVals, isAscendingSort, 'yellowCards');
    }
    if (sortBy === 'Reds') {
        return helpers.sortListAscDescDesktop(updatedVals, isAscendingSort, 'redCards');
    }
    if (sortBy === 'CleanSheets') {
        return helpers.sortListAscDescDesktop(updatedVals, isAscendingSort, 'cleanSheets');
    }
    if (sortBy === 'OwnGoals') {
        return helpers.sortListAscDescDesktop(updatedVals, isAscendingSort, 'ownGoals');
    }
    if (sortBy === 'PenaltyMisses') {
        return helpers.sortListAscDescDesktop(updatedVals, isAscendingSort, 'penaltyMisses');
    }
    if (sortBy === 'PenaltySaves') {
        return helpers.sortListAscDescDesktop(updatedVals, isAscendingSort, 'penaltySaves');
    }
    return updatedVals;
};

const PreviousYears = props => {
    const classes = makeStyles(materialStyles)();
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);

    const currentYear = new Date().getFullYear();

    const [yearSelected, setSelectedYear] = useState(currentYear);

    const setYear = React.useCallback(year => {
        setSelectedYear(year);
        props.fetchHistoryForYear(year);
        // eslint-disable-next-line
    }, [fetchHistoryForYear]);

    const options = ['2021', '2022'];

    useEffect(() => {
        props.fetchPreviousYearsAvailable();
        // eslint-disable-next-line
    }, [props.fetchPreviousYearsAvailable]);

    const [sortBy, setSortBy] = useState('Name');
    const [playerName, setPlayerName] = useState('');

    const [isAscendingSort, setIsAscendingSort] = useState(false);

    const customSortBy = React.useCallback(sort => {
        if (sortBy === sort) {
            setIsAscendingSort(!isAscendingSort);
        } else {
            setIsAscendingSort(false);
        }
        setSortBy(sort);
    }, [sortBy, isAscendingSort]);

    return (
        <div className={props.styles.previousYears}>
            <Paper
                elevation={4}
                className={classNames({
                    [classes.paperBigSideMargins]: !isMobile,
                    [classes.paper]: isMobile
                })}
            >

                <div className={props.styles.textSearchWrapper}>

                    <Dropdown
                        value={yearSelected}
                        onChange={setYear}
                        options={generateOptions(options)}
                        title="Pick season"
                    />

                    <div className={props.styles.restrictText}>
                        <TextInput
                            label="Player Name"
                            onChange={setPlayerName}
                            value={playerName}
                            icon={textInputConstants.textInputIcons.user}
                            iconColor="primary"
                        />
                    </div>

                </div>

                <Grid
                    columns={helpers.columns(customSortBy, sortBy, defaultStyles)}
                    loading={props.fetchingHistory}
                    rows={filterPlayers(props.history[yearSelected], sortBy,
                        isAscendingSort, playerName)}
                    showPagination
                    rowsPerPageOptions={[50, 100]}
                />
            </Paper>
        </div>
    );
};

PreviousYears.defaultProps = {
    auth: {
        uid: ''
    },
    history: [],
    fetchingHistory: false,
    fetchHistoryForYear: noop,
    fetchPreviousYearsAvailable: noop,
    styles: defaultStyles
};

PreviousYears.propTypes = {
    auth: PropTypes.shape({
        uid: PropTypes.string
    }),
    history: PropTypes.objectOf(PropTypes.array),
    fetchingHistory: PropTypes.bool,
    fetchHistoryForYear: PropTypes.func,
    fetchPreviousYearsAvailable: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    fetchHistoryForYear,
    fetchPreviousYearsAvailable
};

const mapStateToProps = state => ({
    fetchingHistory: state.previousYear.fetchingHistory,
    history: state.previousYear.history
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviousYears);

export { PreviousYears as PreviousYearsUnconnected };
