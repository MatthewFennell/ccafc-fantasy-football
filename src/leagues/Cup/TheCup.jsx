import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import defaultStyles from './TheCup.module.scss';
import WeekInfo from './WeekInfo';

const TheCup = props => {
    const { displayNameMappings, ...rest } = props.cup;

    return (
        <>
            <div className={props.styles.cupDescription}>
                <div className={props.styles.cupHeader}>
                    The Cup
                </div>
                <div className={props.styles.infoWrapper}>
                    <ul>
                        <li>The Cup will start in week 3</li>
                        <li>Players will randomly be assigned byes to fix the number of playerss</li>
                        <li>Must get the more points than your opponent to go through</li>
                        <li>Ties result in both players being eliminated</li>
                    </ul>
                </div>
            </div>
            {Object.keys(rest).reverse().map(key => (
                <WeekInfo
                    byes={fp.get('byes')(props.cup[key])}
                    displayNameMappings={displayNameMappings}
                    week={key}
                    pairings={fp.get('pairings')(props.cup[key])}
                />
            ))}
        </>
    );
};

TheCup.defaultProps = {
    cup: {
        displayNameMappings: {}
    },
    styles: defaultStyles
};

TheCup.propTypes = {
    cup: PropTypes.shape({
        displayNameMappings: PropTypes.shape({ })
    }),
    styles: PropTypes.objectOf(PropTypes.string)
};

export default TheCup;
