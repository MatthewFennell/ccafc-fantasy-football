import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import defaultStyles from './WeekInfo.module.scss';
import FadingCollapsable from '../common/fadingCollapsable/FadingCollapsable';

export const getName = (displayNameMappings, name) => displayNameMappings[name];

const WeekInfo = props => {
    const generateByesColumns = (byes, numColumns) => {
        const columns = {

        };

        for (let x = 0; x < numColumns; x += 1) {
            columns[x] = [];
        }

        byes.forEach((bye, index) => {
            const columnOfInterest = index % numColumns;
            columns[columnOfInterest].push(getName(props.displayNameMappings, bye));
        });

        return columns;
    };

    const numByesColumns = 2;
    const byesColumns = generateByesColumns(props.byes, numByesColumns);

    return (
        <FadingCollapsable
            title={(
                <div className={props.styles.matchupsHeader}>
                    {`Week ${props.week} ${props.isFinalWeek ? 'Matchups' : 'Results'}`}
                </div>
            )}
            isBigSideMargins
        >
            <div className={props.styles.weekInfoWrapper}>
                {props.byes.length > 0 && (
                    <>
                        <div className={props.styles.byesHeader}>
                            These users have byes this cup round
                        </div>

                        <div className={props.styles.byesWrapper}>
                            {Object.keys(byesColumns).map(items => (
                                <div key={items}>
                                    {byesColumns[items].map(bye => (
                                        <div className={props.styles.bye} key={bye}>
                                            {bye}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <div className={props.styles.matchupsHeader}>
                    {`Week ${props.week} Matchups`}
                </div>
                <div className={props.styles.matchupsWrapper}>
                    {props.pairings.map(pairing => (
                        <div className={props.styles.pairingWrapper} key={pairing.playerOneId}>
                            <div className={classNames({
                                [props.styles.pairingItem]: true,
                                [props.styles.winningPlayer]: pairing.playerOneScore
                            >= pairing.playerTwoScore
                            })}
                            >
                                {getName(props.displayNameMappings, pairing.playerOneId)}
                                {_.has(pairing, 'playerOneScore') && (
                                    <div className={props.styles.pointsValue}>
                                        {`(${pairing.playerOneScore})`}
                                    </div>
                                )}
                            </div>
                            <div className={classNames({
                                [props.styles.pairingItem]: true,
                                [props.styles.winningPlayer]: pairing.playerTwoScore
                            >= pairing.playerOneScore
                            })}
                            >
                                {getName(props.displayNameMappings, pairing.playerTwoId)}
                                {_.has(pairing, 'playerTwoScore') && (
                                    <div className={props.styles.pointsValue}>
                                        {`(${pairing.playerTwoScore})`}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </FadingCollapsable>
    );
};

WeekInfo.defaultProps = {
    byes: PropTypes.arrayOf(PropTypes.string),
    displayNameMappings: {},
    isFinalWeek: false,
    pairings: [],
    styles: defaultStyles,
    week: 0
};

WeekInfo.propTypes = {
    byes: PropTypes.arrayOf(PropTypes.string),
    displayNameMappings: PropTypes.shape({}),
    isFinalWeek: PropTypes.bool,
    pairings: PropTypes.arrayOf(PropTypes.shape({})),
    styles: PropTypes.objectOf(PropTypes.string),
    week: PropTypes.number
};

export default WeekInfo;
