import React from 'react';
import { noop } from 'lodash';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TableRow from '@material-ui/core/TableRow';
import Linear from '../spinner/LinearSpinner';
import { mount, shallow } from '../../enzyme';
import Grid from './Grid';
import StyledButton from '../StyledButton/StyledButton';

describe('Common - Grid', () => {
    const columns = [
        {
            id: 'position',
            label: 'Pos',
            align: 'center',
            renderCell: true
        },
        {
            id: 'team',
            label: 'Team',
            align: 'center'
        },
        {
            id: 'wins',
            label: 'W',
            align: 'center'
        },
        {
            id: 'draws',
            label: 'D',
            align: 'center'
        },
        {
            id: 'losses',
            label: 'L',
            align: 'center'
        },
        {
            id: 'goalDifference',
            label: 'GD',
            align: 'center'
        },
        {
            id: 'score',
            label: 'Pts',
            align: 'center',
            renderCell: true
        }
    ];

    const rows = [
        {
            goalDifference: 44,
            wins: 11,
            draws: 0,
            losses: 1,
            gamesPlayed: 12,
            score: 33,
            team: 'Collingwood A',
            id: 'Collingwood A'
        },
        {
            goalDifference: 29,
            wins: 7,
            draws: 3,
            losses: 0,
            gamesPlayed: 10,
            score: 24,
            team: 'Collingwood J',
            id: 'Collingwood J'
        },
        {
            goalDifference: 18,
            wins: 7,
            draws: 3,
            losses: 1,
            gamesPlayed: 11,
            score: 24,
            team: 'Collingwood B',
            id: 'Collingwood B'
        },
        {
            goalDifference: 17,
            wins: 7,
            draws: 3,
            losses: 1,
            gamesPlayed: 11,
            score: 24,
            team: 'Collingwood L',
            id: 'Collingwood L'
        },
        {
            goalDifference: 13,
            wins: 7,
            draws: 2,
            losses: 2,
            gamesPlayed: 11,
            score: 23,
            team: 'Collingwood E',
            id: 'Collingwood E'
        },
        {
            goalDifference: 33,
            wins: 7,
            draws: 1,
            losses: 2,
            gamesPlayed: 10,
            score: 22,
            team: 'Collingwood K',
            id: 'Collingwood K'
        },
        {
            goalDifference: 6,
            wins: 7,
            draws: 1,
            losses: 3,
            gamesPlayed: 11,
            score: 22,
            team: 'Collingwood C',
            id: 'Collingwood C'
        },
        {
            goalDifference: 15,
            wins: 6,
            draws: 2,
            losses: 2,
            gamesPlayed: 10,
            score: 20,
            team: 'Collingwood H',
            id: 'Collingwood H'
        },
        {
            goalDifference: 3,
            wins: 5,
            draws: 2,
            losses: 3,
            gamesPlayed: 10,
            score: 17,
            team: 'Collingwood I',
            id: 'Collingwood I'
        },
        {
            goalDifference: 10,
            wins: 5,
            draws: 1,
            losses: 5,
            gamesPlayed: 11,
            score: 16,
            team: 'Collingwood M',
            id: 'Collingwood M'
        },
        {
            goalDifference: -6,
            wins: 5,
            draws: 0,
            losses: 7,
            gamesPlayed: 12,
            score: 15,
            team: 'Collingwood F',
            id: 'Collingwood F'
        },
        {
            goalDifference: 2,
            wins: 4,
            draws: 0,
            losses: 7,
            gamesPlayed: 11,
            score: 12,
            team: 'Collingwood G',
            id: 'Collingwood G'
        },
        {
            goalDifference: -4,
            wins: 4,
            draws: 0,
            losses: 8,
            gamesPlayed: 12,
            score: 12,
            team: 'Collingwood D',
            id: 'Collingwood D'
        },
        {
            goalDifference: -7,
            wins: 3,
            draws: 2,
            losses: 7,
            gamesPlayed: 12,
            score: 11,
            team: 'Collingwood N',
            id: 'Collingwood N'
        }
    ];

    it('The Grid component renders without crashing', () => {
        const wrapper = shallow(<Grid />);
        expect(() => wrapper).not.toThrow();
    });

    it('The Grid component renders the back button', () => {
        const mockFn = jest.fn(noop);

        const wrapper = mount(<Grid
            renderBackButton
            backButtonLink={mockFn}
        />);

        expect(wrapper.find(ArrowBackIcon)).toHaveLength(1);
        wrapper.find(ArrowBackIcon).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
    });

    it('The Grid renders header', () => {
        const gridHeader = 'grid header';
        const wrapper = mount(<Grid
            renderBackButton
            gridHeader={gridHeader}
        />);

        expect(wrapper.find('.gridHeaderText')).toHaveLength(1);
        expect(wrapper.find('.gridHeaderText').text()).toBe(gridHeader);
    });

    it('The Grid is loading', () => {
        const wrapper = mount(<Grid
            loading
        />);

        expect(wrapper.find(Linear)).toHaveLength(1);
    });

    it('The Grid renders rows when no default per page set', () => {
        const wrapper = mount(<Grid
            rows={rows}
            columns={columns}
        />);

        expect(wrapper.find(TableRow)).toHaveLength(6);
    });

    it('The Grid renders more rows when default per page set', () => {
        const wrapper = mount(<Grid
            rows={rows}
            columns={columns}
            rowsPerPageOptions={[100]}
        />);

        expect(wrapper.find(TableRow)).toHaveLength(15);
    });

    it('Triggers on row click', () => {
        const mockFn = jest.fn(noop);

        const wrapper = mount(<Grid
            onRowClick={mockFn}
            rows={rows}
            columns={columns}
            rowsPerPageOptions={[100]}
        />);

        wrapper.find(TableRow).at(2).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe(rows[1]);
    });

    it('The Grid renders CSV button', () => {
        const wrapper = mount(<Grid
            showDownloadAsCsv
        />);

        expect(wrapper.find(StyledButton)).toHaveLength(1);
        wrapper.find(StyledButton).simulate('click');
    });
});
