import PropTypes from 'prop-types';
import React from 'react';
import defaultStyles from './ResultsHistory.module.scss';
import Update from './Update';

const ResultsHistory = props => {
    if (props.resultsHistory && props.resultsHistory.length === 0) {
        return (
            <div className={props.styles.noUpdates}>
                No updates have been made yet
            </div>
        );
    }

    return (
        <div className={props.styles.updatesWrapper}>
            {props.resultsHistory.map(history => (
                <Update
                    assists={history.assists}
                    author={history.author}
                    cleanSheets={history.cleanSheets}
                    date={history.date}
                    dickOfTheDay={history.dickOfTheDay}
                    goals={history.goals}
                    key={history.date.toString()}
                    manOfTheMatch={history.manOfTheMatch}
                    name={history.name}
                    oldStats={history.oldStats}
                    ownGoal={history.ownGoal}
                    penaltyMissed={history.penaltyMissed}
                    penaltySaved={history.penaltySaved}
                    redCard={history.redCard}
                    teamName={history.teamName}
                    type={history.type}
                    update={history.update}
                    yellowCard={history.yellowCard}
                    week={history.week}
                />
            ))}
        </div>
    );
};

ResultsHistory.defaultProps = {
    resultsHistory: [],
    styles: defaultStyles
};

ResultsHistory.propTypes = {
    resultsHistory: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.shape({
            displayName: PropTypes.string,
            email: PropTypes.string,
            uid: PropTypes.string
        }),
        type: PropTypes.string,
        week: PropTypes.number
    })),
    styles: PropTypes.objectOf(PropTypes.string)
};

export default ResultsHistory;
