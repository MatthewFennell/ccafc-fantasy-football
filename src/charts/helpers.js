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
