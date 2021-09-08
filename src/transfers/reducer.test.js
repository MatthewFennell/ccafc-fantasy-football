import * as adminActions from '../admin/actions';
import * as currentTeamActions from '../currentteam/actions';
import * as overviewActions from '../overview/actions';
import * as actions from './actions';
import reducer, { initialState } from './reducer';

describe('Transfers reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should set fetching stats loading for the user id', () => {
        const action = overviewActions.fetchUserStatsRequest('myUserId');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            fetchingUserStats: true
        });
    });

    it('fetch user stats success', () => {
        const userStats = {
            remainingBudget: 100,
            remainingTransfers: 5,
            totalPoints: 10
        };
        const action = overviewActions.fetchUserStatsSuccess('myUserId', userStats);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            remainingTransfers: 5,
            originalBudget: 100,
            remainingBudget: 100,
            fetchingUserStats: false
        });
    });

    it('fetching active team request', () => {
        const action = currentTeamActions.fetchActiveTeamRequest('myUserId');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            fetchingOriginalTeam: true
        });
    });

    it('cancel fetching user stats', () => {
        const action = overviewActions.cancelFetchingUserStats();
        expect(reducer({
            ...initialState,
            fetchingUserStats: true
        }, action)).toEqual({
            ...initialState,
            fetchingUserStats: false
        });
    });

    it('cancel fetching original team', () => {
        const action = actions.cancelFetchingOriginalTeam();
        expect(reducer({
            ...initialState,
            fetchingOriginalTeam: true
        }, action)).toEqual({
            ...initialState,
            fetchingOriginalTeam: false
        });
    });

    it('cancel fetching active team', () => {
        const action = currentTeamActions.cancelFetchingActiveTeam();
        expect(reducer({
            ...initialState,
            fetchingOriginalTeam: true
        }, action)).toEqual({
            ...initialState,
            fetchingOriginalTeam: false
        });
    });

    it('cancel fetching all players', () => {
        const action = actions.cancelFetchingAllPlayers();
        expect(reducer({
            ...initialState,
            fetchingAllPlayers: true
        }, action)).toEqual({
            ...initialState,
            fetchingAllPlayers: false
        });
    });

    it('cancel updating team', () => {
        const action = actions.cancelUpdatingTeam();
        expect(reducer({
            ...initialState,
            fetchingOriginalTeam: true
        }, action)).toEqual({
            ...initialState,
            fetchingOriginalTeam: false
        });
    });

    it('fetch active team success', () => {
        const activeTeam = ['Active team'];
        const action = currentTeamActions.fetchActiveTeamSuccess('myUserId', activeTeam);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            fetchingOriginalTeam: false,
            originalTeam: activeTeam,
            currentTeam: activeTeam
        });
    });

    it('fetch all players success', () => {
        const allPlayers = ['all of the players', 'more players'];
        const action = actions.fetchAllPlayersSuccess(allPlayers);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            fetchingAllPlayers: false,
            allPlayers
        });
    });

    it('fetch all players request', () => {
        const action = actions.fetchAllPlayersRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            fetchingAllPlayers: true
        });
    });

    it('fetch all teams success', () => {
        const allTeams = ['a team', 'another team'];
        const action = actions.fetchAllTeamsSuccess(allTeams);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            allTeams
        });
    });

    it('add first player to team', () => {
        const player = {
            id: 'test',
            position: 'DEFENDER',
            price: 15
        };
        const action = actions.addPlayerToCurrentTeamSuccess(player);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            currentTeam: [player],
            remainingBudget: -15
        });
    });

    it('replaces the first inactive player with the player being added', () => {
        const player = {
            id: 'test',
            position: 'DEFENDER',
            price: 15
        };

        const currentTeam = [
            {
                id: 'p1',
                position: 'DEFENDER',
                price: 15,
                inactive: false
            },
            {
                id: 'p2',
                position: 'DEFENDER',
                price: 8,
                inactive: true
            },
            {
                id: 'p3',
                position: 'DEFENDER',
                price: 5,
                inactive: true
            }
        ];
        const replacedTeam = [
            {
                id: 'p1',
                position: 'DEFENDER',
                price: 15,
                inactive: false
            },
            {
                id: 'test',
                position: 'DEFENDER',
                price: 15
            },
            {
                id: 'p3',
                position: 'DEFENDER',
                price: 5,
                inactive: true
            }
        ];
        const action = actions.addPlayerToCurrentTeamSuccess(player);
        expect(reducer({
            ...initialState,
            currentTeam
        }, action)).toEqual({
            ...initialState,
            currentTeam: replacedTeam,
            remainingBudget: -15
        });
    });

    it('replaces the first inactive player if there are 12 players', () => {
        const player = {
            id: 'test',
            position: 'ATTACKER',
            price: 3
        };

        const currentTeam = [
            {
                id: 'p0',
                position: 'GOALKEEPER',
                price: 1,
                inactive: false
            },
            {
                id: 'p1',
                position: 'DEFENDER',
                price: 15,
                inactive: false
            },
            {
                id: 'p2',
                position: 'DEFENDER',
                price: 8,
                inactive: false
            },
            {
                id: 'p3',
                position: 'DEFENDER',
                price: 5,
                inactive: true
            },
            {
                id: 'p4',
                position: 'DEFENDER',
                price: 15,
                inactive: false
            },
            {
                id: 'p5',
                position: 'MIDFIELDER',
                price: 15,
                inactive: false
            },
            {
                id: 'p6',
                position: 'MIDFIELDER',
                price: 15,
                inactive: false
            },
            {
                id: 'p7',
                position: 'MIDFIELDER',
                price: 15,
                inactive: false
            },
            {
                id: 'p8',
                position: 'MIDFIELDER',
                price: 15,
                inactive: false
            },
            {
                id: 'p9',
                position: 'ATTACKER',
                price: 15,
                inactive: false
            },
            {
                id: 'p10',
                position: 'ATTACKER',
                price: 15,
                inactive: false
            }
        ];

        const action = actions.addPlayerToCurrentTeamSuccess(player);
        expect(reducer({
            ...initialState,
            currentTeam
        }, action)).toEqual({
            ...initialState,
            currentTeam: currentTeam.filter(x => x.id !== 'p3').concat(player),
            remainingBudget: -3
        });
    });

    it('undo transfers changes', () => {
        const action = actions.undoTransferChanges();
        expect(reducer({
            ...initialState,
            originalTeam: ['The original team'],
            originalBudget: 150,
            currentTeam: ['some changes have been made'],
            remainingBudget: 2500
        }, action)).toEqual({
            ...initialState,
            originalTeam: ['The original team'],
            originalBudget: 150,
            currentTeam: ['The original team'],
            remainingBudget: 150
        });
    });

    it('remove player from current team when they were in the original team', () => {
        const originalTeam = [
            {
                id: 'p0',
                position: 'GOALKEEPER',
                price: 1,
                name: 'name 0'
            },
            {
                id: 'p1',
                position: 'DEFENDER',
                price: 15,
                name: 'name 1'
            },
            {
                id: 'p2',
                position: 'DEFENDER',
                price: 8,
                name: 'name 2'
            },
            {
                id: 'p3',
                position: 'DEFENDER',
                price: 5,
                name: 'name 3'
            },
            {
                id: 'p4',
                position: 'DEFENDER',
                price: 15,
                name: 'name 4'
            },
            {
                id: 'p5',
                position: 'MIDFIELDER',
                price: 15,
                name: 'name 5'
            },
            {
                id: 'p6',
                position: 'MIDFIELDER',
                price: 15,
                name: 'name 6'
            },
            {
                id: 'p7',
                position: 'MIDFIELDER',
                price: 15,
                name: 'name 7'
            },
            {
                id: 'p8',
                position: 'MIDFIELDER',
                price: 15,
                name: 'name 8'
            },
            {
                id: 'p9',
                position: 'ATTACKER',
                price: 15,
                name: 'name 9'
            },
            {
                id: 'p10',
                position: 'ATTACKER',
                price: 15,
                name: 'name 10'
            }
        ];

        const teamAfterRemoval = [
            {
                id: 'p0',
                position: 'GOALKEEPER',
                price: 0,
                name: 'name 0 (removed)',
                inactive: true
            },
            {
                id: 'p1',
                position: 'DEFENDER',
                price: 15,
                name: 'name 1'
            },
            {
                id: 'p2',
                position: 'DEFENDER',
                price: 8,
                name: 'name 2'
            },
            {
                id: 'p3',
                position: 'DEFENDER',
                price: 5,
                name: 'name 3'
            },
            {
                id: 'p4',
                position: 'DEFENDER',
                price: 15,
                name: 'name 4'
            },
            {
                id: 'p5',
                position: 'MIDFIELDER',
                price: 15,
                name: 'name 5'
            },
            {
                id: 'p6',
                position: 'MIDFIELDER',
                price: 15,
                name: 'name 6'
            },
            {
                id: 'p7',
                position: 'MIDFIELDER',
                price: 15,
                name: 'name 7'
            },
            {
                id: 'p8',
                position: 'MIDFIELDER',
                price: 15,
                name: 'name 8'
            },
            {
                id: 'p9',
                position: 'ATTACKER',
                price: 15,
                name: 'name 9'
            },
            {
                id: 'p10',
                position: 'ATTACKER',
                price: 15,
                name: 'name 10'
            }
        ];

        const playerToRemove = {
            id: 'p0',
            position: 'GOALKEEPER',
            price: 1,
            name: 'name 0'
        };

        const action = actions.removePlayerFromCurrentTeam(playerToRemove);
        expect(reducer({
            ...initialState,
            originalTeam,
            currentTeam: originalTeam
        }, action)).toEqual({
            ...initialState,
            currentTeam: teamAfterRemoval,
            originalTeam,
            remainingBudget: 1
        });
    });

    it('remove player from current team when they were not in the original team', () => {
        const originalTeam = [
            {
                id: 'p0',
                position: 'GOALKEEPER',
                price: 1,
                name: 'name 0'
            },
            {
                id: 'p1',
                position: 'DEFENDER',
                price: 15,
                name: 'name 1'
            },
            {
                id: 'p2',
                position: 'DEFENDER',
                price: 8,
                name: 'name 2'
            },
            {
                id: 'p3',
                position: 'DEFENDER',
                price: 5,
                name: 'name 3'
            },
            {
                id: 'p4',
                position: 'DEFENDER',
                price: 15,
                name: 'name 4'
            },
            {
                id: 'p5',
                position: 'MIDFIELDER',
                price: 15,
                name: 'name 5'
            },
            {
                id: 'p6',
                position: 'MIDFIELDER',
                price: 15,
                name: 'name 6'
            },
            {
                id: 'p7',
                position: 'MIDFIELDER',
                price: 15,
                name: 'name 7'
            },
            {
                id: 'p8',
                position: 'MIDFIELDER',
                price: 15,
                name: 'name 8'
            },
            {
                id: 'p9',
                position: 'ATTACKER',
                price: 15,
                name: 'name 9'
            },
            {
                id: 'p10',
                position: 'ATTACKER',
                price: 15,
                name: 'name 10'
            }
        ];

        const teamAfterRemoval = [
            {
                id: 'p1',
                position: 'DEFENDER',
                price: 15,
                name: 'name 1'
            },
            {
                id: 'p2',
                position: 'DEFENDER',
                price: 8,
                name: 'name 2'
            },
            {
                id: 'p3',
                position: 'DEFENDER',
                price: 5,
                name: 'name 3'
            },
            {
                id: 'p4',
                position: 'DEFENDER',
                price: 15,
                name: 'name 4'
            },
            {
                id: 'p5',
                position: 'MIDFIELDER',
                price: 15,
                name: 'name 5'
            },
            {
                id: 'p6',
                position: 'MIDFIELDER',
                price: 15,
                name: 'name 6'
            },
            {
                id: 'p7',
                position: 'MIDFIELDER',
                price: 15,
                name: 'name 7'
            },
            {
                id: 'p8',
                position: 'MIDFIELDER',
                price: 15,
                name: 'name 8'
            },
            {
                id: 'p9',
                position: 'ATTACKER',
                price: 15,
                name: 'name 9'
            },
            {
                id: 'p10',
                position: 'ATTACKER',
                price: 15,
                name: 'name 10'
            }
        ];

        const playerToRemove = {
            id: 'p0',
            position: 'GOALKEEPER',
            price: 1,
            name: 'name 0'
        };

        const action = actions.removePlayerFromCurrentTeam(playerToRemove);
        expect(reducer({
            ...initialState,
            currentTeam: originalTeam
        }, action)).toEqual({
            ...initialState,
            currentTeam: teamAfterRemoval,
            remainingBudget: 1
        });
    });

    it('already fetched all players', () => {
        const action = actions.cancelFetchingPlayers();
        expect(reducer({
            ...initialState,
            fetchingAllPlayers: true
        }, action)).toEqual({
            ...initialState,
            fetchingAllPlayers: false
        });
    });

    it('restore player request', () => {
        const action = actions.restorePlayerRequest('playerId');

        const allPlayers = [
            {
                id: 'playerId',
                name: 'Heimerdinger',
                price: 15
            }
        ];

        const currentTeam = [
            {
                id: 'playerId',
                name: 'Heimerdinger (removed)',
                inactive: true,
                price: 0
            }
        ];

        const newTeam = [
            {
                id: 'playerId',
                name: 'Heimerdinger',
                price: 15
            }
        ];

        expect(reducer({
            ...initialState,
            allPlayers,
            currentTeam
        },
        action)).toEqual({
            ...initialState,
            allPlayers,
            currentTeam: newTeam,
            remainingBudget: -15
        });
    });

    it('replace player success', () => {
        const playerToAdd = {
            id: 'playerId',
            price: 20
        };

        const playerToRemove = {
            id: 'playerToRemove',
            price: 10
        };

        const currentTeam = [playerToRemove];

        const action = actions.replacePlayerSuccess(playerToRemove, playerToAdd);

        expect(reducer({
            ...initialState,
            currentTeam
        },
        action)).toEqual({
            ...initialState,
            currentTeam: [playerToAdd],
            remainingBudget: -10
        });
    });

    it('update team request', () => {
        const action = actions.updateTeamRequest(null);

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            fetchingOriginalTeam: true
        });
    });

    it('set has paid subs', () => {
        const allPlayers = [
            {
                id: 'p0',
                hasPaidSubs: false
            },
            {
                id: 'p1',
                hasPaidSubs: true
            },
            {
                id: 'p2',
                hasPaidSubs: false
            },
            {
                id: 'p3',
                hasPaidSubs: true
            }
        ];

        const changes = [
            {
                playerId: 'p0',
                hasPaidSubs: true
            },
            {
                playerId: 'p1',
                hasPaidSubs: false
            }
        ];

        const newPlayers = [
            {
                id: 'p0',
                hasPaidSubs: true
            },
            {
                id: 'p1',
                hasPaidSubs: false
            },
            {
                id: 'p2',
                hasPaidSubs: false
            },
            {
                id: 'p3',
                hasPaidSubs: true
            }
        ];

        const action = adminActions.cancelUpdatingSubs(changes);

        expect(reducer({
            ...initialState,
            allPlayers
        }, action)).toEqual({
            ...initialState,
            allPlayers: newPlayers
        });
    });
});
