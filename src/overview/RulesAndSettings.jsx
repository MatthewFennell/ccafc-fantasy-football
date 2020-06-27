/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import defaultStyles from './RulesAndSettings.module.scss';

const RulesAndSettings = props => {
    const makePointsEntry = (label, points) => (
        <div className={props.styles.pointsEntryWrapper}>
            <div>{`${label}: `}</div>

            <div className={props.styles.pointsValue}>
                <div>{points}</div>
            </div>
        </div>
    );

    return (
        <div className={props.styles.rulesAndSettingWrapper}>
            <div className={props.styles.rules}>
                <ul>
                    <li>Unlimited transfers</li>
                    <li>Maxiumum of 3 players per team</li>
                    <li>Prices not in effect this year. Points this year will dictate future price</li>
                    <li>Please report any bugs on the Features page</li>
                </ul>
            </div>
            <div className={props.styles.prices}>
                {props.isTwoColumns ? (
                    <>
                        <div>
                            {makePointsEntry('Goal (Def)', 6)}
                            {makePointsEntry('Goal (Gk)', 6)}
                            {makePointsEntry('Goal (Mid)', 5)}
                            {makePointsEntry('Goal (Atk)', 4)}
                            {makePointsEntry('Assist', 3)}
                            {makePointsEntry('Clean Sheet (Gk)', 6)}
                            {makePointsEntry('Clean Sheet (Def)', 4)}
                            {makePointsEntry('Clean Sheet (Mid)', 1)}
                        </div>
                        <div>
                            {makePointsEntry('Man of the match', 3)}
                            {makePointsEntry('Dick of the day', -3)}
                            {makePointsEntry('Penalty Save', 3)}
                            {makePointsEntry('Penalty Miss', -3)}
                            {makePointsEntry('Yellow Card', -1)}
                            {makePointsEntry('Red Card', -3)}
                            {makePointsEntry('Own Goal', -2)}
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            {makePointsEntry('Goal (Def)', 6)}
                            {makePointsEntry('Goal (Gk)', 6)}
                            {makePointsEntry('Goal (Mid)', 5)}
                            {makePointsEntry('Goal (Atk)', 4)}
                            {makePointsEntry('Assist', 3)}
                        </div>
                        <div>
                            {makePointsEntry('Clean Sheet (Gk)', 6)}
                            {makePointsEntry('Clean Sheet (Def)', 4)}
                            {makePointsEntry('Clean Sheet (Mid)', 1)}
                            {makePointsEntry('Man of the match', 3)}
                            {makePointsEntry('Dick of the day', -3)}
                        </div>
                        <div>
                            {makePointsEntry('Penalty Save', 3)}
                            {makePointsEntry('Penalty Miss', -3)}
                            {makePointsEntry('Yellow Card', -1)}
                            {makePointsEntry('Red Card', -3)}
                            {makePointsEntry('Own Goal', -2)}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

RulesAndSettings.defaultProps = {
    isTwoColumns: false,
    styles: defaultStyles
};

RulesAndSettings.propTypes = {
    isTwoColumns: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default RulesAndSettings;
