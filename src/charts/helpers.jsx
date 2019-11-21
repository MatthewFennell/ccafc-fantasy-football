import React from 'react';

import fp from 'lodash/fp';

export const graphModes = {
    goalsFor: 'goalsFor',
    goalsAgainst: 'goalsAgainst',
    totalPoints: 'totalPoints',
    totalGoalsFor: 'totalGoalsFor',
    totalGoalsAgainst: 'totalGoalsAgainst'
};

const generateAccumulation = (team, maxWeek) => {
    let result = {};

    result = fp.flow(
        fp.set('week-0.totalGoalsFor', 0),
        fp.set('week-0.totalGoalsAgainst', 0),
        fp.set('week-0.totalPoints', 0)
    )(result);

    for (let week = 1; week <= maxWeek; week++) {
        const currentResults = team.results.filter(t => t.week === week);
        let totalPoints = 0;
        let totalGoalsFor = 0;
        let totalGoalsAgainst = 0;
        currentResults.forEach(x => {
            if (x.goalsFor > x.goalsAgainst) {
                totalPoints += 3;
            }
            if (x.goalsFor === x.goalsAgainst) {
                totalPoints += 1;
            }
            totalGoalsFor += x.goalsFor;
            totalGoalsAgainst += x.goalsAgainst;
        });
        const previousData = fp.get(`week-${(week - 1).toString()}`)(result);
        result = fp.flow(
            fp.set(`week-${week}.totalGoalsFor`, totalGoalsFor + previousData.totalGoalsFor),
            fp.set(`week-${week}.totalGoalsAgainst`, totalGoalsAgainst + previousData.totalGoalsAgainst),
            fp.set(`week-${week}.totalPoints`, totalPoints + previousData.totalPoints)
        )(result);
    }
    return result;
};

// eslint-disable-next-line import/prefer-default-export
export const findGraphData = (allTeams, activeTeams, graphMode, maxGameweek) => {
    const includedTeams = allTeams.filter(team => activeTeams.includes(team.id));

    const output = [];


    const accumulation = fp.flow(
        allTeams.map(x => fp.set(x.id, generateAccumulation(x, maxGameweek)))
    )({});

    // Add all the selected team names
    output.push(['x'].concat(includedTeams.map(team => team.team_name)));

    for (let week = 1; week <= maxGameweek; week++) {
        const weekData = [week];
        includedTeams.forEach(team => {
            const resultsForThatWeek = team.results.filter(x => x.week === week);
            let total = 0;
            resultsForThatWeek.forEach(result => {
                if (result[graphMode] || result[graphMode] === 0) {
                    total += result[graphMode];
                } else {
                    total = fp.get(`${team.id}.week-${week}.${graphMode}`)(accumulation);
                }
            });
            if (resultsForThatWeek.length === 0) {
                if (graphMode === graphModes.goalsFor || graphMode === graphModes.goalsAgainst) {
                    total = 0;
                } else {
                    total = fp.get(`${team.id}.week-${week}.${graphMode}`)(accumulation);
                }
            }
            weekData.push(total);
        });
        output.push(weekData);
    }
    return output;
};

// Sort by points first (stored as `score` since `points` is a bold div)
// Then by goal difference
// Then by games played
// Then by wins
const sortLeagueTable = leagueTable => leagueTable.sort((a, b) => {
    if (a.score - b.score !== 0) {
        return a.score - b.score;
    }

    if (a.goalDifference - b.goalDifference !== 0) {
        return a.goalDifference - b.goalDifference;
    }

    if (a.gamesPlayed - b.gamesPlayed !== 0) {
        return a.gamesPlayed - b.gamesPlayed;
    }

    if (a.wins - b.wins !== 0) {
        return a.wins - b.wins;
    }
    return 0;
});

const makeBold = val => <div style={{ fontWeight: 'bold' }}>{val}</div>;

export const generateLeagueTable = (activeTeams, weekStart, weekEnd) => {
    const rows = [];
    activeTeams.forEach(team => {
        const resultsToLookAt = team.results.filter(x => x.week >= weekStart && x.week <= weekEnd);
        let points = 0;
        let goalDifference = 0;
        let wins = 0;
        let draws = 0;
        let losses = 0;
        let gamesPlayed = 0;
        resultsToLookAt.forEach(result => {
            goalDifference = goalDifference + result.goalsFor - result.goalsAgainst;
            gamesPlayed += 1;
            if (result.goalsFor > result.goalsAgainst) {
                points += 3;
                wins += 1;
            } else if (result.goalsFor < result.goalsAgainst) {
                losses += 1;
            } else {
                points += 1;
                draws += 1;
            }
        });
        rows.push({
            points: makeBold(points),
            goalDifference,
            wins,
            draws,
            losses,
            team: team.team_name,
            gamesPlayed,
            score: points,
            id: team.id
        });
    });
    return sortLeagueTable(rows).reverse().map((x, pos) => ({ ...x, position: makeBold(pos + 1) }));
};

export const columns = [
    {
        id: 'position',
        label: 'Pos',
        align: 'center',
        renderCell: true
    },
    {
        id: 'team',
        label: 'Team',
        align: 'center'
    },
    {
        id: 'wins',
        label: 'W',
        align: 'center'
    },
    {
        id: 'draws',
        label: 'D',
        align: 'center'
    },
    {
        id: 'losses',
        label: 'L',
        align: 'center'
    },
    {
        id: 'goalDifference',
        label: 'GD',
        align: 'center'
    },
    {
        id: 'points',
        label: 'Pts',
        align: 'center',
        renderCell: true
    }
];

export const marks = maxWeek => {
    const result = [];
    for (let x = 1; x <= maxWeek; x++) {
        result.push({ value: x, label: x.toString() });
    }
    return result;
};
