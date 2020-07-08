import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash';
import defaultStyles from './NextMatch.module.scss';
import * as helpers from '../../helperFunctions';
import Spinner from '../../common/spinner/Spinner';

const NextMatch = props => {
    const findNextMatchPerTeam = (nextMatches, playerTeam, loadingFixtures) => {
        if (loadingFixtures) {
            return <div className={props.styles.spinnerWrapper}><Spinner size={20} /></div>;
        }
        const match = nextMatches.find(x => x.teamOne === playerTeam);
        if (match) {
            return match.teamTwo;
        }

        const matchTwo = nextMatches.find(x => x.teamTwo === playerTeam);
        if (matchTwo) {
            return matchTwo.teamOne;
        }

        return 'No match';
    };

    useEffect(() => {
        props.fetchFixturesRequest();
        // eslint-disable-next-line
    }, [props.fetchFixturesRequest]);

    const nextMatchPerTeam = helpers.getNextMatchPerTeam(props.fixtures, 'Collingwood');
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
