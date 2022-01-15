import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import fp from 'lodash/fp';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/spinner/Spinner';
import Tabs from '../common/tabs/Tabs';
import materialStyles from '../materialStyles';
import { fetchCupRequest } from './actions';
import defaultStyles from './TheCup.module.scss';
import WeekInfo, { getName } from './WeekInfo';

const TheCup = props => {
    const [isViewingFirstCup, setIsViewingFirstCup] = React.useState(!props.cup.cup?.hasFinished);

    useEffect(() => {
        if (props.cup.cup?.hasFinished) {
            setIsViewingFirstCup(false);
        }
    }, [props.cup]);

    const handleChange = (ev, newValue) => {
        if (newValue) {
            setIsViewingFirstCup(false);
        } else {
            setIsViewingFirstCup(true);
        }
    };

    const cupToUse = isViewingFirstCup ? props.cup.cup : props.cup.cupTwo;

    const {
        displayNameMappings, hasFinished, winner, ...rest
    } = cupToUse;

    const classes = makeStyles(materialStyles)();

    useEffect(() => {
        props.fetchCupRequest();
        // eslint-disable-next-line
    }, [props.fetchCupRequest]);

    const generateNextPairings = pairings => (pairings ? Object.keys(pairings)
        .reduce((acc, key) => [...acc, pairings[key].playerOneId,
            pairings[key].playerTwoId], []) : []);

    return (
        <>
            <div className={props.styles.cupWrapper}>
                <Paper
                    elevation={4}
                    className={classes.paper}
                >
                    {props.cup.cup?.hasFinished
                    && (
                        <div className={props.styles.tabsWrapper}>
                            <Tabs options={['First Cup', 'Second Cup']} handleChange={handleChange} value={isViewingFirstCup ? 0 : 1} />
                        </div>
                    )}
                    <div className={props.styles.cupHeader}>
                        The Cup
                    </div>
                    <div className={props.styles.infoWrapper}>
                        <div>
                            <ul className={props.styles.cupInfo}>
                                <li>The Cup will start in week 2</li>
                                <li>
                                    Players will randomly be assigned
                                    byes to fix the number of players
                                </li>
                                <li>Must get more points than your opponent to go through</li>
                                <li>Ties result in both players being eliminated</li>
                                <li>Must score more than 0 points in Week 1 to take part</li>
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
                </Paper>
                {props.isFetchingCup && (
                    <div className={props.styles.loadingSpinner}>
                        <Spinner color="secondary" />
                    </div>
                )}
                {Object.keys(rest).reverse().map((key, index) => (
                    <WeekInfo
                        auth={props.auth}
                        byes={fp.get('byes')(cupToUse[key])}
                        displayNameMappings={displayNameMappings}
                        week={Number(key)}
                        pairings={fp.get('pairings')(cupToUse[key])}
                        nextByes={fp.get('byes')(cupToUse[Number(key) + 1])}
                        nextPlayersInPairings={generateNextPairings(fp.get('pairings')(cupToUse[Number(key) + 1]))}
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
    cup: {
        cup: {},
        cupTwo: {}
    },
    isFetchingCup: false,
    styles: defaultStyles
};

TheCup.propTypes = {
    auth: PropTypes.shape({
        uid: PropTypes.string
    }),
    cup: PropTypes.shape({
        cup: PropTypes.shape({
            displayNameMappings: PropTypes.shape({ }),
            hasFinished: PropTypes.bool,
            winner: PropTypes.string
        }),
        cupTwo: PropTypes.shape({
            displayNameMappings: PropTypes.shape({ }),
            hasFinished: PropTypes.bool,
            winner: PropTypes.string
        })
    }),
    fetchCupRequest: PropTypes.func.isRequired,
    isFetchingCup: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    cup: state.cup,
    isFetchingCup: state.cup.isFetchingCup
});

const mapDispatchToProps = {
    fetchCupRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(TheCup);

export { TheCup as TheCupUnconnected };
