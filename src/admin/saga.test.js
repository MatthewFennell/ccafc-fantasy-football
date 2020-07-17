import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { noop } from 'lodash';
import * as sagas from './saga';
import * as actions from './actions';
import * as selectors from './selectors';
import { successDelay } from '../constants';
import { fetchMaxGameWeekRequest } from '../overview/actions';
import { signOut } from '../auth/actions';
import { setErrorMessage } from '../errorHandling/actions';

// https://github.com/jfairbank/redux-saga-test-plan - Docs

const api = {
    addUserRole: noop,
    approveHighlight: () => 'highlight',
    clearDatabase: noop,
    createPlayer: noop,
    createTeam: noop,
    deleteAllOldUsers: noop,
    deleteHighlight: () => 'deleted highlight',
    deleteBug: noop,
    deletePlayer: noop,
    deleteTeam: noop,
    editStats: noop,
    getAllTeams: () => 'all teams',
    getHighlightsForApproval: () => 'highlights approval',
    getPlayersInTeam: () => 'players in team',
    getPlayerStats: () => 'player stats',
    getUsersWithExtraRoles: () => 'extra roles',
    reapproveRejectedHighlight: () => 'reapproved rejected highlight',
    recalculateLeaguePositions: noop,
    rejectHighlight: () => 'rejected highlight',
    rejectedHighlights: () => 'all rejected highlights',
    removeUserRole: noop,
    rollOverToNextYear: noop,
    setHasPaidSubs: noop,
    submitExtraResults: noop,
    submitResult: noop,
    triggerWeeklyTeams: noop
};

