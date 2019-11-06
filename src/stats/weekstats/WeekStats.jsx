import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import defaultStyles from './WeekStats.module.scss';

const WeekStats = props => {
    console.log('yes');
    console.log('props', props);

    const renderList = (key, title) => (
        <div>
            <div>
                {title}
            </div>
            {fp.orderBy(key, 'desc')(props.stats).filter(stat => stat[key]).map(stat => (
                <div className={props.styles.stat}>
                    {stat.name + (stat[key] > 1 ? ` (${stat[key]})` : '')}
                </div>
            ))}
        </div>
    );

    const listToRender = [
        { key: 'goals', title: 'Goals' },
        { key: 'assists', title: 'Assists' },
        { key: 'cleanSheet', title: 'Clean Sheets' },
        { key: 'redCard', title: 'Red Cards' },
        { key: 'yellowCard', title: 'Yellow Cards' }
    ];

    return (
        <div className={props.styles.weekStatsWrapper}>
            <div className={props.styles.weekStatsHeader}>
                {`Week ${props.week}`}
            </div>
            <div className={props.styles.statsWrapper}>

                {listToRender.map(x => renderList(x.key, x.title))}

                {/* <div className={props.styles.goalScorers}>
                    <div className={props.styles.goalScorersHeader}>
                GoalScorers
                    </div>
                    {fp.orderBy('goals', 'desc')(props.stats).filter(stat => stat.goals).map(stat => (
                        <div className={props.styles.stat}>
                            {stat.name + (stat.goals > 1 ? ` (${stat.goals})` : '')}
                        </div>
                    ))}
                </div>

                <div className={props.styles.assists}>
                    <div className={props.styles.assistsHeader}>
                Assists
                    </div>
                    {fp.orderBy('assists', 'desc')(props.stats).filter(stat => stat.assists).map(stat => (
                        <div className={props.styles.stat}>
                            {stat.name + (stat.assists > 1 ? ` (${stat.assists})` : '')}
                        </div>
                    ))}
                </div>


                <div className={props.styles.cleanSheets}>
                    <div className={props.styles.cleanSheetsHeader}>
                Clean Sheets
                    </div>
                    {fp.orderBy('cleanSheet', 'desc')(props.stats).filter(stat => stat.cleanSheet).map(stat => (
                        <div className={props.styles.stat}>
                            {stat.name + (stat.cleanSheet > 1 ? ` (${stat.cleanSheet})` : '')}
                        </div>
                    ))}
                </div> */}

            </div>
        </div>
    );
};

WeekStats.defaultProps = {
    activeColumns: [],
    stats: [],
    styles: defaultStyles,
    week: 0
};

WeekStats.propTypes = {
    activeColumns: PropTypes.arrayOf(PropTypes.string),
    stats: PropTypes.arrayOf(PropTypes.shape({})),
    styles: PropTypes.objectOf(PropTypes.string),
    week: PropTypes.number
};

export default WeekStats;
