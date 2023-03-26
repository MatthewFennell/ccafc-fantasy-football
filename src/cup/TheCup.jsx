import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import fp from 'lodash/fp';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/spinner/Spinner';
import Tabs from '../common/tabs/Tabs';
import materialStyles from '../materialStyles';
import { fetchCupRequest, setAutoRenewCup } from './actions';
import defaultStyles from './TheCup.module.scss';
import WeekInfo, { getName } from './WeekInfo';
import * as constants from "../constants"


const TheCup = props => {
    const [cupBeingViewed, setCupBeingViewed] = React.useState(0);

    const getCupBeingViewed = () => {
        if (cupBeingViewed === 0) {
            return props.cup.cup
        }
        if (cupBeingViewed === 1) {
            return props.cup.cupTwo
        }
        return props.cup.cupThree
    }

    useEffect(() => {
        if (props.cup.cupTwo?.hasFinished && !_.isEmpty(props.cup.cupThree)) {
            setCupBeingViewed(2)
        }
        else if (props.cup.cup?.hasFinished && !_.isEmpty(props.cup.cupTwo)) {
            setCupBeingViewed(1);
        }
    }, [props.cup]);

    const handleChange = (ev, newValue) => {
        setCupBeingViewed(newValue)
    };

    const cupToUse = getCupBeingViewed()

    const {
        displayNameMappings, hasFinished, winner, isAutoRenew, ...rest
    } = cupToUse;

    const classes = makeStyles(materialStyles)();

    useEffect(() => {
        props.fetchCupRequest();
        // eslint-disable-next-line
    }, [props.fetchCupRequest]);

    const generateNextPairings = pairings => (pairings ? Object.keys(pairings)
        .reduce((acc, key) => [...acc, pairings[key].playerOneId,
            pairings[key].playerTwoId], []) : []);

    const onChange = (val) => {
        props.setAutoRenewCup(cupBeingViewed, !cupToUse?.isAutoRenew)
    }

    return (
        <>
            <div className={props.styles.cupWrapper}>
                <Paper
                    elevation={4}
                    className={classes.paper}
                >
                    {props.cup.cup?.hasFinished && !_.isEmpty(props.cup.cupTwo)
                    && (
                        <div className={props.styles.tabsWrapper}>
                            <Tabs options={_.isEmpty(props.cup.cupThree) ? ['First Cup', 'Second Cup'] 
                            : ['First Cup', 'Second Cup', 'Main Cup']} handleChange={handleChange} value={cupBeingViewed} />
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
            
            {props.userPermissions.includes(constants.PERMISSIONS.CREATE_PLAYER) && (
                <Paper  
                    elevation={4}
                    className={classes.paper}>
                    <div className={props.styles.autoRenewCup}>
                        <div>
                            Automatically renew cup (Admin use only)
                        </div>
                        <div>
                            Only if this is turned on, once this cup has finished, the next triggered week will create another cup (max 3 cups)
                        </div>
                        <div>
                            Make sure it's switched on for the latest cup if you want another cup
                        </div>
                        <Switch
                            checked={Boolean(cupToUse.isAutoRenew)}
                            onChange={onChange}
                            disabled={props.isFetchingCup}
                        />
                    </div>
                </Paper>
            )}
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
    styles: defaultStyles,
    userPermissions: [],
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
    styles: PropTypes.objectOf(PropTypes.string),
    userPermissions: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    cup: state.cup,
    isFetchingCup: state.cup.isFetchingCup,
    userPermissions: state.auth.userPermissions
});

const mapDispatchToProps = {
    setAutoRenewCup,
    fetchCupRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(TheCup);

export { TheCup as TheCupUnconnected };
