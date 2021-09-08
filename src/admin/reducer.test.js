import * as modalHandlingActions from '../modalHandling/actions';
import * as actions from './actions';
import reducer, { initialState } from './reducer';

describe('Admin reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('fetch teams success', () => {
        const teams = ['a', 'b', 'c'];
        const action = actions.fetchTeamsSuccess(teams);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            allTeams: teams
        });
    });

    it('edit player request', () => {
        const action = actions.editPlayerPriceRequest('playerId', 10, 'team');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isEditingPlayerPrice: true
        });
    });

    it('cancel editing player', () => {
        const action = actions.cancelEditingPlayerPrice();
        expect(reducer({
            ...initialState,
            isEditingPlayerPrice: true
        }, action)).toEqual({
            ...initialState,
            isEditingPlayerPrice: false
        });
    });

    it('add notification request', () => {
        const action = actions.addNotificationRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            addingNotification: true
        });
    });

    it('cancel adding notification', () => {
        const action = actions.cancelAddingNotification();
        expect(reducer({
            ...initialState,
            addingNotification: true
        }, action)).toEqual({
            ...initialState,
            addingNotification: false
        });
    });

    it('edit player price success', () => {
        const action = actions.editPlayerPriceSuccess('playerId', 10, 'team');
        expect(reducer({
            ...initialState,
            teamsWithPlayers: {
                team: [
                    {
                        id: 'playerId',
                        price: 15
                    }, {
                        id: 'id',
                        price: 8
                    }
                ]
            }
        }, action)).toEqual({
            ...initialState,
            teamsWithPlayers: {
                team: [
                    {
                        id: 'playerId',
                        price: 10
                    }, {
                        id: 'id',
                        price: 8
                    }
                ]
            }
        });
    });

    it('create player request', () => {
        const action = actions.createPlayerRequest(null);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            creatingPlayer: true
        });
    });

    it('create player success', () => {
        const action = actions.cancelCreatingPlayer();
        expect(reducer({
            ...initialState,
            creatingPlayer: true
        }, action)).toEqual({
            ...initialState,
            creatingPlayer: false
        });
    });

    it('create team request', () => {
        const action = actions.createTeamRequest(null);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            creatingTeam: true
        });
    });

    it('create team success', () => {
        const action = actions.cancelCreatingTeam();
        expect(reducer({
            ...initialState,
            creatingTeam: true
        }, action)).toEqual({
            ...initialState,
            creatingTeam: false
        });
    });

    it('fetch players for team success', () => {
        const players = ['a', 'b', 'c', 'd'];
        const action = actions.fetchPlayersForTeamSuccess('teamName', players);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            teamsWithPlayers: {
                teamName: players
            }
        });
    });

    it('delete player request', () => {
        const action = actions.deletePlayerRequest(null);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            deletingPlayer: true
        });
    });

    it('delete team request', () => {
        const action = actions.deleteTeamRequest(null);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            deletingTeam: true
        });
    });

    it('delete team success', () => {
        const action = actions.deleteTeamSuccess();
        expect(reducer({
            ...initialState,
            deletingTeam: true
        }, action)).toEqual({
            ...initialState,
            deletingTeam: false
        });
    });

    it('delete player success', () => {
        const action = actions.cancelDeletingPlayer();
        expect(reducer({
            ...initialState,
            deletingPlayer: true
        }, action)).toEqual({
            ...initialState,
            deletingPlayer: false
        });
    });

    it('submit result request', () => {
        const action = actions.submitResultRequest(null);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            submittingResult: true
        });
    });

    it('submit result success', () => {
        const action = actions.cancelSubmittingResult();
        expect(reducer({
            ...initialState,
            submittingResult: true
        }, action)).toEqual({
            ...initialState,
            submittingResult: false
        });
    });

    it('trigger week success', () => {
        const action = actions.cancelTriggeringWeek();
        expect(reducer({
            ...initialState,
            triggeringWeek: true
        }, action)).toEqual({
            ...initialState,
            triggeringWeek: false
        });
    });

    it('trigger week request', () => {
        const action = actions.triggerWeekRequest(null);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            triggeringWeek: true
        });
    });

    it('fetch player stats success', () => {
        const player = {
            assists: 5,
            cleanSheet: true,
            goals: 4,
            redCard: true,
            yellowCard: false,
            manOfTheMatch: false,
            dickOfTheDay: true,
            ownGoals: 10,
            penaltyMisses: 3,
            penaltySaves: 5
        };
        const action = actions.fetchPlayerStatsSuccess(player);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            playerStats: {
                ...player
            }
        });
    });

    it('fetch player stats request', () => {
        const action = actions.fetchPlayerStatsRequest(null, 3);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            fetchingPlayerStats: true
        });
    });

    it('cancel fetching player stats', () => {
        const action = actions.cancelFetchingPlayerStats();
        expect(reducer({
            ...initialState,
            fetchingPlayerStats: true,
            playerStats: {
                fetching: true
            }
        }, action)).toEqual({
            ...initialState,
            fetchingPlayerStats: false,
            playerStats: {
                fetching: false
            }
        });
    });

    it('cancel approving highlight', () => {
        const action = actions.cancelApprovingHighlight();
        expect(reducer({
            ...initialState,
            highlightBeingApproved: 'some highlight'
        }, action)).toEqual({
            ...initialState,
            highlightBeingApproved: ''
        });
    });

    it('cancel rejecting highlight', () => {
        const action = actions.cancelRejectingHighlight();
        expect(reducer({
            ...initialState,
            highlightBeingRejected: 'some highlight'
        }, action)).toEqual({
            ...initialState,
            highlightBeingRejected: ''
        });
    });

    it('cancel deleting highlight', () => {
        const action = actions.cancelDeletingHighlight();
        expect(reducer({
            ...initialState,
            loadingRejectedHighlights: true
        }, action)).toEqual({
            ...initialState,
            loadingRejectedHighlights: false
        });
    });

    it('close error message', () => {
        const action = modalHandlingActions.closeErrorMessage();
        expect(reducer({
            ...initialState,
            creatingPlayer: true,
            creatingTeam: true,
            deletingPlayer: true,
            deletingTeam: true,
            submittingResult: true,
            triggeringWeek: true,
            fetchingPlayerStats: true,
            fetchingUsersWithExtraRoles: true,
            loadingHighlightsForApproval: true,
            loadingRejectedHighlights: true,
            editingStats: true
        }, action)).toEqual({
            ...initialState,
            creatingPlayer: false,
            creatingTeam: false,
            deletingPlayer: false,
            deletingTeam: false,
            submittingResult: false,
            triggeringWeek: false,
            fetchingPlayerStats: false,
            fetchingUsersWithExtraRoles: false,
            loadingHighlightsForApproval: false,
            loadingRejectedHighlights: false,
            editingStats: false
        });
    });

    it('fetch users with extra roles success', () => {
        const usersWithRoles = ['a', 'b', 'c', 'd'];
        const action = actions.fetchUsersWithExtraRolesSuccess(usersWithRoles);
        expect(reducer({
            ...initialState,
            fetchingUsersWithExtraRoles: true
        }, action)).toEqual({
            ...initialState,
            usersWithExtraRoles: usersWithRoles,
            fetchingUsersWithExtraRoles: true
        });
    });

    it('fetch users with extra roles request', () => {
        const action = actions.fetchUsersWithExtraRolesRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            fetchingUsersWithExtraRoles: true
        });
    });

    it('load users with extra roles request', () => {
        const action = actions.loadUsersWithExtraRoles();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            fetchingUsersWithExtraRoles: true
        });
    });

    it('already fetched users with extra roles', () => {
        const action = actions.cancelFetchingUsersWithExtraRoles();
        expect(reducer({
            ...initialState,
            fetchingUsersWithExtraRoles: true
        }, action)).toEqual({
            ...initialState,
            fetchingUsersWithExtraRoles: false
        });
    });

    it('fetch highlights for approval success', () => {
        const highlights = ['a', 'b', 'c', 'd'];
        const action = actions.fetchHighlightsForApprovalSuccess(highlights);
        expect(reducer({
            ...initialState,
            loadingHighlightsForApproval: true
        }, action)).toEqual({
            ...initialState,
            loadingHighlightsForApproval: false,
            highlightsForApproval: highlights,
            loadedHighlightsForApproval: true
        });
    });

    it('fetch highlights for approval request', () => {
        const action = actions.fetchHighlightsForApprovalRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            loadingHighlightsForApproval: true
        });
    });

    it('already fetched highlights for approval', () => {
        const action = actions.cancelingFetchingHighlightsForApproval();
        expect(reducer({
            ...initialState,
            loadingHighlightsForApproval: true
        }, action)).toEqual({
            ...initialState,
            loadingHighlightsForApproval: false
        });
    });

    it('approve highlight success', () => {
        const highlights = [{
            id: 'ignored',
            title: 'title'
        },
        {
            id: 'removed',
            title: 'remove me'
        }];
        const highlight = {
            id: 'removed',
            title: 'remove me'
        };
        const remaining = [{
            id: 'ignored',
            title: 'title'
        }];
        const action = actions.approveHighlightSuccess(highlight);
        expect(reducer({
            ...initialState,
            highlightsForApproval: highlights
        }, action)).toEqual({
            ...initialState,
            highlightsForApproval: remaining
        });
    });

    it('reject highlight success', () => {
        const highlights = [{
            id: 'ignored',
            title: 'title'
        },
        {
            id: 'removed',
            title: 'remove me'
        }];
        const highlight = {
            id: 'removed',
            title: 'remove me'
        };
        const remaining = [{
            id: 'ignored',
            title: 'title'
        }];
        const rejectedHighlights = [
            {
                id: 'alreadyRejected',
                title: 'a rejected highlight'
            }
        ];
        const action = actions.rejectHighlightSuccess(highlight);
        expect(reducer({
            ...initialState,
            highlightsForApproval: highlights,
            rejectedHighlights
        }, action)).toEqual({
            ...initialState,
            highlightsForApproval: remaining,
            rejectedHighlights: rejectedHighlights.concat(highlight)
        });
    });

    it('fetch all rejected highlights request', () => {
        const action = actions.fetchAllRejectedHighlightsRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            loadingRejectedHighlights: true
        });
    });

    it('reapprove rejected highlight request', () => {
        const action = actions.reapproveRejectedHighlightRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            loadingRejectedHighlights: true
        });
    });

    it('fetch all rejected highlights success', () => {
        const highlights = ['a', 'b', 'c', 'd'];
        const action = actions.fetchAllRejectedHighlightsSuccess(highlights);
        expect(reducer({
            ...initialState,
            loadedRejectedHighlights: true
        }, action)).toEqual({
            ...initialState,
            loadedRejectedHighlights: true,
            loadingRejectedHighlights: false,
            rejectedHighlights: highlights
        });
    });

    it('reapprove rejected highlights success', () => {
        const highlight = {
            id: 'id',
            title: 'title'
        };
        const rejectedHighlights = [
            {
                id: 'ignored',
                title: 'a'
            },
            {
                id: 'id',
                title: 'title'
            },
            {
                id: 'b',
                title: 'b'
            }
        ];
        const newHighlights = [
            {
                id: 'ignored',
                title: 'a'
            },
            {
                id: 'b',
                title: 'b'
            }
        ];
        const action = actions.reapproveRejectedHighlightSuccess(highlight);
        expect(reducer({
            ...initialState,
            loadingRejectedHighlights: true,
            rejectedHighlights
        }, action)).toEqual({
            ...initialState,
            loadingRejectedHighlights: true,
            rejectedHighlights: newHighlights
        });
    });

    it('delete highlight success', () => {
        const rejectedHighlights = [
            {
                id: 'firstRejected',
                title: 'hey'
            }
        ];
        const highlight = {
            id: 'gettingRejected',
            title: 'im getting rejected'
        };
        const action = actions.deleteHighlightSuccess(highlight);
        expect(reducer({
            ...initialState,
            rejectedHighlights,
            loadingRejectedHighlights: true
        }, action)).toEqual({
            ...initialState,
            loadingRejectedHighlights: true,
            rejectedHighlights: rejectedHighlights.concat(highlight)
        });
    });

    it('already fetched rejected highlights', () => {
        const action = actions.cancelFetchingRejectedHighlights();
        expect(reducer({
            ...initialState,
            loadingRejectedHighlights: true
        }, action)).toEqual({
            ...initialState,
            loadingRejectedHighlights: false
        });
    });

    it('delete highlight request', () => {
        const action = actions.deleteHighlightRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            loadingRejectedHighlights: true
        });
    });

    it('submit extra stats request', () => {
        const action = actions.submitExtraStatsRequest(null);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            submittingExtraResults: true
        });
    });

    it('submit extra stats success', () => {
        const action = actions.cancelSubmittingExtraStats();
        expect(reducer({
            ...initialState,
            submittingExtraResults: true
        }, action)).toEqual({
            ...initialState,
            submittingExtraResults: false
        });
    });

    it('edit player stats request', () => {
        const action = actions.editPlayerStatsRequest(null);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            editingStats: true
        });
    });

    it('edit player stats success', () => {
        const action = actions.cancelEditingPlayerStats();
        expect(reducer({
            ...initialState,
            editingStats: true
        }, action)).toEqual({
            ...initialState,
            editingStats: false
        });
    });

    it('set has paid subs request', () => {
        const action = actions.setHasPaidSubsRequest(null);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            updatingSubs: true
        });
    });

    it('roll over to next year request', () => {
        const action = actions.rollOverToNextYearRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isRollingOverToNextYear: true
        });
    });

    it('set rolling over to next year', () => {
        const action = actions.setRollingOverToNextYear(true);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isRollingOverToNextYear: true
        });
    });

    it('set bug to delete', () => {
        const action = actions.setBugIdToDelete('bugId');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            bugIdToDelete: 'bugId'
        });
    });

    it('recalculate league positions request', () => {
        const action = actions.recalculateLeaguePositionsRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isRecalculatingLeaguePositions: true
        });
    });

    it('fetch teams request', () => {
        const action = actions.fetchTeamsRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isFetchingTeams: true
        });
    });

    it('set fetching teams', () => {
        const action = actions.setFetchingTeams(true);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isFetchingTeams: true
        });
    });

    it('fetch players for team request', () => {
        const action = actions.fetchPlayersForTeamRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isFetchingPlayersForTeam: true
        });
    });

    it('set fetching players for team', () => {
        const action = actions.setFetchingPlayersForTeam(true);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isFetchingPlayersForTeam: true
        });
    });

    it('approve highlight request', () => {
        const action = actions.approveHighlightRequest('highlightId');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            highlightBeingApproved: 'highlightId'
        });
    });

    it('reject highlight request', () => {
        const action = actions.rejectHighlightRequest('highlightId', 'reason');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            highlightBeingRejected: 'highlightId'
        });
    });

    it('set recalculating league positions', () => {
        const action = actions.setRecalculatingLeaguePositions(true);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isRecalculatingLeaguePositions: true
        });
    });

    it('delete feature request', () => {
        const action = actions.deleteFeatureRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isDeletingBug: true
        });
    });

    it('delete feature success', () => {
        const action = actions.cancelDeletingBug();
        expect(reducer({
            ...initialState,
            isDeletingBug: true,
            bugIdToDelete: 'gsaasfsa'
        }, action)).toEqual({
            ...initialState,
            isDeletingBug: false,
            bugIdToDelete: ''
        });
    });

    it('set has paid subs success', () => {
        const action = actions.cancelUpdatingSubs();
        expect(reducer({
            ...initialState,
            updatingSubs: true
        }, action)).toEqual({
            ...initialState,
            updatingSubs: false
        });
    });
});
