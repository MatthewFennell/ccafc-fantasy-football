import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './Testing.module.scss';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import {
    createLeague, fetchLeagues, joinLeague, increaseScore, increaseMyScore, createTeam,
    createPlayer, fetchPlayers, addPlayerToActiveTeam
} from './actions';
import * as selectors from './selectors';

const Testing = props => {
    const [leagueName, setLeagueName] = useState('');
    const [pointsToIncrease, setPointsToIncrease] = useState(0);
    const [playerName, setPlayerName] = useState('');
    const [playerPosition, setPlayerPosition] = useState('');
    const [playerPrice, setPlayerPrice] = useState('');
    const [playerTeam, setPlayerTeam] = useState('');
    const [teamName, setTeamName] = useState('');

    useEffect(() => {
        props.fetchLeagues();
        props.fetchPlayers();
    }, [props.fetchLeagues, props.fetchPlayers]);

    const makeLeague = useCallback(() => {
        props.createLeague(leagueName);
    }, [leagueName, props]);

    const makeTeam = useCallback(() => {
        props.createTeam(teamName);
    }, [teamName, props.createTeam]);

    const makePlayer = useCallback(() => {
        props.createPlayer(playerName, playerPosition, playerPrice, playerTeam);
    }, [playerName, playerPosition, playerPrice, playerTeam, props.createPlayer]);

    return (
        <div className={props.styles.testingWrapper}>
            <Button
                onClick={makeLeague}
                text="CreateLeague"
            />
            <div className={props.styles.textInputWrapper}>
                <TextInput onChange={setLeagueName} />
            </div>

            <div className={props.styles.allLeagues}>
      All leagues
                {props.allLeagues.map(league => (
                    <div role="button" tabIndex={0} key={league.league_name} onClick={() => props.joinLeague(league.league_id)}>
        League:
                        {' '}
                        {league.league_name}
                    </div>
                ))}
            </div>

            <div className={props.styles.myLeagues}>
        Leagues I am in
                {props.leaguesIAmIn.map(league => (
                    <>
                        <div className={props.styles.myLeagueRow} key={league.league_name}>
          League:
                            {' '}
                            {league.league_name}
                            {' '}
          Points:
                            {' '}
                            {league.user_points}
                            <div className={props.styles.textBoxForPoints}>
                                <Button
                                    onClick={() => props.increaseScore(parseInt(
                                        pointsToIncrease, 10
                                    ), league.league_id)}
                                    text="Add points to this league"
                                />
                            </div>
                        </div>

                    </>
                ))}
            </div>
            <div className={props.styles.addPointsText}>
                <TextInput onChange={setPointsToIncrease} />
            </div>
            <Button
                onClick={() => props.increaseMyScore(parseInt(pointsToIncrease, 10))}
                text="Add points to me"
            />

            <hr />
            <div className={props.styles.createPlayerName}>
      Create Player
                <div className={props.styles.playerNameTextbox}>
          Name:
                    {' '}
                    <TextInput onChange={setPlayerName} />
                </div>
                <div className={props.styles.playerNameTextbox}>
          Position:
                    {' '}
                    <TextInput onChange={setPlayerPosition} />
                </div>
                <div className={props.styles.playerNameTextbox}>
          Price:
                    {' '}
                    <TextInput onChange={setPlayerPrice} />
                </div>
                <div className={props.styles.playerNameTextbox}>
          Team:
                    {' '}
                    <TextInput onChange={setPlayerTeam} />
                </div>
                <Button
                    onClick={makePlayer}
                    text="Create Player"
                />
            </div>
            <hr />
            <div className={props.styles.createPlayerName}>
      Create Team
                <div className={props.styles.playerNameTextbox}>
          TeamName:
                    {' '}
                    <TextInput onChange={setTeamName} />
                </div>
                <Button
                    onClick={makeTeam}
                    text="Create Team"
                />
            </div>
            <hr />
            <div className={props.styles.allPlayers}>
                All players
                {props.allPlayers.map(player => (
                    <div role="button" tabIndex={0} key={player.id} onClick={() => props.addPlayerToActiveTeam(player.id)}>
                    Player:
                        {' '}
                        {player.name}
                        {' Team - '}
                        {player.team}
                    </div>
                ))}
            </div>
        </div>
    );
};

Testing.defaultProps = {
    allLeagues: [],
    allPlayers: [],
    leaguesIAmIn: [],
    styles: defaultStyles
};

Testing.propTypes = {
    addPlayerToActiveTeam: PropTypes.func.isRequired,
    allLeagues: PropTypes.arrayOf(PropTypes.shape({})),
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    createLeague: PropTypes.func.isRequired,
    createPlayer: PropTypes.func.isRequired,
    createTeam: PropTypes.func.isRequired,
    fetchLeagues: PropTypes.func.isRequired,
    fetchPlayers: PropTypes.func.isRequired,
    increaseMyScore: PropTypes.func.isRequired,
    increaseScore: PropTypes.func.isRequired,
    joinLeague: PropTypes.func.isRequired,
    leaguesIAmIn: PropTypes.arrayOf(PropTypes.shape({})),
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    addPlayerToActiveTeam,
    createLeague,
    createPlayer,
    createTeam,
    fetchLeagues,
    fetchPlayers,
    increaseMyScore,
    increaseScore,
    joinLeague
};

const mapStateToProps = state => ({
    allLeagues: selectors.getAllLeagues(state),
    allPlayers: selectors.getAllPlayers(state),
    auth: state.firebase.auth,
    leaguesIAmIn: selectors.getLeagueIAmIn(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Testing);
