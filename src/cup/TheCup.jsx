import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import fp from 'lodash/fp';
import PropTypes from 'prop-types';
import { fetchCupRequest } from './actions';
import defaultStyles from './TheCup.module.scss';
import WeekInfo, { getName } from './WeekInfo';
import Spinner from '../common/spinner/Spinner';

const TheCup = props => {
    const {
        displayNameMappings, hasFinished, winner, ...rest
    } = props.cup;

    useEffect(() => {
        props.fetchCupRequest();
        // eslint-disable-next-line
    }, [props.fetchCupRequest]);

    return (
        <>
            <div className={props.styles.cupWrapper}>
                <div className={props.styles.cupDescription}>
                    <div className={props.styles.cupHeader}>
                        The Cup
                    </div>
                    <div className={props.styles.infoWrapper}>
                        <div>
                            <ul className={props.styles.cupInfo}>
                                <li>The Cup will start in week 3</li>
                                <li>
                                    Players will randomly be assigned
                                    byes to fix the number of players
                                </li>
                                <li>Must get the more points than your opponent to go through</li>
                                <li>Ties result in both players being eliminated</li>
                                <li>Must score more than 0 points in Week 2 to take part</li>
                            </ul>
                        </div>
                        {hasFinished && (
                            <div className={props.styles.cupWinnerWrapper}>
                                <div>Cup Finished!</div>

                                <div className={props.styles.cupWinnerValue}>
                                    <div>{`Winner: ${getName(displayNameMappings, winner)}`}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {props.isFetchingCup && (
                    <div className={props.styles.loadingSpinner}>
                        <Spinner color="secondary" />
                    </div>
                )}
                {Object.keys(rest).reverse().map((key, index) => (
                    <WeekInfo
                        auth={props.auth}
                        byes={fp.get('byes')(props.cup[key])}
                        displayNameMappings={displayNameMappings}
                        week={Number(key)}
                        pairings={fp.get('pairings')(props.cup[key])}
                        isFinalWeek={index === 0 && hasFinished === false}
                        key={key}
                    />
                ))}
            </div>
        </>
    );
};

TheCup.defaultProps = {
    auth: {
        uid: ''
    },
    cup: {},
    isFetchingCup: false,
    styles: defaultStyles
};

TheCup.propTypes = {
    auth: PropTypes.shape({
        uid: PropTypes.string
    }),
    cup: PropTypes.shape({
        displayNameMappings: PropTypes.shape({ }),
        hasFinished: PropTypes.bool,
        winner: PropTypes.string
    }),
    fetchCupRequest: PropTypes.func.isRequired,
    isFetchingCup: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    cup: state.cup.cup,
    isFetchingCup: state.cup.isFetchingCup
});

const mapDispatchToProps = {
    fetchCupRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(TheCup);

export { TheCup as TheCupUnconnected };
