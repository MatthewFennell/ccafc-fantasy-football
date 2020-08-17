import * as helpers from './helpers';

describe('Filtering videod', () => {
    const players = [
        {
            name: 'name',
            hasPaidSubs: true,
            team: 'Collingwood A'
        },
        {
            name: 'new name',
            hasPaidSubs: false,
            team: 'Collingwood B'
        }
    ];

    it('Filter players have paid subs', () => {
        expect(helpers.filterPlayers(players, 'Collingwood A', 'paid', '')).toEqual([
            {
                name: 'name',
                hasPaidSubs: true,
                team: 'Collingwood A'
            }
        ]);
    });

    it('Filter players have not paid subs', () => {
        expect(helpers.filterPlayers(players, '', 'notPaid', '')).toEqual([
            {
                name: 'new name',
                hasPaidSubs: false,
                team: 'Collingwood B'
            }
        ]);
    });

    it('Filter players no filters', () => {
        expect(helpers.filterPlayers(players, 'All', '', '')).toEqual([
            {
                name: 'name',
                hasPaidSubs: true,
                team: 'Collingwood A'
            },
            {
                name: 'new name',
                hasPaidSubs: false,
                team: 'Collingwood B'
            }
        ]);
    });

    it('Generate teams', () => {
        const playersDoubledTeams = [
            {
                name: 'name',
                hasPaidSubs: true,
                team: 'Collingwood A'
            },
            {
                name: 'new name',
                hasPaidSubs: false,
                team: 'Collingwood B'
            },
            {
                name: 'new name again',
                hasPaidSubs: false,
                team: 'Collingwood B'
            }
        ];

        expect(helpers.generateTeams(playersDoubledTeams)).toEqual([
            {
                value: 'All',
                text: 'All teams',
                id: 'All'
            },
            {
                value: 'Collingwood A',
                text: 'Collingwood A',
                id: 'Collingwood A'
            },
            {
                value: 'Collingwood B',
                text: 'Collingwood B',
                id: 'Collingwood B'
            }
        ]);
    });
});
