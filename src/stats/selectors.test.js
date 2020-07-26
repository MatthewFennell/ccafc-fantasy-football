import * as selectors from './selectors';

describe('Stats selectors', () => {
    const teamId = 'teamId';

    const state = {
        stats: {
            teamStatsByWeek: {
                [teamId]: {
                    fetching: true
                }
            }
        }
    };

    const props = {
        match: {
            params: {
                minWeek: '15',
                maxWeek: '25',
                teamId
            }
        }
    };

    it('Get current min week', () => {
        expect(selectors.getCurrentMinWeek(props)).toEqual(15);
    });

    it('Get current max week', () => {
        expect(selectors.getCurrentMaxWeek(props)).toEqual(25);
    });

    it('Get current team', () => {
        expect(selectors.getCurrentMaxWeek(props)).toEqual(25);
    });

    it('Get current team id', () => {
        expect(selectors.getCurrentTeam(props)).toEqual(teamId);
    });

    it('Get property', () => {
        expect(selectors.getProperty(state, props, 'fetching')).toEqual(true);
    });
});
