import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import fp from 'lodash/fp';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import defaultStyles from './WeekStats.module.scss';
import Spinner from '../../common/spinner/Spinner';
import StyledButton from '../../common/StyledButton/StyledButton';
import { generateCsvTitle } from '../../helperFunctions';
import materialStyles from '../../materialStyles';

const WeekStats = props => {
    const classes = makeStyles(materialStyles)();
    const [csvLink, setLink] = useState(null);
    useEffect(() => {
        setLink(React.createRef());
    }, [setLink]);

    const renderList = (key, title, stats) => (stats.filter(stat => stat[key]).length ? (
        <div key={key}>
            <div className={props.styles.statTitle}>
                {title}
            </div>
            {fp.orderBy(key, 'desc')(stats).filter(stat => stat[key]).map(stat => (
                <div className={props.styles.stat} key={`${key}-${stat.name}`}>
                    {stat.name + (stat[key] > 1 ? ` (${stat[key]})` : '')}
                </div>
            ))}
        </div>
    ) : null);

    const downloadAsCsv = useCallback(() => {
        csvLink.current.link.click();
    }, [csvLink]);

    const generateCsvData = useCallback(() => props.stats.map(stat => ({
        Name: stat.name,
        Position: stat.position.charAt(0).toUpperCase() + stat.position.slice(1).toLowerCase(),
        Team: stat.team,
        Points: stat.points,
        Goals: stat.goals,
        Assists: stat.assists,
        'Clean Sheets': stat.cleanSheets,
        MotMs: stat.manOfTheMatch,
        DotDs: stat.dickOfTheDay,
        'Yellow Cards': stat.yellowCard,
        'Red Cards': stat.redCard,
        'Own Goals': stat.ownGoals,
        'Penalty Misses': stat.penaltyMisses,
        'Penalty Saves': stat.penaltySaves
    })), [props.stats]);

    return (
        props.loading
            ? (
                <div className={props.styles.spinnerWrapper}>
                    <Spinner color="primary" />
                </div>
            ) : (
                <>
                    <Paper
                        elevation={4}
                        className={classNames({
                            [classes.paper]: true
                        })}
                    >
                        <div className={props.styles.weekStatsHeader}>
                            {props.title}
                        </div>
                        <div className={props.styles.statsWrapper}>
                            {props.activeColumns.map(x => renderList(x.id, x.label, props.stats))}
                        </div>
                        {props.isCombined && (
                            <div className={props.styles.downloadAsCsv}>
                                <StyledButton
                                    onClick={downloadAsCsv}
                                    text="Download as CSV "
                                />
                            </div>
                        )}
                    </Paper>
                    <CSVLink
                        data={generateCsvData()}
                        filename={generateCsvTitle('Stats')}
                        className="hidden"
                        ref={csvLink}
                        target="_blank"
                    />
                </>
            )
    );
};

WeekStats.defaultProps = {
    activeColumns: [],
    loading: false,
    isCombined: false,
    stats: [],
    styles: defaultStyles,
    title: ''
};

WeekStats.propTypes = {
    activeColumns: PropTypes.arrayOf(PropTypes.shape({})),
    loading: PropTypes.bool,
    isCombined: PropTypes.bool,
    stats: PropTypes.arrayOf(PropTypes.shape({})),
    styles: PropTypes.objectOf(PropTypes.string),
    title: PropTypes.string
};

export default WeekStats;
