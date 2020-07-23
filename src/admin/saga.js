import {
    all, call, takeEvery, put, select, delay, takeLatest
} from 'redux-saga/effects';
import * as actions from './actions';
import * as adminApi from './api';
import * as selectors from './selectors';
import { fetchMaxGameWeekRequest } from '../overview/actions';
import { signOut } from '../auth/actions';
import { setErrorMessage } from '../modalHandling/actions';
import { addNotification } from '../notifications/actions';

export function* fetchTeams(api) {
    try {
        const alreadyFetched = yield select(selectors.getAllTeams);
        if (alreadyFetched && alreadyFetched.length === 0) {
            const allTeams = yield call(api.getAllTeams);
            yield put(actions.fetchTeamsSuccess(allTeams));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Teams', error));
    } finally {
        yield put(actions.setFetchingTeams(false));
    }
}

export function* addNotif(api, action) {
    try {
        yield call(api.addNotification, {
            notification: action.notification
        });
    } catch (error) {
        yield put(setErrorMessage('Error Adding Notification', error));
    } finally {
        yield put(actions.cancelAddingNotification());
    }
}

export function* createPlayer(api, action) {
    try {
        yield call(api.createPlayer, {
            name: action.name,
            price: action.price,
            position: action.position,
            team: action.team,
            previousScore: action.previousScore
        });
        yield put(addNotification('Player successfully created'));
    } catch (error) {
        yield put(setErrorMessage('Error Creating Player', error));
    } finally {
        yield put(actions.cancelCreatingPlayer());
    }
}

export function* createTeam(api, action) {
    try {
        yield call(api.createTeam, ({ teamName: action.teamName }));
        yield put(actions.cancelCreatingTeam());
        const allTeams = yield call(api.getAllTeams);
        yield put(actions.fetchTeamsSuccess(allTeams));
        yield put(addNotification('Team successfully created'));
    } catch (error) {
        yield put(setErrorMessage('Error Creating Team', error));
    } finally {
        yield put(actions.cancelCreatingTeam());
    }
}

export function* getPlayersForTeam(api, action) {
    try {
        const alreadyFetched = yield select(selectors.getPlayersInTeam, action.teamName);
        if (!alreadyFetched) {
            const playersInTeam = yield call(api.getPlayersInTeam, { teamName: action.teamName });
            yield put(actions.fetchPlayersForTeamSuccess(action.teamName, playersInTeam));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Players In Team', error));
    } finally {
        yield put(actions.setFetchingPlayersForTeam(false));
    }
}

export function* submitResult(api, action) {
    try {
        yield call(api.submitResult,
            {
                team: action.teamId,
                goalsFor: action.goalsFor,
                goalsAgainst: action.goalsAgainst,
                week: action.week,
                players: action.players
            });
        yield put(addNotification('Result successfully submitted'));
    } catch (error) {
        yield put(setErrorMessage('Error Submitting Result', error));
    } finally {
        yield put(actions.cancelSubmittingResult());
    }
}

export function* deletePlayer(api, action) {
    try {
        yield call(api.deletePlayer, { playerId: action.playerId });
        yield put(addNotification('Player successfully deleted'));
    } catch (error) {
        yield put(setErrorMessage('Error Deleting Player', error));
    } finally {
        yield put(actions.cancelDeletingPlayer());
    }
}

export function* deleteTeam(api, action) {
    try {
        yield call(api.deleteTeam, {
            teamId: action.teamId,
            teamName: action.teamName
        });
        yield put(actions.deleteTeamSuccess());
        const allTeams = yield call(api.getAllTeams);
        yield put(actions.fetchTeamsSuccess(allTeams));
        yield put(addNotification('Team successfully deleted'));
    } catch (error) {
        yield put(setErrorMessage('Error Deleting Team', error));
    } finally {
        yield put(actions.deleteTeamSuccess());
    }
}

export function* triggerWeek(api, action) {
    try {
        yield call(api.triggerWeeklyTeams, { week: action.week });
        yield put(fetchMaxGameWeekRequest());
        yield put(addNotification(`Week ${action.week} successfully triggered`));
    } catch (error) {
        yield put(setErrorMessage('Error Triggering Week', error));
    } finally {
        yield put(actions.cancelTriggeringWeek());
    }
}

export function* getPlayerStats(api, action) {
    try {
        const playerStats = yield call(api.getPlayerStats,
            { playerId: action.playerId, week: action.week });
        yield put(actions.fetchPlayerStatsSuccess(playerStats));
    } catch (error) {
        yield put(setErrorMessage('Error Getting Player Stats', error));
    } finally {
        yield put(actions.cancelFetchingPlayerStats());
    }
}

export function* editPlayerStats(api, action) {
    try {
        yield call(api.editStats,
            { playerId: action.playerId, week: action.week, difference: action.difference });
        const playerStats = yield call(api.getPlayerStats,
            { playerId: action.playerId, week: action.week });
        yield put(actions.fetchPlayerStatsSuccess(playerStats));
        yield put(addNotification('Played successfully edited'));
    } catch (error) {
        yield put(setErrorMessage('Error Editing Player Stats', error));
    } finally {
        yield put(actions.cancelEditingPlayerStats());
    }
}

export function* usersWithExtraRoles(api) {
    try {
        const alreadyFetched = yield select(selectors.getUsersWithExtraRoles);
        if (alreadyFetched && alreadyFetched.length === 0) {
            const extraRoles = yield call(api.getUsersWithExtraRoles);
            yield put(actions.fetchUsersWithExtraRolesSuccess(extraRoles));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching User Roles', error));
    } finally {
        yield put(actions.cancelFetchingUsersWithExtraRoles());
    }
}

export function* addUserRole(api, action) {
    try {
        yield put(actions.loadUsersWithExtraRoles());
        yield call(api.addUserRole, ({
            email: action.email,
            role: action.role
        }));
        const extraRoles = yield call(api.getUsersWithExtraRoles);
        yield put(actions.fetchUsersWithExtraRolesSuccess(extraRoles));
        yield put(addNotification('User role successfully added'));
    } catch (error) {
        yield put(setErrorMessage('Error Adding User Role', error));
    } finally {
        yield put(actions.cancelFetchingUsersWithExtraRoles());
    }
}

export function* removeUserRole(api, action) {
    try {
        yield put(actions.loadUsersWithExtraRoles());
        yield call(api.removeUserRole, ({
            email: action.email,
            role: action.role
        }));
        const extraRoles = yield call(api.getUsersWithExtraRoles);
        yield put(actions.fetchUsersWithExtraRolesSuccess(extraRoles));
        yield put(addNotification('User role successfully removed'));
    } catch (error) {
        yield put(setErrorMessage('Error Removing User Role', error));
    } finally {
        yield put(actions.cancelFetchingUsersWithExtraRoles());
    }
}

export function* clearDatabase(api) {
    try {
        yield call(api.clearDatabase);
        yield put(signOut());
    } catch (error) {
        yield put(setErrorMessage('Error Clearing Database', error));
    }
}

export function* rollOverToNextYear(api) {
    try {
        yield call(api.rollOverToNextYear);
    } catch (error) {
        yield put(setErrorMessage('Error Rolling Over To Next Year', error));
    } finally {
        yield put(actions.setRollingOverToNextYear(false));
    }
}

export function* deleteAllOldUsers(api) {
    try {
        yield call(api.deleteAllOldUsers);
    } catch (error) {
        yield put(setErrorMessage('Error Deleting All Users', error));
    }
}

export function* fetchHighlightsForApproval(api) {
    try {
        const fetchedHighlights = yield select(selectors.fetchedHighlightsForApproval);
        if (!fetchedHighlights) {
            const highlights = yield call(api.getHighlightsForApproval);
            yield put(actions.fetchHighlightsForApprovalSuccess(highlights));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Highlights For Approval', error));
    } finally {
        yield put(actions.cancelingFetchingHighlightsForApproval());
    }
}

export function* approveHighlight(api, action) {
    try {
        const highlight = yield call(api.approveHighlight, ({ highlightId: action.highlightId }));
        yield put(actions.approveHighlightSuccess(highlight));
        yield put(addNotification('Highlight successfully approved'));
    } catch (error) {
        yield put(setErrorMessage('Error Approving Highlight', error));
    } finally {
        yield put(actions.cancelApprovingHighlight());
    }
}

export function* rejectHighlight(api, action) {
    try {
        const highlight = yield call(api.rejectHighlight, ({
            highlightId: action.highlightId,
            reason: action.reason
        }));
        yield put(actions.rejectHighlightSuccess(highlight));
        yield put(addNotification('Highlight successfully rejected'));
    } catch (error) {
        yield put(setErrorMessage('Error Rejecting Highlight', error));
    } finally {
        yield put(actions.cancelRejectingHighlight());
    }
}

export function* deleteHighlight(api, action) {
    try {
        const highlight = yield call(api.deleteHighlight, ({
            highlightId: action.highlightId,
            reason: action.reason
        }));
        yield put(actions.deleteHighlightSuccess(highlight));
        yield put(addNotification('Highlight successfully deleted'));
    } catch (error) {
        yield put(setErrorMessage('Error Deleting Highlight', error));
    } finally {
        yield put(actions.cancelDeletingHighlight());
    }
}

export function* fetchRejectedHighlights(api) {
    try {
        const fetchedHighlights = yield select(selectors.fetchedRejectedHighlights);
        if (!fetchedHighlights) {
            const highlights = yield call(api.rejectedHighlights);
            yield put(actions.fetchAllRejectedHighlightsSuccess(highlights));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Rejected Highlights', error));
    } finally {
        yield put(actions.cancelFetchingRejectedHighlights());
    }
}

export function* reapproveRejectedHighlight(api, action) {
    try {
        const highlight = yield call(api.reapproveRejectedHighlight,
            ({ highlightId: action.highlightId }));
        yield put(actions.reapproveRejectedHighlightSuccess(highlight));
        yield put(addNotification('Highlight successfully reapproved'));
    } catch (error) {
        yield put(setErrorMessage('Error Reapproving Rejected Highlight', error));
    } finally {
        yield put(actions.cancelLoadingRejectedHighlights());
    }
}

export function* submitExtraResults(api, action) {
    try {
        yield call(api.submitExtraResults, ({
            gameWeek: action.gameWeek,
            yellowCard: action.yellowCard,
            redCard: action.redCard,
            penaltySaved: action.penaltySaved,
            penaltyMissed: action.penaltyMissed,
            ownGoal: action.ownGoal
        }));
        yield put(addNotification('Extra stats successfully submitted'));
    } catch (error) {
        yield put(setErrorMessage('Error Submitting Extra Results', error));
    } finally {
        yield put(actions.cancelSubmittingExtraStats());
    }
}

export function* recalculateLeaguePositions(api) {
    try {
        yield call(api.recalculateLeaguePositions);
        yield put(addNotification('Positions recalculated successfully'));
    } catch (error) {
        yield put(setErrorMessage('Error Recalculating League Positions', error));
    } finally {
        yield put(actions.setRecalculatingLeaguePositions(false));
    }
}

export function* deleteBug(api, action) {
    try {
        yield call(api.deleteBug, {
            featureId: action.featureId
        });
    } catch (error) {
        yield put(setErrorMessage('Error Deleting Bug', error));
    } finally {
        yield put(actions.cancelDeletingBug());
    }
}

export function* setHasPaidSubs(api, action) {
    try {
        yield call(api.setHasPaidSubs, ({
            changes: action.changes
        }));
    } catch (error) {
        yield put(setErrorMessage('Error Setting Who Has Paid Subs', error));
    } finally {
        yield put(actions.cancelUpdatingSubs(action.changes));
    }
}

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const noxus = week => ({
    team: '07oKfYtwcHmTg8XjLLEq',
    goalsFor: 4,
    goalsAgainst: 0,
    week,
    players: {
        '6BGut7yPRAJKnEUzbDf4': {
            goals: getRandomInt(6)
        },
        '6BuBNdutgo8qstcDLta3': {
            goals: getRandomInt(5)
        },
        '8H1GwHMbL9AxYIeWdV8X': {
            goals: getRandomInt(5)
        },
        '9lhSy1Svn9BcgNf1AEOV': {
            goals: getRandomInt(5),
            cleanSheet: true
        },
        BIMySL1C05jOKfALjvdu: {
            assists: getRandomInt(5),
            cleanSheet: true
        },
        IpXn9wt9RI5oMn0KwqdG: {
            assists: getRandomInt(5)
        },
        TxTB6IlUS7n5kxPMTOQt: {
            assists: getRandomInt(5)
        },
        UTQWiJeeiBkRsh0MkBOM: {
            assists: getRandomInt(5),
            cleanSheet: true
        },
        WAVavGHeSerw31jv2QvO: {
            cleanSheet: true,
            manOfTheMatch: true
        },
        WSAE3nhivReEcGsHRwSv: {
            dickOfTheDay: true
        }
    }
});

const ionia = week => ({
    team: '1bf4UkE66Sq0MEKsXaiB',
    goalsFor: 4,
    goalsAgainst: 0,
    week,
    players: {
        '33gnaUyH05VKWfrwVoA8': {
            goals: getRandomInt(6)
        },
        '8y1elUwUhlhi6m0ZyAsU': {
            goals: getRandomInt(6)
        },
        BKfSb52au1uKlLV6q7oE: {
            goals: getRandomInt(6)
        },
        IuuaKcdmypRf9586WpWd: {
            goals: getRandomInt(6)
        },
        MHGlos6LK2BzsMVCStsP: {
            assists: getRandomInt(5)
        },
        P2ZcPiQHMJbDj2flWUod: {
            assists: getRandomInt(5)
        },
        SrmXVNyIJoRYt1Kk5L02: {
            assists: getRandomInt(5)
        },
        UOwxYqmjTuklGZp3OaPK: {
            assists: getRandomInt(5),
            cleanSheet: true
        },
        j1Rz5qAgoEBzPQGYmc1x: {
            cleanSheet: true,
            dickOfTheDay: true
        },
        kJF6acsCpdpKvccaZa4O: {
            cleanSheet: true
        },
        kVDH0Hw8D96hj3w5INKO: {
            cleanSheet: true,
            manOfTheMatch: true
        },
        o3rP68KSr1aiaVJEgHHZ: {
            cleanSheet: true
        }
    }
});

const runeterra = week => ({
    team: '6XcwjTitiSEHsCqxoRTd',
    goalsFor: 6,
    goalsAgainst: 0,
    week,
    players: {
        '0dEVXgTYbWm2QwcGUqkI': {
            goals: getRandomInt(4)
        },
        '2VPZSuIpfL79nM0hOYvk': {
            goals: getRandomInt(4)
        },
        '5EMoFM5Mv9rFezMOP8g0': {
            goals: getRandomInt(4)
        },
        '2glwlX3EG60kglhUQqzs': {
            goals: getRandomInt(4)
        },
        AzKRu9v39TS8Vs1UcdiT: {
            goals: getRandomInt(4)
        },
        EOEEMuYn5FslyEhc2zwY: {
            goals: getRandomInt(4)
        },
        LJJ14edMABEFDEWSv3m5: {
            assists: getRandomInt(4),
            dickOfTheDay: true
        },
        mBM4dHWs61OCy1M9Vgz6: {
            assists: 3
        },
        sbV8CgScSdNsQz3Z3xld: {
            assists: getRandomInt(5)
        },
        joHsDYVoB8afcedpMgys: {
            assists: getRandomInt(5)
        },
        '7eWnqzriYYzKz7BuJrs5': {
            cleanSheet: true
        },
        WL9b20sfjU1HiQFcB8E3: {
            cleanSheet: true
        },
        xhdHRALVb6Czxbt9RynC: {
            cleanSheet: true
        },
        BEtlqEta8BgauR1gUiV6: {
            cleanSheet: true
        },
        tK3bte9HcE9kpEXC8VBl: {
            cleanSheet: true,
            manOfTheMatch: true
        }
    }
});

const piltover = week => ({
    team: 'D0zo3miqDEkSXfF4dAFH',
    goalsFor: 5,
    goalsAgainst: 0,
    week,
    players: {
        '56cmpQXro3OMKc46Sr05': {
            goals: getRandomInt(5),
            cleanSheet: true
        },
        G9bpqakSi8kFb4F75SiY: {
            goals: getRandomInt(3)
        },
        QZWlP7gLLyQ6gJxfz4S6: {
            goals: getRandomInt(2),
            assists: getRandomInt(4),
            manOfTheMatch: true
        },
        fZxvQVer4phrmWFJGObo: {
            assists: getRandomInt(8)
        },
        vDG7lhe3BI5q61cjUwRK: {
            assists: getRandomInt(3),
            cleanSheet: true
        },
        qMVisXKmLdH2UPkHU7nT: {
            assists: getRandomInt(3),
            dickOfTheDay: true
        }
    }
});

const theVoid = week => ({
    team: 'GHdGMfqaH77WrsuqCjx6',
    goalsFor: 3,
    goalsAgainst: 0,
    week,
    players: {
        '5Sl4oMa5XAqTrZUfBnAG': {
            goals: getRandomInt(7)
        },
        AA42AtjrUG6OBDA5fPnB: {
            goals: getRandomInt(7)
        },
        C518s4dsQJ08pyvDwSW4: {
            goals: getRandomInt(7)
        },
        ETbGgmcOsEyczWx4S1j2: {
            assists: getRandomInt(3)
        },
        IubcIU1MbErgVz5tsvsR: {
            assists: getRandomInt(3)
        },
        LMyOtI3LVffGekcTEyhx: {
            assists: getRandomInt(3),
            cleanSheet: true,
            manOfTheMatch: true
        },
        MzOJoQzW7Jdj53e6n3zn: {
            cleanSheet: true
        },
        a5bV526PoMHnWVvyZOx9: {
            dickOfTheDay: true
        }
    }
});

const zaun = week => ({
    team: 'WuqskOjmdZnEwYAu59Od',
    goalsFor: 5,
    goalsAgainst: 0,
    week,
    players: {
        '71PEv9vqPBWqE099PAfD': {
            goals: getRandomInt(5),
            cleanSheet: true
        },
        Abtao7o7NF0gPrPzV8kL: {
            goals: getRandomInt(10)
        },
        IAqruivPGrK5eQB8IP8h: {
            goals: getRandomInt(5),
            cleanSheet: true
        },
        Oaua5Yidt7nkWfbidUlS: {
            assists: getRandomInt(3),
            cleanSheet: true
        },
        QyIyiOLvZTVfm6iG5vnX: {
            assists: getRandomInt(3)
        },
        khHCpjXtJQ4YxCiW5ZbM: {
            assists: getRandomInt(6),
            manOfTheMatch: true
        },
        m6kZLsnEtFdNlrqqOPBw: {
            assists: getRandomInt(6)
        },
        GLfEOiS2yfoS5mRh5GgF: {
            cleanSheet: true
        },
        kff2H25Ma5BebA5nGCvW: {
            cleanSheet: true,
            dickOfTheDay: true
        },
        Ya6yqHAzSCTnVx3E7B8S: {
            cleanSheet: true
        }
    }
});

const targon = week => ({
    team: 'ivLitSoKl5kk2idksLOM',
    goalsFor: 3,
    goalsAgainst: 0,
    week,
    players: {
        '0F9SXBJBDlDuudHXlHjI': {
            goals: getRandomInt(7)
        },
        '58odAZp5Pab1mzXLdHyT': {
            goals: getRandomInt(7),
            cleanSheet: true
        },
        '5LOoI7p7E17emCW481OA': {
            goals: getRandomInt(7),
            cleanSheet: true
        },
        eptqi4NAwrnYzhRIBMvC: {
            assists: getRandomInt(5),
            manOfTheMatch: true
        },
        fQ4QZIniB6caFW88vuaS: {
            assists: getRandomInt(5),
            dickOfTheDay: true
        },
        y7QfiBblqDrEV0itIpks: {
            assists: getRandomInt(5)
        }
    }
});

const shadowIsles = week => ({
    team: 'jqcfNJpQL2Ls2OQPOIo5',
    goalsFor: 4,
    goalsAgainst: 0,
    week,
    players: {
        '0DjBr1KRS6gin6RUQ2sa': {
            goals: getRandomInt(5)
        },
        '6661AVXG6DgIcHuUEdeF': {
            goals: getRandomInt(5)
        },
        MkzZO1FqRgMK4GYJdHZb: {
            goals: getRandomInt(5),
            dickOfTheDay: true
        },
        PqqddFYVOxqbt9vmJzwO: {
            goals: getRandomInt(5),
            assists: getRandomInt(3)
        },
        SRzxzrUZYLUK0Io7IBzz: {
            assists: getRandomInt(3),
            cleanSheet: true,
            manOfTheMatch: true
        },
        fRqFiq5utQf4yPBxhvDV: {
            assists: getRandomInt(3),
            cleanSheet: true
        },
        fxs4XKel9JZBlDAmhYyp: {
            assists: getRandomInt(3),
            cleanSheet: true
        }
    }
});

const freljord = week => ({
    team: 'lYiEeZZPmkRFOV9tecxu',
    goalsFor: 6,
    goalsAgainst: 0,
    week,
    players: {
        '2t238m0yXJTtmskJPt5i': {
            goals: getRandomInt(4)
        },
        AAP5hGMrhOnKrXGy4UIx: {
            goals: getRandomInt(4)
        },
        BSVJRhJ9RLaeZ3K68fWl: {
            goals: getRandomInt(4),
            assists: getRandomInt(5),
            cleanSheet: true
        },
        G6cG8BnQyN2z6ZXoZiKZ: {
            goals: getRandomInt(4),
            cleanSheet: true
        },
        KEgQKSlhCd7JQ5ZiN9Q6: {
            goals: getRandomInt(4),
            assists: getRandomInt(5)
        },
        PtsrBBcGVJTBQrkddVOr: {
            goals: getRandomInt(4)
        },
        sRjF97WpDhM87Xx6dOoO: {
            assists: getRandomInt(5)
        },
        qcLvN0QhhmfGfAei1gzD: {
            assists: getRandomInt(5)
        },
        q1goerwrSSKWawX909rY: {
            assists: getRandomInt(5)
        },
        hBqk3AChNKcNaCdjDJVP: {
            assists: getRandomInt(5),
            dickOfTheDay: true
        },
        ftAlXFzlbaw660RLb0OP: {
            cleanSheet: true
        },
        X2YXcj6jHicbrmAjSEEt: {
            cleanSheet: true
        },
        fSnmIvBxXkwL0DP3ANWI: {
            manOfTheMatch: true
        }
    }
});

const shurima = week => ({
    team: 'ozFejpm7IZLqZcaO1aVP',
    goalsFor: 5,
    goalsAgainst: 0,
    week,
    players: {
        '2v3DRDtkE64Secci6XSv': {
            goals: getRandomInt(4)
        },
        EJ95CXP6Mt462UwBLP3K: {
            goals: getRandomInt(4)
        },
        Ss025V3H9LVvR2SEbUkF: {
            goals: getRandomInt(4),
            cleanSheet: true
        },
        JDGJ4N1BOhBneNlNWYGf: {
            goals: getRandomInt(4),
            assists: getRandomInt(2)
        },
        TLr19UHm9qB48vvlteKf: {
            goals: getRandomInt(4),
            assists: getRandomInt(2)
        },
        geKwHanYrbkyPUpAmCai: {
            assists: getRandomInt(2),
            manOfTheMatch: true,
            dickOfTheDay: true
        },
        k4Ri9vENM8mQfb6Ocw8Q: {
            assists: getRandomInt(2),
            cleanSheet: true
        },
        mAnqSGO1Ly4BPq1wXsmZ: {
            assists: getRandomInt(2)
        }
    }
});

const demacia = week => ({
    team: 't7DBFUXVDTQ7zJ6j0itw',
    goalsFor: 7,
    goalsAgainst: 0,
    week,
    players: {
        '66GqV7f1XD96zvecTqht': {
            goals: getRandomInt(7),
            cleanSheet: true
        },
        JPoJ0fKriU76VA7uLHo4: {
            goals: getRandomInt(7),
            cleanSheet: true
        },
        MbxGXZWPadtdHi7WJ6SF: {
            goals: getRandomInt(7),
            cleanSheet: true
        },
        hpyKJCGsEXw9CtC1mWSk: {
            goals: getRandomInt(7),
            assists: getRandomInt(4)
        },
        tCWoVPQShbrAkcEEmyyn: {
            goals: getRandomInt(7),
            assists: getRandomInt(4),
            cleanSheet: true
        },
        X8jbCv8MU5PTAWtVd5IV: {
            goals: getRandomInt(7)
        },
        K66q9xuTzSN5NDofghxM: {
            goals: getRandomInt(7),
            assists: getRandomInt(4),
            cleanSheet: true
        },
        ogjBy5ufKb4Dblj5ZO3v: {
            assists: getRandomInt(4)
        },
        s92ehAxIJpjaxwA3mxzg: {
            assists: getRandomInt(4)
        },
        ptCbfgjSWJFwT491s1BA: {
            assists: getRandomInt(4),
            cleanSheet: true
        },
        mwl5wWPyK3HgSJjv92JK: {
            assists: getRandomInt(4),
            dickOfTheDay: true
        },
        hOgiX6TgffhREqEwPqji: {
            manOfTheMatch: true
        }
    }
});

const bilgewater = week => ({
    team: 'wIsXDuE26m7adO3QkIes',
    goalsFor: 4,
    goalsAgainst: 0,
    week,
    players: {
        KdgWylwUciHbTePbMknJ: {
            goals: getRandomInt(5),
            assists: getRandomInt(2),
            cleanSheet: true
        },
        KuIQu36qY9pDBk5Gakm4: {
            goals: getRandomInt(5),
            cleanSheet: true,
            dickOfTheDay: true
        },
        MJvHfmOIc0MAhBTYdc82: {
            goals: getRandomInt(5),
            cleanSheet: true
        },
        WJLzkn1sZEkGh2sGz4p6: {
            goals: getRandomInt(5),
            assists: getRandomInt(2)
        },
        syOYfMGYdaDyyB02vK71: {
            assists: getRandomInt(2)
        },
        b9LCiio8FgiJiqFoC1pR: {
            assists: getRandomInt(2),
            manOfTheMatch: true
        }
    }
});

const ixtal = week => ({
    team: 'wV23cAgrwqct6gf6LZCL',
    goalsFor: 4,
    goalsAgainst: 0,
    week,
    players: {
        '4iCP6OT1LBYfpkhNoAww': {
            goals: getRandomInt(5),
            assists: getRandomInt(3),
            manOfTheMatch: true
        },
        '576DR6kjJu6gc0WDYawj': {
            goals: getRandomInt(5),
            cleanSheet: true,
            dickOfTheDay: true
        },
        FzcwhgwN0br9nJsRnS3a: {
            goals: getRandomInt(5),
            assists: getRandomInt(3),
            cleanSheet: true
        },
        QS6uyxf36h9ObKskGSQf: {
            goals: getRandomInt(5)
        },
        RblNGl3ja9aQStogau1s: {
            assists: getRandomInt(3)
        },
        kAh8Rqr9gJhW6Ia93PsK: {
            assists: getRandomInt(3)
        }
    }
});

const bandleCity = week => ({
    team: 'z6AOt0l43oUdo4BmM1kV',
    goalsFor: 4,
    goalsAgainst: 10,
    week,
    players: {
        '3VDTCHDtvAFlpDBE0g21': {
            goals: getRandomInt(6),
            assists: getRandomInt(3)
        },
        QREySUja4BXbZIcjO15o: {
            goals: getRandomInt(6),
            assists: getRandomInt(3)
        },
        aZxXRzVyRF35Nhf6zgoI: {
            goals: getRandomInt(6),
            assists: getRandomInt(3)
        },
        mIczSlEQNA09lD9FUegb: {
            goals: getRandomInt(6)
        },
        AhXWKh6W27hnkgWfPH8H: {
            assists: getRandomInt(3)
        },
        RFAg6pqfkp7Wnw2FsEIB: {
            manOfTheMatch: true
        },
        QrFaANeerOyN2AvvYFxH: {
            dickOfTheDay: true
        }
    }
});

export function* customSubmit(api, action) {
    try {
        yield call(api.submitResult, noxus(action.week));
        yield delay(500);
        yield call(api.submitResult, ionia(action.week));
        yield delay(500);
        yield call(api.submitResult, runeterra(action.week));
        yield delay(500);
        yield call(api.submitResult, piltover(action.week));
        yield delay(500);
        yield call(api.submitResult, theVoid(action.week));
        yield delay(500);
        yield call(api.submitResult, zaun(action.week));
        yield delay(500);
        yield call(api.submitResult, targon(action.week));
        yield delay(500);
        yield call(api.submitResult, shadowIsles(action.week));
        yield delay(500);
        yield call(api.submitResult, freljord(action.week));
        yield delay(500);
        yield call(api.submitResult, shurima(action.week));
        yield delay(500);
        yield call(api.submitResult, demacia(action.week));
        yield delay(500);
        yield call(api.submitResult, bilgewater(action.week));
        yield delay(500);
        yield call(api.submitResult, ixtal(action.week));
        yield delay(500);
        yield call(api.submitResult, bandleCity(action.week));
    } catch (error) {
        yield put(setErrorMessage('Custom Results Error', error));
    }
}

export default function* adminSaga() {
    yield all([
        takeEvery(actions.FETCH_TEAMS_REQUEST, fetchTeams, adminApi),
        takeLatest(actions.CREATE_PLAYER_REQUEST, createPlayer, adminApi),
        takeLatest(actions.CREATE_TEAM_REQUEST, createTeam, adminApi),
        takeEvery(actions.FETCH_PLAYERS_FOR_TEAM_REQUEST, getPlayersForTeam, adminApi),
        takeLatest(actions.SUBMIT_RESULT_REQUEST, submitResult, adminApi),
        takeLatest(actions.DELETE_PLAYER_REQUEST, deletePlayer, adminApi),
        takeLatest(actions.DELETE_TEAM_REQUEST, deleteTeam, adminApi),
        takeLatest(actions.TRIGGER_WEEK_REQUEST, triggerWeek, adminApi),
        takeEvery(actions.FETCH_PLAYER_STATS_REQUEST, getPlayerStats, adminApi),
        takeLatest(actions.EDIT_PLAYER_STATS_REQUEST, editPlayerStats, adminApi),
        takeEvery(actions.FETCH_USERS_WITH_EXTRA_ROLES_REQUEST, usersWithExtraRoles, adminApi),
        takeLatest(actions.ADD_USER_ROLE_REQUEST, addUserRole, adminApi),
        takeLatest(actions.REMOVE_USER_ROLE_REQUEST, removeUserRole, adminApi),
        takeEvery(actions.CLEAR_DATABASE_REQUEST, clearDatabase, adminApi),
        takeEvery(actions.ROLL_OVER_TO_NEXT_YEAR_REQUEST, rollOverToNextYear, adminApi),
        takeEvery(actions.DELETE_ALL_OLD_USERS_REQUEST, deleteAllOldUsers, adminApi),
        takeEvery(actions.FETCH_HIGHLIGHTS_FOR_APPROVAL_REQUEST, fetchHighlightsForApproval,
            adminApi),
        takeLatest(actions.APPROVE_HIGHLIGHT_REQUEST, approveHighlight, adminApi),
        takeLatest(actions.REJECT_HIGHLIGHT_REQUEST, rejectHighlight, adminApi),
        takeLatest(actions.DELETE_HIGHLIGHT_REQUEST, deleteHighlight, adminApi),
        takeEvery(actions.FETCH_ALL_REJECTED_HIGHLIGHTS_REQUEST, fetchRejectedHighlights, adminApi),
        takeLatest(actions.REAPPROVE_REJECTED_HIGHLIGHT_REQUEST, reapproveRejectedHighlight,
            adminApi),
        takeEvery(actions.SUBMIT_EXTRA_STATS_REQUEST, submitExtraResults, adminApi),
        takeEvery(actions.SET_HAS_PAID_SUBS_REQUEST, setHasPaidSubs, adminApi),
        takeEvery(actions.SUBMIT_CUSTOM_RESULTS, customSubmit, adminApi),
        takeEvery(actions.DELETE_FEATURE_REQUEST, deleteBug, adminApi),
        takeEvery(actions.ADD_NOTIFICATION_REQUEST, addNotif, adminApi),
        takeEvery(actions.RECALCULATE_LEAGUE_POSITIONS_REQUEST, recalculateLeaguePositions,
            adminApi)
    ]);
}
