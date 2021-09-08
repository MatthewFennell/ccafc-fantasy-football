import fp from 'lodash/fp';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import * as appConstants from '../../constants';
import defaultStyles from './Update.module.scss';

const generateTime = date => (date ? moment(new Date(date.seconds * 1000)).format('MMM Do YYYY, h:mm:ss a') : '');

const Update = props => {
    const {
        author, date, update, oldStats
    } = props;

    const RenderAuthor = (
        <div className={props.styles.renderAuthorWrapper}>
            <div className={props.styles.authorDate}>
                {`${generateTime(date)}`}
            </div>
            <div className={props.styles.authorDisplayName}>
                {fp.get('displayName')(author)}
            </div>
            <div className={props.styles.authorEmail}>
                {fp.get('email')(author)}
            </div>
        </div>
    );

    if (props.type === appConstants.resultHistoryTypes.TRIGGER_WEEK) {
        return (
            <div className={props.styles.triggerWeekWrapper}>
                <div className={props.styles.triggerWeekHeader}>
                    {`Trigger Week ${props.week}`}
                </div>
                {RenderAuthor}
            </div>
        );
    }

    if (props.type === appConstants.resultHistoryTypes.STANDARD_RESULT) {
        return (
            <div className={props.styles.standardResultWrapper}>
                <div className={props.styles.standardResultHeader}>
                    {`Standard Result - Week ${props.week} - ${props.teamName}`}
                </div>
                {RenderAuthor}
                <div className={props.styles.separator} />
                <div className={props.styles.motmDotd}>
                    {props.manOfTheMatch && (
                        <div className={props.styles.manOfTheMatchWrapper}>
                            <div className={props.styles.motmTitle}>
                                Man of the Match:
                            </div>
                            <div className={props.styles.motmValue}>
                                {fp.get('name')(props.manOfTheMatch)}
                            </div>
                        </div>
                    )}

                    {props.dickOfTheDay && (
                        <div className={props.styles.dickOfTheDayWrapper}>
                            <div className={props.styles.dotdTitle}>
                                Dick of the Day:
                            </div>
                            <div className={props.styles.dotdValue}>
                                {fp.get('name')(props.dickOfTheDay)}
                            </div>
                        </div>
                    )}
                </div>
                <div className={props.styles.extraResultsInfo}>
                    <div>
                        <div className={props.styles.goalsTitle}>
                            Goals
                        </div>
                        {props.goals.map(goal => (
                            <div
                                key={goal.id + goal.name + goal.amount}
                                className={props.styles.goalName}
                            >
                                {`${goal.name} (${goal.amount})`}
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className={props.styles.assistsTitle}>
                            Assists
                        </div>
                        {props.assists.map(assist => (
                            <div
                                key={assist.id + assist.name + assist.amount}
                                className={props.styles.assistName}
                            >
                                {`${assist.name} (${assist.amount})`}
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className={props.styles.cleanSheetsTitle}>
                            Clean Sheets
                        </div>
                        {props.cleanSheets.map(cleanSheet => (
                            <div
                                key={cleanSheet.id + cleanSheet.name}
                                className={props.styles.cleanSheetName}
                            >
                                {`${cleanSheet.name}`}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const getStat = (key, title, isOld) => {
        if (fp.has(key)(update) && fp.get(key)(update) !== fp.get(key)(oldStats)) {
            return (
                <div className={props.styles.stat}>
                    <div className={props.styles.statTitle}>
                        {`${title}:`}
                    </div>
                    <div className={props.styles.statValue}>
                        {fp.get(key)(isOld ? oldStats : update).toString()}
                    </div>
                </div>
            );
        }
        return null;
    };

    if (props.type === appConstants.resultHistoryTypes.EDIT_STATS) {
        return (
            <div className={props.styles.editStatsWrapper}>
                <div className={props.styles.editStatsHeader}>
                    {`Editing Stats - Week ${props.week} - ${props.name}`}
                </div>
                {RenderAuthor}
                <div className={props.styles.separator} />
                <div className={props.styles.editStatsInfo}>
                    <div>
                        <div className={props.styles.oldStatsHeader}>
                            Old Stats
                        </div>
                        {getStat('goals', 'Goals', true)}
                        {getStat('assists', 'Assists', true)}
                        {getStat('cleanSheet', 'Clean Sheet', true)}
                        {getStat('manOfTheMatch', 'Man of the Match', true)}
                        {getStat('dickOfTheDay', 'Dick of the Day', true)}
                        {getStat('yellowCard', 'Yellow Card', true)}
                        {getStat('redCard', 'Red Card', true)}
                        {getStat('penaltyMisses', 'Penalty Misses', true)}
                        {getStat('penaltySaves', 'Penalty Saves', true)}
                        {getStat('ownGoals', 'Own Goals', true)}
                    </div>

                    <div>
                        <div className={props.styles.newStatsHeader}>
                            New Stats
                        </div>
                        {getStat('goals', 'Goals', false)}
                        {getStat('assists', 'Assists', false)}
                        {getStat('cleanSheet', 'Clean Sheet', false)}
                        {getStat('manOfTheMatch', 'Man of the Match', false)}
                        {getStat('dickOfTheDay', 'Dick of the Day', false)}
                        {getStat('yellowCard', 'Yellow Card', false)}
                        {getStat('redCard', 'Red Card', false)}
                        {getStat('penaltyMisses', 'Penalty Misses', false)}
                        {getStat('penaltySaves', 'Penalty Saves', false)}
                        {getStat('ownGoals', 'Own Goals', false)}
                    </div>
                </div>
            </div>
        );
    }

    const extraStat = (key, title) => {
        if (fp.get(key)(props)) {
            return (
                <div className={props.styles.stat}>
                    <div className={props.styles.statTitle}>
                        {`${title}:`}
                    </div>
                    <div className={props.styles.statValue}>
                        {fp.flow(fp.get(key), fp.get('name'))(props)}
                    </div>
                </div>
            );
        }
        return null;
    };

    if (props.type === appConstants.resultHistoryTypes.EXTRA_STATS) {
        return (
            <div className={props.styles.extraStatsWrapper}>
                <div className={props.styles.extraStatsHeader}>
                    {`Extra Stats - Week ${props.week}`}
                </div>
                {RenderAuthor}
                <div className={props.styles.separator} />
                {extraStat('ownGoal', 'Own Goal')}
                {extraStat('yellowCard', 'Yellow Card')}
                {extraStat('redCard', 'Red Card')}
                {extraStat('penaltyMissed', 'Penalties Missed')}
                {extraStat('penaltySaved', 'Penalties Saved')}
            </div>
        );
    }

    return (
        <div>
            An error has occured
        </div>
    );
};

Update.defaultProps = {
    assists: [],
    author: {
        displayName: '',
        email: '',
        uid: ''
    },
    cleanSheets: [],
    date: null,
    dickOfTheDay: null,
    goals: [],
    manOfTheMatch: null,
    name: '',
    oldStats: null,
    styles: defaultStyles,
    teamName: '',
    type: null,
    update: null,
    week: 0
};

Update.propTypes = {
    assists: PropTypes.arrayOf(PropTypes.shape({
        amount: PropTypes.number,
        id: PropTypes.string,
        name: PropTypes.string
    })),
    author: PropTypes.shape({
        displayName: PropTypes.string,
        email: PropTypes.string,
        uid: PropTypes.string
    }),
    cleanSheets: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
    })),
    date: PropTypes.shape({
        seconds: PropTypes.number
    }),
    dickOfTheDay: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
    }),
    goals: PropTypes.arrayOf(PropTypes.shape({
        amount: PropTypes.number,
        id: PropTypes.string,
        name: PropTypes.string
    })),
    manOfTheMatch: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
    }),
    name: PropTypes.string,
    oldStats: PropTypes.shape({
        assists: PropTypes.number,
        cleanSheet: PropTypes.bool,
        dickOfTheDay: PropTypes.bool,
        goals: PropTypes.number,
        manOfTheMatch: PropTypes.bool,
        ownGoals: PropTypes.number,
        penaltyMisses: PropTypes.number,
        penaltySaves: PropTypes.number,
        redCard: PropTypes.bool,
        yellowCard: PropTypes.bool
    }),
    styles: PropTypes.objectOf(PropTypes.string),
    teamName: PropTypes.string,
    type: PropTypes.string,
    update: PropTypes.shape({
        assists: PropTypes.number,
        cleanSheet: PropTypes.bool,
        dickOfTheDay: PropTypes.bool,
        goals: PropTypes.number,
        manOfTheMatch: PropTypes.bool,
        ownGoals: PropTypes.number,
        penaltyMisses: PropTypes.number,
        penaltySaves: PropTypes.number,
        redCard: PropTypes.bool,
        yellowCard: PropTypes.bool
    }),
    week: PropTypes.number
};

export default Update;
