import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import defaultStyles from './WeekStats.module.scss';

const WeekStats = props => {
    const renderList = (key, title, stats) => (stats.filter(stat => stat[key]).length ? (
        <div>
            <div className={props.styles.statTitle}>
                {title}
            </div>
            {fp.orderBy(key, 'desc')(stats).filter(stat => stat[key]).map(stat => (
                <div className={props.styles.stat}>
                    {stat.name + (stat[key] > 1 ? ` (${stat[key]})` : '')}
                </div>
            ))}
        </div>
    ) : null);

    return (
        <div className={props.styles.weekStatsWrapper}>
            <div className={props.styles.weekStatsHeader}>
                {props.title}
            </div>
            <div className={props.styles.statsWrapper}>
                {props.activeColumns.map(x => renderList(x.id, x.label, props.stats))}
            </div>
        </div>
    );
};

WeekStats.defaultProps = {
    activeColumns: [],
    stats: [],
    styles: defaultStyles,
    title: ''
};

WeekStats.propTypes = {
    activeColumns: PropTypes.arrayOf(PropTypes.string),
    stats: PropTypes.arrayOf(PropTypes.shape({})),
    styles: PropTypes.objectOf(PropTypes.string),
    title: PropTypes.string
};

export default WeekStats;
