import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import defaultStyles from './Testing.module.scss';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import {
    createLeague, fetchLeagues, joinLeague, increaseScore, increaseMyScore, createTeam,
    createPlayer, fetchPlayers, addPlayerToActiveTeam, triggerWeeklyTeams, fetchWeeklyTeams,
    addPointsToPlayer, fetchWeeklyPlayersForUserForWeek, setActiveTeam, fetchMyActiveTeam
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
    const [currentWeek, setCurrentWeek] = useState(0);
    const [pointsToAddToPlayer, setPointsToAddToPlayer] = useState(0);
    const [weekToAddPointsTo, setWeekToAddPointsTo] = useState(0);
    const [playersForActiveTeam, setPlayersForActiveTeam] = useState([]);

    const [playersToRemoveFromActiveTeam, setPlayersToRemoveFromActiveTeam] = useState([]);


    useEffect(() => {
        props.fetchLeagues();
        props.fetchPlayers();
        props.fetchWeeklyTeams();
        props.fetchWeeklyPlayersForUserForWeek('replacemeinsaga', 0);
        props.fetchMyActiveTeam();
    }, [props.fetchLeagues, props.fetchPlayers, props.fetchWeeklyTeams,
        props.fetchWeeklyPlayersForUserForWeek, props.fetchMyActiveTeam]);

    const makeLeague = useCallback(() => {
        props.createLeague(leagueName);
    }, [leagueName, props]);

    const makeTeam = useCallback(() => {
        props.createTeam(teamName);
    }, [teamName, props.createTeam]);

    const makePlayer = useCallback(() => {
        props.createPlayer(playerName, playerPosition, parseInt(playerPrice, 10), playerTeam);
    }, [playerName, playerPosition, playerPrice, playerTeam, props.createPlayer]);

    const addOrRemovePlayerForActiveTeam = playerId => {
        setPlayersToRemoveFromActiveTeam(playersToRemoveFromActiveTeam.filter(x => x !== playerId));
        if (playersForActiveTeam.includes(playerId)) {
            setPlayersForActiveTeam(playersForActiveTeam.filter(x => x !== playerId));
        } else {
            setPlayersForActiveTeam(playersForActiveTeam.concat([playerId]));
        }
    };

    const doubleClickRemove = playerId => {
        setPlayersForActiveTeam(playersForActiveTeam.filter(x => x !== playerId));
        if (playersToRemoveFromActiveTeam.includes(playerId)) {
            setPlayersToRemoveFromActiveTeam(playersToRemoveFromActiveTeam.filter(x => x !== playerId));
        } else {
            setPlayersToRemoveFromActiveTeam(playersToRemoveFromActiveTeam.concat([playerId]));
        }
    };

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
                    <div role="button" tabIndex={0} key={league.id} onClick={() => props.joinLeague(league.league_id)}>
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
                        <div className={props.styles.myLeagueRow} key={league.id}>
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
                Number of players to add =
                {' '}
                {playersForActiveTeam.length}
                <br />
                Number of players to remove =
                {' '}
                {playersToRemoveFromActiveTeam.length}
                <Button
                    onClick={() => props.setActiveTeam(playersForActiveTeam, playersToRemoveFromActiveTeam)}
                    text="Set Active Team"
                />
                {props.allPlayers.map(player => (
                    <>
                        <div
                            className={classNames({
                                [props.styles.selected]: playersForActiveTeam.includes(player.id),
                                [props.styles.remove]: playersToRemoveFromActiveTeam.includes(player.id)
                            })}
                            role="button"
                            tabIndex={0}
                            key={player.id}
                            onClick={() => addOrRemovePlayerForActiveTeam(player.id)}
                            onDoubleClick={() => doubleClickRemove(player.id)}
                        >
                            {' '}
                            {player.name}
                            {', '}
                            {player.team}
                            {', '}
                            {player.position}
                            {', '}
                            {player.price}

                        </div>
                    </>
                ))}
            </div>
            <hr />
            <div className={props.styles.triggerWeeklyTeams}>
                <Button
                    onClick={() => props.triggerWeeklyTeams(parseInt(currentWeek, 10))}
                    text="Trigger Weekly Teams"
                />

                <div className={props.styles.addPointsToPlayerTextInput}>
                Points to add to player
                    <TextInput onChange={setPointsToAddToPlayer} />
                </div>
                <div className={props.styles.addPointsToPlayerTextInput}>
                Week to add points to
                    <TextInput onChange={setWeekToAddPointsTo} />
                </div>
                <div className={props.styles.triggerWeeklyTeamsInput}>
                Current week
                    {' '}
                    <TextInput onChange={setCurrentWeek} />
                </div>
            </div>
            <div className={props.styles.myActiveTeam}>
                My Active team
                {props.activeTeam.map(player => (
                    <div>
                        {player.name}
                        {', '}
                        {player.position}
                        {', '}
                        {player.price}

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
    myWeeklyTeams: [],
    styles: defaultStyles
};

Testing.propTypes = {
    addPlayerToActiveTeam: PropTypes.func.isRequired,
    addPointsToPlayer: PropTypes.func.isRequired,
    activeTeam: PropTypes.arrayOf(PropTypes.shape({})),
    allLeagues: PropTypes.arrayOf(PropTypes.shape({})),
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    createLeague: PropTypes.func.isRequired,
    createPlayer: PropTypes.func.isRequired,
    createTeam: PropTypes.func.isRequired,
    fetchLeagues: PropTypes.func.isRequired,
    fetchPlayers: PropTypes.func.isRequired,
    fetchWeeklyTeams: PropTypes.func.isRequired,
    increaseMyScore: PropTypes.func.isRequired,
    fetchWeeklyPlayersForUserForWeek: PropTypes.func.isRequired,
    increaseScore: PropTypes.func.isRequired,
    joinLeague: PropTypes.func.isRequired,
    leaguesIAmIn: PropTypes.arrayOf(PropTypes.shape({})),
    myWeeklyTeams: PropTypes.arrayOf(PropTypes.shape({})),
    styles: PropTypes.objectOf(PropTypes.string),
    triggerWeeklyTeams: PropTypes.func.isRequired,
    fetchMyActiveTeam: PropTypes.func.isRequired,
    setActiveTeam: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    addPlayerToActiveTeam,
    addPointsToPlayer,
    createLeague,
    createPlayer,
    createTeam,
    fetchLeagues,
    fetchMyActiveTeam,
    fetchPlayers,
    fetchWeeklyTeams,
    increaseMyScore,
    fetchWeeklyPlayersForUserForWeek,
    increaseScore,
    joinLeague,
    triggerWeeklyTeams,
    setActiveTeam
};

const mapStateToProps = state => ({
    activeTeam: selectors.getActiveTeam(state),
    allLeagues: selectors.getAllLeagues(state),
    allPlayers: selectors.getAllPlayers(state),
    auth: state.firebase.auth,
    leaguesIAmIn: selectors.getLeagueIAmIn(state),
    myWeeklyTeams: selectors.getWeeklyTeams(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Testing);
