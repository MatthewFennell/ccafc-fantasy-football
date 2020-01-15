import {
    all, takeEvery, put, select, call
} from 'redux-saga/effects';
import cheerio from 'cheerio';
import * as actions from './actions';
import * as selectors from './selectors';
import * as api from './api';

function* getUserStats(action) {
    try {
        const fetchedStats = yield select(selectors.alreadyFetchedUserStats, action.userId);
        if (!fetchedStats) {
            const stats = yield call(api.getUserStats, {
                userId: action.userId
            });
            yield put(actions.fetchUserStatsSuccess(action.userId, stats));
        } else {
            yield put(actions.alreadyFetchedUserStats(action.userId));
        }
    } catch (error) {
        yield put(actions.fetchUserStatsError(action.userId, error));
    }
}

const generateFixture = (teamOne, result, teamTwo, location, time) => {
    // const ma
    if (teamOne && teamOne.length > 2 && teamTwo && teamTwo.length > 2) {
        if (result === 'vs') {
            return {
                teamOne, result, teamTwo, location, time, completed: false
            };
        }
        return {
            teamOne, result, teamTwo, location, time, completed: true
        };
    }
    return null;
};

const generateFixtures = list => {
    const fixtures = [];
    for (let x = 0; x < list.length; x += 5) {
        fixtures.push(generateFixture(list[x], list[x + 1], list[x + 2], list[x + 3], list[x + 4]));
    }
    console.log(fixtures);
    return fixtures.filter(x => x !== null);
};

function* scrapeData() {
    try {
        const scrapedData = yield call(api.scrapeData);
        console.log('scraped data', scrapedData);
        // const $ = cheerio.load(scrapedData);
        // const arr = [];

        // $('td').each((i, el) => {
        //     const item = $(el).text();
        //     arr.push(item.trim().trimLeft().trimRight().replace(/(\r\n|\n|\r)/gm, '')
        //         .replace(/\s\s+/g, ' '));
        // });
        // const fixtures = generateFixtures(arr);
        // console.log('fixtures', fixtures);
    } catch (error) {
        yield put(actions.fetchMaxGameWeekError(error));
    }
}

function* getMaxGameWeek() {
    try {
        const maxGameWeek = yield call(api.getMaxGameWeek);
        yield put(actions.fetchMaxGameWeekSuccess(maxGameWeek));
    } catch (error) {
        yield put(actions.fetchMaxGameWeekError(error));
    }
}

function* getUserInfoForWeek(action) {
    try {
        const alreadyFetched = yield select(selectors.alreadyFetchedUserInfo,
            action.userId, action.week);
        if (!alreadyFetched) {
            const userInfo = yield call(api.getUserInfoForWeek, ({
                userId: action.userId,
                week: action.week
            }));
            yield put(actions.fetchUserInfoForWeekSuccess(action.userId, action.week, userInfo));
        } else {
            yield put(actions.alreadyFetchedUserInfoForWeek(action.userId, action.week));
        }
    } catch (error) {
        yield put(actions.fetchUserInfoForWeekError(action.userId, action.week, error));
    }
}

export default function* overviewSaga() {
    yield all([
        takeEvery(actions.FETCH_USER_STATS_REQUEST, getUserStats),
        takeEvery(actions.FETCH_MAX_GAMEWEEK_REQUEST, getMaxGameWeek),
        takeEvery(actions.FETCH_USER_INFO_FOR_WEEK_REQUEST, getUserInfoForWeek),
        takeEvery(actions.FETCH_USER_INFO_FOR_WEEK_REQUEST_BACKGROUND, getUserInfoForWeek),
        takeEvery(actions.SCRAPE_DATA_REQUEST, scrapeData)
    ]);
}
