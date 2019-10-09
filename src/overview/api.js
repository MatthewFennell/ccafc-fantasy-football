import { functionToCall } from '../api/api';

// eslint-disable-next-line import/prefer-default-export
export const getUserInfo = request => functionToCall('userInfo')(request)
    .then(data => ({
        totalPoints: data.data.total_points,
        gameWeek: data.data.game_week,
        remainingBudget: data.data.remaining_budget,
        remainingTransfers: data.data.remaining_transfers,
        weekPoints: data.data.week_points
    }));
