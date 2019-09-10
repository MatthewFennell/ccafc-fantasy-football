import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './Testing.module.scss';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import {
    createLeague, fetchLeagues, joinLeague, increaseScore, increaseMyScore, createTeam,
    createPlayer, fetchPlayers, addPlayerToActiveTeam, triggerWeeklyTeams, fetchWeeklyTeams,
    addPointsToPlayer
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

    useEffect(() => {
        props.fetchLeagues();
        props.fetchPlayers();
        props.fetchWeeklyTeams();
    }, [props.fetchLeagues, props.fetchPlayers, props.fetchWeeklyTeams]);

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
            <div className={props.styles.myWeeklyTeams}>

                {props.myWeeklyTeams.map(weeklyTeam => (
                    <div key={weeklyTeam.id}>

                    Week:
                        {' '}
                        {weeklyTeam.week}

                        <div>
                            {weeklyTeam.players.map(player => (
                                <div className={props.styles.weeklyTeamPlayer} key={player.player_Id}>
                                Player Name:
                                    {' '}
                                    {player.name}
                                    , Points -
                                    {' '}
                                    {player.points}
                                    <Button
                                        onClick={() => props.addPointsToPlayer(
                                            player.player_Id,
                                            parseInt(weekToAddPointsTo, 10),
                                            parseInt(pointsToAddToPlayer, 10)
                                        )}
                                        text="Add points"
                                    />
                                </div>
                            ))}
                        </div>
                        <hr />
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
    allLeagues: PropTypes.arrayOf(PropTypes.shape({})),
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    createLeague: PropTypes.func.isRequired,
    createPlayer: PropTypes.func.isRequired,
    createTeam: PropTypes.func.isRequired,
    fetchLeagues: PropTypes.func.isRequired,
    fetchPlayers: PropTypes.func.isRequired,
    fetchWeeklyTeams: PropTypes.func.isRequired,
    increaseMyScore: PropTypes.func.isRequired,
    increaseScore: PropTypes.func.isRequired,
    joinLeague: PropTypes.func.isRequired,
    leaguesIAmIn: PropTypes.arrayOf(PropTypes.shape({})),
    myWeeklyTeams: PropTypes.arrayOf(PropTypes.shape({})),
    styles: PropTypes.objectOf(PropTypes.string),
    triggerWeeklyTeams: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    addPlayerToActiveTeam,
    addPointsToPlayer,
    createLeague,
    createPlayer,
    createTeam,
    fetchLeagues,
    fetchPlayers,
    fetchWeeklyTeams,
    increaseMyScore,
    increaseScore,
    joinLeague,
    triggerWeeklyTeams
};

const mapStateToProps = state => ({
    allLeagues: selectors.getAllLeagues(state),
    allPlayers: selectors.getAllPlayers(state),
    auth: state.firebase.auth,
    leaguesIAmIn: selectors.getLeagueIAmIn(state),
    myWeeklyTeams: selectors.getWeeklyTeams(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Testing);