describe('Admin saga', () => {
    const provideDelay = ({ fn }, next) => ((fn.name === 'delayP') ? null : next());

    const alreadyFetchedInfo = fetched => ({ selector }, next) => {
        if (selector === selectors.getAllTeams) {
            return fetched ? [1, 2, 3] : [];
        }
        if (selector === selectors.getPlayersInTeam) {
            return fetched;
        }
        if (selector === selectors.getUsersWithExtraRoles) {
            return fetched ? [1, 2, 3] : [];
        }
        if (selector === selectors.fetchedHighlightsForApproval) {
            return fetched;
        }
        if (selector === selectors.fetchedRejectedHighlights) {
            return fetched;
        }
        return next();
    };

    it('already fetched teams', () => {
        const action = actions.fetchTeamsRequest();
        return expectSaga(sagas.fetchTeams, api, action)
            .provide([
                {
                    select: alreadyFetchedInfo(true)
                }
            ])
            .not.put(actions.fetchTeamsSuccess('all teams'))
            .run({ silenceTimeout: true });
    });

    it('fetch teams', () => {
        const action = actions.fetchTeamsRequest();
        return expectSaga(sagas.fetchTeams, api, action)
            .provide([
                {
                    select: alreadyFetchedInfo(false)
                }
            ])
            .call(api.getAllTeams)
            .put(actions.fetchTeamsSuccess('all teams'))
            .run({ silenceTimeout: true });
    });

    it('fetch teams error', () => {
        const error = new Error('error');
        const action = actions.fetchTeamsRequest();
        return expectSaga(sagas.fetchTeams, api, action)
            .provide([
                [matchers.call.fn(api.getAllTeams), throwError(error)],
                { select: alreadyFetchedInfo(false) }
            ])
            .put(setErrorMessage('Fetch Teams Error', error))
            .run({ silenceTimeout: true });
    });

    it('create player', () => {
        const action = actions.createPlayerRequest('name', 'position', 5, 'team', 0);
        return expectSaga(sagas.createPlayer, api, action)
            .provide({ call: provideDelay })
            .call(api.createPlayer, ({
                name: 'name',
                price: 5,
                position: 'position',
                team: 'team',
                previousScore: 0
            }))
            .put(actions.setSuccessMessage('Player successfully created'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .put(actions.cancelCreatingPlayer())
            .run({ silenceTimeout: true });
    });

    it('create player error', () => {
        const error = new Error('error');
        const action = actions.createPlayerRequest(null);
        return expectSaga(sagas.createPlayer, api, action)
            .provide([
                [matchers.call.fn(api.createPlayer), throwError(error)]
            ])
            .put(setErrorMessage('Create Player Error', error))
            .run({ silenceTimeout: true });
    });

    it('create team', () => {
        const action = actions.createTeamRequest('team name');
        return expectSaga(sagas.createTeam, api, action)
            .provide({ call: provideDelay })
            .call(api.createTeam, ({
                teamName: 'team name'
            }))
            .put(actions.cancelCreatingTeam())
            .call(api.getAllTeams)
            .put(actions.fetchTeamsSuccess('all teams'))
            .put(actions.setSuccessMessage('Team successfully created'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .put(actions.cancelCreatingTeam())
            .run({ silenceTimeout: true });
    });

    it('create team error', () => {
        const error = new Error('error');
        const action = actions.createTeamRequest(null);
        return expectSaga(sagas.createTeam, api, action)
            .provide([
                [matchers.call.fn(api.createTeam), throwError(error)]
            ])
            .put(setErrorMessage('Create Team Error', error))
            .run({ silenceTimeout: true });
    });

    it('fetch players for team', () => {
        const action = actions.fetchPlayersForTeamRequest('teamname');
        return expectSaga(sagas.getPlayersForTeam, api, action)
            .provide([
                {
                    select: alreadyFetchedInfo(false)
                }
            ])
            .call(api.getPlayersInTeam, ({
                teamName: 'teamname'
            }))
            .put(actions.fetchPlayersForTeamSuccess('teamname', 'players in team'))
            .run({ silenceTimeout: true });
    });

    it('already fetched players for team', () => {
        const action = actions.fetchPlayersForTeamRequest('teamname');
        return expectSaga(sagas.getPlayersForTeam, api, action)
            .provide([
                {
                    select: alreadyFetchedInfo(true)
                }
            ])
            .not.put(actions.fetchPlayersForTeamSuccess('teamname', 'players in team'))
            .run({ silenceTimeout: true });
    });

    it('get players for team error', () => {
        const error = new Error('error');
        const action = actions.fetchPlayersForTeamRequest('teamname');
        return expectSaga(sagas.getPlayersForTeam, api, action)
            .provide([
                [matchers.call.fn(api.getPlayersInTeam), throwError(error)],
                { select: alreadyFetchedInfo(false) }
            ])
            .put(setErrorMessage('Get Players For Team Error', error))
            .run({ silenceTimeout: true });
    });

    it('submit result', () => {
        const action = actions.submitResultRequest('teamId', 5, 10, 3, []);
        return expectSaga(sagas.submitResult, api, action)
            .provide({ call: provideDelay })
            .call(api.submitResult, ({
                team: 'teamId',
                goalsFor: 5,
                goalsAgainst: 10,
                week: 3,
                players: []
            }))
            .put(actions.setSuccessMessage('Result successfully submitted'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .put(actions.cancelSubmittingResult())
            .run({ silenceTimeout: true });
    });

    it('Submit result error', () => {
        const error = new Error('error');
        const action = actions.submitResultRequest(null);
        return expectSaga(sagas.submitResult, api, action)
            .provide([
                [matchers.call.fn(api.submitResult), throwError(error)]
            ])
            .put(setErrorMessage('Submit Result Error', error))
            .run({ silenceTimeout: true });
    });

    it('Delete player', () => {
        const action = actions.deletePlayerRequest('playerId');
        return expectSaga(sagas.deletePlayer, api, action)
            .provide({ call: provideDelay })
            .call(api.deletePlayer, ({
                playerId: 'playerId'
            }))
            .put(actions.setSuccessMessage('Player successfully deleted'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .put(actions.cancelDeletingPlayer())
            .run({ silenceTimeout: true });
    });

    it('Delete player error', () => {
        const error = new Error('error');
        const action = actions.deletePlayerRequest(null);
        return expectSaga(sagas.deletePlayer, api, action)
            .provide([
                [matchers.call.fn(api.deletePlayer), throwError(error)]
            ])
            .put(setErrorMessage('Delete Player Error', error))
            .run({ silenceTimeout: true });
    });

    it('Delete team', () => {
        const action = actions.deleteTeamRequest('teamId', 'teamName');
        return expectSaga(sagas.deleteTeam, api, action)
            .provide({ call: provideDelay })
            .call(api.deleteTeam, ({
                teamId: 'teamId',
                teamName: 'teamName'
            }))
            .put(actions.deleteTeamSuccess())
            .call(api.getAllTeams)
            .put(actions.fetchTeamsSuccess('all teams'))
            .put(actions.setSuccessMessage('Team successfully deleted'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .run({ silenceTimeout: true });
    });

    it('Delete team error', () => {
        const error = new Error('error');
        const action = actions.deleteTeamRequest(null);
        return expectSaga(sagas.deleteTeam, api, action)
            .provide([
                [matchers.call.fn(api.deleteTeam), throwError(error)]
            ])
            .put(setErrorMessage('Delete Team Error', error))
            .run({ silenceTimeout: true });
    });

    it('Trigger Week', () => {
        const action = actions.triggerWeekRequest(8);
        return expectSaga(sagas.triggerWeek, api, action)
            .provide({ call: provideDelay })
            .call(api.triggerWeeklyTeams, ({
                week: 8
            }))
            .put(actions.cancelTriggeringWeek())
            .put(fetchMaxGameWeekRequest())
            .put(actions.setSuccessMessage('Week 8 successfully triggered'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .run({ silenceTimeout: true });
    });

    it('Trigger week error', () => {
        const error = new Error('error');
        const action = actions.triggerWeekRequest(6);
        return expectSaga(sagas.triggerWeek, api, action)
            .provide([
                [matchers.call.fn(api.triggerWeeklyTeams), throwError(error)]
            ])
            .put(setErrorMessage('Trigger Week Error', error))
            .run({ silenceTimeout: true });
    });

    it('Get player stats', () => {
        const action = actions.fetchPlayerStatsRequest('playerId', 3);
        return expectSaga(sagas.getPlayerStats, api, action)
            .call(api.getPlayerStats, ({
                playerId: 'playerId',
                week: 3
            }))
            .put(actions.fetchPlayerStatsSuccess('player stats'))
            .run({ silenceTimeout: true });
    });

    it('Get player stats error', () => {
        const error = new Error('error');
        const action = actions.fetchPlayerStatsRequest('playerId', 3);
        return expectSaga(sagas.getPlayerStats, api, action)
            .provide([
                [matchers.call.fn(api.getPlayerStats), throwError(error)]
            ])
            .put(setErrorMessage('Get Player Stats Error', error))
            .run({ silenceTimeout: true });
    });

    it('Edit player stats', () => {
        const action = actions.editPlayerStatsRequest('playerId', 3, 'differenceObj');
        return expectSaga(sagas.editPlayerStats, api, action)
            .provide({ call: provideDelay })
            .call(api.editStats, ({
                playerId: 'playerId',
                week: 3,
                difference: 'differenceObj'
            }))
            .call(api.getPlayerStats, ({
                playerId: 'playerId',
                week: 3
            }))
            .put(actions.fetchPlayerStatsSuccess('player stats'))
            .put(actions.cancelEditingPlayerStats())
            .put(actions.setSuccessMessage('Played successfully edited'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .run({ silenceTimeout: true });
    });

    it('Edit player stats error', () => {
        const error = new Error('error');
        const action = actions.editPlayerStatsRequest(null);
        return expectSaga(sagas.editPlayerStats, api, action)
            .provide([
                [matchers.call.fn(api.editStats), throwError(error)]
            ])
            .put(setErrorMessage('Edit Player Stats Error', error))
            .run({ silenceTimeout: true });
    });

    it('Fetch users with extra roles error', () => {
        const error = new Error('error');
        const action = actions.fetchUsersWithExtraRolesRequest();
        return expectSaga(sagas.usersWithExtraRoles, api, action)
            .provide([
                [matchers.call.fn(api.getUsersWithExtraRoles), throwError(error)],
                { select: alreadyFetchedInfo(false) }
            ])
            .put(setErrorMessage('Fetch User Roles Error', error))
            .run({ silenceTimeout: true });
    });

    it('already fetched users with extra roles', () => {
        const action = actions.fetchUsersWithExtraRolesRequest();
        return expectSaga(sagas.usersWithExtraRoles, api, action)
            .provide([{ select: alreadyFetchedInfo(true) }])
            .put(actions.cancelFetchingUsersWithExtraRoles())
            .run({ silenceTimeout: true });
    });

    it('fetch users with extra roles', () => {
        const action = actions.fetchUsersWithExtraRolesRequest();
        return expectSaga(sagas.usersWithExtraRoles, api, action)
            .provide([{ select: alreadyFetchedInfo(false) }])
            .call(api.getUsersWithExtraRoles)
            .run({ silenceTimeout: true });
    });

    it('add user role', () => {
        const action = actions.addUserRoleRequest('email', 'role');
        return expectSaga(sagas.addUserRole, api, action)
            .provide({ call: provideDelay })
            .put(actions.loadUsersWithExtraRoles())
            .call(api.addUserRole, ({
                email: 'email',
                role: 'role'
            }))
            .call(api.getUsersWithExtraRoles)
            .put(actions.fetchUsersWithExtraRolesSuccess('extra roles'))
            .put(actions.setSuccessMessage('User role successfully added'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .run({ silenceTimeout: true });
    });

    it('add user role error', () => {
        const error = new Error('error');
        const action = actions.addUserRoleRequest('email', 'role');
        return expectSaga(sagas.addUserRole, api, action)
            .provide([
                [matchers.call.fn(api.addUserRole), throwError(error)]
            ])
            .put(setErrorMessage('Add User Role Error', error))
            .run({ silenceTimeout: true });
    });

    it('remove user role', () => {
        const action = actions.removeUserRoleRequest('email', 'role');
        return expectSaga(sagas.removeUserRole, api, action)
            .provide({ call: provideDelay })
            .put(actions.loadUsersWithExtraRoles())
            .call(api.removeUserRole, ({
                email: 'email',
                role: 'role'
            }))
            .call(api.getUsersWithExtraRoles)
            .put(actions.fetchUsersWithExtraRolesSuccess('extra roles'))
            .put(actions.setSuccessMessage('User role successfully removed'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .run({ silenceTimeout: true });
    });

    it('remove user role error', () => {
        const error = new Error('error');
        const action = actions.removeUserRoleRequest('email', 'role');
        return expectSaga(sagas.removeUserRole, api, action)
            .provide([
                [matchers.call.fn(api.removeUserRole), throwError(error)]
            ])
            .put(setErrorMessage('Remove User Role Error', error))
            .run({ silenceTimeout: true });
    });

    it('clear database', () => {
        const action = actions.clearDatabaseRequest();
        return expectSaga(sagas.clearDatabase, api, action)
            .call(api.clearDatabase)
            .put(signOut())
            .run({ silenceTimeout: true });
    });

    it('clear database error', () => {
        const error = new Error('error');
        const action = actions.clearDatabaseRequest();
        return expectSaga(sagas.clearDatabase, api, action)
            .provide([
                [matchers.call.fn(api.clearDatabase), throwError(error)]
            ])
            .put(setErrorMessage('Clear Database Error', error))
            .run({ silenceTimeout: true });
    });

    it('roll over to next year', () => {
        const action = actions.rollOverToNextYearRequest();
        return expectSaga(sagas.rollOverToNextYear, api, action)
            .call(api.rollOverToNextYear)
            .put(actions.setRollingOverToNextYear(false))
            .run({ silenceTimeout: true });
    });

    it('roll over to next year error', () => {
        const error = new Error('error');
        const action = actions.rollOverToNextYearRequest();
        return expectSaga(sagas.rollOverToNextYear, api, action)
            .provide([
                [matchers.call.fn(api.rollOverToNextYear), throwError(error)]
            ])
            .put(setErrorMessage('Rolling Over To Next Year Error', error))
            .run({ silenceTimeout: true });
    });

    it('delete all old users', () => {
        const action = actions.deleteAllOldUsersRequest();
        return expectSaga(sagas.deleteAllOldUsers, api, action)
            .call(api.deleteAllOldUsers)
            .run({ silenceTimeout: true });
    });

    it('delete all old users error', () => {
        const error = new Error('error');
        const action = actions.deleteAllOldUsersRequest();
        return expectSaga(sagas.deleteAllOldUsers, api, action)
            .provide([
                [matchers.call.fn(api.deleteAllOldUsers), throwError(error)]
            ])
            .put(setErrorMessage('Delete All Users Error', error))
            .run({ silenceTimeout: true });
    });

    it('fetch highlights for approval', () => {
        const action = actions.fetchHighlightsForApprovalRequest();
        return expectSaga(sagas.fetchHighlightsForApproval, api, action)
            .provide([{ select: alreadyFetchedInfo(false) }])
            .call(api.getHighlightsForApproval)
            .put(actions.fetchHighlightsForApprovalSuccess('highlights approval'))
            .run({ silenceTimeout: true });
    });

    it('already fetched highlights for approval', () => {
        const action = actions.fetchHighlightsForApprovalRequest();
        return expectSaga(sagas.fetchHighlightsForApproval, api, action)
            .provide([{ select: alreadyFetchedInfo(true) }])
            .put(actions.cancelingFetchingHighlightsForApproval())
            .run({ silenceTimeout: true });
    });

    it('fetch highlights for approval error', () => {
        const error = new Error('error');
        const action = actions.fetchHighlightsForApprovalRequest();
        return expectSaga(sagas.fetchHighlightsForApproval, api, action)
            .provide([
                [matchers.call.fn(api.getHighlightsForApproval), throwError(error)],
                { select: alreadyFetchedInfo(false) }
            ])
            .put(setErrorMessage('Fetch Highlights For Approval Error', error))
            .run({ silenceTimeout: true });
    });

    it('approve highlight', () => {
        const action = actions.approveHighlightRequest('highlightId');
        return expectSaga(sagas.approveHighlight, api, action)
            .provide({ call: provideDelay })
            .call(api.approveHighlight, ({
                highlightId: 'highlightId'
            }))
            .put(actions.approveHighlightSuccess('highlight'))
            .put(actions.setSuccessMessage('Highlight successfully approved'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .run({ silenceTimeout: true });
    });

    it('approve highlight error', () => {
        const error = new Error('error');
        const action = actions.approveHighlightRequest('highlightId');
        return expectSaga(sagas.approveHighlight, api, action)
            .provide([
                [matchers.call.fn(api.approveHighlight), throwError(error)]
            ])
            .put(setErrorMessage('Approve Highlight Error', error))
            .run({ silenceTimeout: true });
    });

    it('reject highlight', () => {
        const action = actions.rejectHighlightRequest('highlightId', 'reason');
        return expectSaga(sagas.rejectHighlight, api, action)
            .provide({ call: provideDelay })
            .call(api.rejectHighlight, ({
                highlightId: 'highlightId',
                reason: 'reason'
            }))
            .put(actions.rejectHighlightSuccess('rejected highlight'))
            .put(actions.setSuccessMessage('Highlight successfully rejected'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .run({ silenceTimeout: true });
    });

    it('reject highlight error', () => {
        const error = new Error('error');
        const action = actions.rejectHighlightRequest('highlightId', 'reason');
        return expectSaga(sagas.rejectHighlight, api, action)
            .provide([
                [matchers.call.fn(api.rejectHighlight), throwError(error)]
            ])
            .put(setErrorMessage('Reject Highlight Error', error))
            .run({ silenceTimeout: true });
    });

    it('delete highlight', () => {
        const action = actions.deleteHighlightRequest('highlightId', 'reason');
        return expectSaga(sagas.deleteHighlight, api, action)
            .provide({ call: provideDelay })
            .call(api.deleteHighlight, ({
                highlightId: 'highlightId',
                reason: 'reason'
            }))
            .put(actions.deleteHighlightSuccess('deleted highlight'))
            .put(actions.setSuccessMessage('Highlight successfully deleted'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .run({ silenceTimeout: true });
    });

    it('delete highlight error', () => {
        const error = new Error('error');
        const action = actions.deleteHighlightRequest('highlightId', 'reason');
        return expectSaga(sagas.deleteHighlight, api, action)
            .provide([
                [matchers.call.fn(api.deleteHighlight), throwError(error)]
            ])
            .put(setErrorMessage('Delete Highlight Error', error))
            .run({ silenceTimeout: true });
    });

    it('already fetched rejected highlights', () => {
        const action = actions.fetchAllRejectedHighlightsRequest();
        return expectSaga(sagas.fetchRejectedHighlights, api, action)
            .provide([{ select: alreadyFetchedInfo(true) }])
            .put(actions.cancelFetchingRejectedHighlights())
            .run({ silenceTimeout: true });
    });

    it('fetch rejected highlights', () => {
        const action = actions.fetchAllRejectedHighlightsRequest();
        return expectSaga(sagas.fetchRejectedHighlights, api, action)
            .provide([{ select: alreadyFetchedInfo(false) }])
            .call(api.rejectedHighlights)
            .put(actions.fetchAllRejectedHighlightsSuccess('all rejected highlights'))
            .run({ silenceTimeout: true });
    });

    it('fetch rejected highlights error', () => {
        const error = new Error('error');
        const action = actions.fetchAllRejectedHighlightsRequest();
        return expectSaga(sagas.fetchRejectedHighlights, api, action)
            .provide([
                [matchers.call.fn(api.rejectedHighlights), throwError(error)],
                { select: alreadyFetchedInfo(false) }
            ])
            .put(setErrorMessage('Fetch Rejected Highlights Error', error))
            .run({ silenceTimeout: true });
    });

    it('reapprove rejected highlights', () => {
        const action = actions.reapproveRejectedHighlightRequest('hightlightId');
        return expectSaga(sagas.reapproveRejectedHighlight, api, action)
            .provide({ call: provideDelay })
            .call(api.reapproveRejectedHighlight, ({
                highlightId: 'hightlightId'
            }))
            .put(actions.reapproveRejectedHighlightSuccess('reapproved rejected highlight'))
            .put(actions.setSuccessMessage('Highlight successfully reapproved'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .run({ silenceTimeout: true });
    });

    it('reapprove rejected highlight error', () => {
        const error = new Error('error');
        const action = actions.reapproveRejectedHighlightRequest();
        return expectSaga(sagas.reapproveRejectedHighlight, api, action)
            .provide([
                [matchers.call.fn(api.reapproveRejectedHighlight), throwError(error)]
            ])
            .put(setErrorMessage('Reapprove Rejected Highlight Error', error))
            .run({ silenceTimeout: true });
    });

    it('submit extra result', () => {
        const action = actions.submitExtraStatsRequest(0, 'yellowCard', 'redCard', 'penaltySaved', 'penaltyMissed', 'ownGoal');
        return expectSaga(sagas.submitExtraResults, api, action)
            .provide({ call: provideDelay })
            .call(api.submitExtraResults, ({
                gameWeek: 0,
                yellowCard: 'yellowCard',
                redCard: 'redCard',
                penaltySaved: 'penaltySaved',
                penaltyMissed: 'penaltyMissed',
                ownGoal: 'ownGoal'
            }))
            .put(actions.setSuccessMessage('Extra stats successfully submitted'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .put(actions.cancelSubmittingExtraStats())
            .run({ silenceTimeout: true });
    });

    it('recalculate league positions', () => {
        const action = actions.recalculateLeaguePositionsRequest();
        return expectSaga(sagas.recalculateLeaguePositions, api, action)
            .call(api.recalculateLeaguePositions)
            .put(actions.setRecalculatingLeaguePositions(false))
            .run({ silenceTimeout: true });
    });

    it('recalculate league positions error', () => {
        const error = new Error('error');
        const action = actions.recalculateLeaguePositionsRequest();
        return expectSaga(sagas.recalculateLeaguePositions, api, action)
            .provide([
                [matchers.call.fn(api.recalculateLeaguePositions), throwError(error)]
            ])
            .put(setErrorMessage('Recalculate League Positions Error', error))
            .put(actions.setRecalculatingLeaguePositions(false))
            .run({ silenceTimeout: true });
    });

    it('delete bug', () => {
        const action = actions.deleteFeatureRequest('featureId');
        return expectSaga(sagas.deleteBug, api, action)
            .call(api.deleteBug, ({
                featureId: 'featureId'
            }))
            .put(actions.cancelDeletingBug())
            .run({ silenceTimeout: true });
    });

    it('delete bug error', () => {
        const error = new Error('error');
        const action = actions.deleteFeatureRequest('featureId');
        return expectSaga(sagas.deleteBug, api, action)
            .provide([
                [matchers.call.fn(api.deleteBug), throwError(error)]
            ])
            .put(setErrorMessage('Delete Bug Error', error))
            .put(actions.cancelDeletingBug())
            .run({ silenceTimeout: true });
    });

    it('submit extra result error', () => {
        const error = new Error('error');
        const action = actions.submitExtraStatsRequest(null);
        return expectSaga(sagas.submitExtraResults, api, action)
            .provide([
                [matchers.call.fn(api.submitExtraResults), throwError(error)]
            ])
            .put(setErrorMessage('Submit Extra Results Error', error))
            .run({ silenceTimeout: true });
    });

    it('set has paid subs', () => {
        const action = actions.setHasPaidSubsRequest('changes');
        return expectSaga(sagas.setHasPaidSubs, api, action)
            .call(api.setHasPaidSubs, ({
                changes: 'changes'
            }))
            .put(actions.cancelUpdatingSubs('changes'))
            .run({ silenceTimeout: true });
    });

    it('set has paid subs error', () => {
        const error = new Error('error');
        const action = actions.setHasPaidSubsRequest('changes');
        return expectSaga(sagas.setHasPaidSubs, api, action)
            .provide([
                [matchers.call.fn(api.setHasPaidSubs), throwError(error)]
            ])
            .put(setErrorMessage('Set Subs Paid Error', error))
            .run({ silenceTimeout: true });
    });
});
