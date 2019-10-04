import { functionToCall } from '../api/api';

export const getLeaguesIAmIn = () => functionToCall('league-getLeaguesIAmIn')()
    .then(data => data.data.map(league => ({
        id: league.id,
        league_id: league.data.league_id,
        league_name: league.data.name,
        start_week: league.data.start_week,
        user_points: league.data.user_points,
        position: league.data.position
    })));
