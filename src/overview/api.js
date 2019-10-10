import { functionToCall } from '../api/api';

// eslint-disable-next-line import/prefer-default-export
export const getUserInfo = request => functionToCall('users-initialUserWeekInfo')(request)
    .then(data => ({
        gameWeek: data.data.game_week,
        weekPoints: data.data.week_points,
        averagePoints: data.data.average_points,
        highestPoints: data.data.highest_points
    }));

export const getUserInfoForWeek = request => functionToCall('userInfoForWeek')(request)
    .then(data => ({
        weekPoints: data.data.week_points,
        averagePoints: data.data.average_points,
        highestPoints: data.data.highest_points
    }));


export const getUserStats = request => functionToCall('userStats')(request)
    .then(data => ({
        weekPoints: data.data.week_points,
        averagePoints: data.data.average_points,
        highestPoints: data.data.highest_points
    }));
