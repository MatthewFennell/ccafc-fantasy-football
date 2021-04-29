import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash';
import defaultStyles from './NextMatch.module.scss';
import * as helpers from '../../helperFunctions';
import Spinner from '../../common/spinner/Spinner';

const teamMappings = {
    'A Team': `${process.env.REACT_APP_COLLEGE_NAME} A`,
    'B Team': `${process.env.REACT_APP_COLLEGE_NAME} B`,
    'C Team': `${process.env.REACT_APP_COLLEGE_NAME} C`,
    'D Team': `${process.env.REACT_APP_COLLEGE_NAME} D`,
    'E Team': `${process.env.REACT_APP_COLLEGE_NAME} E`,
    'F Team': `${process.env.REACT_APP_COLLEGE_NAME} F`,
    'G Team': `${process.env.REACT_APP_COLLEGE_NAME} G`,
    'H Team': `${process.env.REACT_APP_COLLEGE_NAME} H`,
    'I Team': `${process.env.REACT_APP_COLLEGE_NAME} I`,
    'J Team': `${process.env.REACT_APP_COLLEGE_NAME} J`,
    'K Team': `${process.env.REACT_APP_COLLEGE_NAME} K`,
    'L Team': `${process.env.REACT_APP_COLLEGE_NAME} L`,
    'M Team': `${process.env.REACT_APP_COLLEGE_NAME} M`,
    'N Team': `${process.env.REACT_APP_COLLEGE_NAME} N`
};

const NextMatch = props => {
    const findNextMatchPerTeam = (nextMatches, playerTeam, loadingFixtures) => {
        const team = teamMappings[playerTeam] ?? playerTeam;
        if (loadingFixtures) {
            return <div className={props.styles.spinnerWrapper}><Spinner size={20} /></div>;
        }
        const match = nextMatches.find(x => x.teamOne === team);
        if (match) {
            return match.teamTwo;
        }

        const matchTwo = nextMatches.find(x => x.teamTwo === team);
        if (matchTwo) {
            return matchTwo.teamOne;
        }

        return 'No match';
    };

    useEffect(() => {
        props.fetchFixturesRequest();
        // eslint-disable-next-line
    }, [props.fetchFixturesRequest]);

    const nextMatchPerTeam = helpers.getNextMatchPerTeam(props.fixtures,
        process.env.REACT_APP_COLLEGE_NAME);
    return (
        <div className={props.styles.nextMatchesWrapper}>
            <div className={props.styles.nextFixturesWrapper}>Next Fixtures</div>
            {props.players.map(player => (
                <div className={props.styles.rowWrapper} key={player.id}>
                    <div className={props.styles.name}>
                        {player.name}
                    </div>

                    <div className={props.styles.team}>
                        {findNextMatchPerTeam(nextMatchPerTeam, player.team, props.loadingFixtures)}
                    </div>
                </div>
            ))}
        </div>
    );
};

NextMatch.defaultProps = {
    fetchFixturesRequest: noop,
    fixtures: [],
    loadingFixtures: false,
    players: [],
    styles: defaultStyles
};

NextMatch.propTypes = {
    fetchFixturesRequest: PropTypes.func,
    fixtures: PropTypes.arrayOf(PropTypes.shape({

    })),
    loadingFixtures: PropTypes.bool,
    players: PropTypes.arrayOf(PropTypes.shape({

    })),
    styles: PropTypes.objectOf(PropTypes.string)
};

export default NextMatch;
