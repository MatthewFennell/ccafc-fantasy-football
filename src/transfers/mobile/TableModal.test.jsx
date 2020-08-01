import React from 'react';
import { noop } from 'lodash';
import Switch from '../../common/Switch/Switch';
import { shallow } from '../../enzyme';
import TableModal from './TableModal';

describe('Transfers - Mobile - TableModal', () => {
    it('The TableModal component renders without crashing', () => {
        const wrapper = shallow(<TableModal sortingComponent="test" />);
        expect(() => wrapper).not.toThrow();
    });

    it('The TableModal component renders the correct number of switches', () => {
        const columnOptions = [
            {
                id: 'name',
                name: 'Name',
                fixed: true,
                active: true,
                align: 'center'
            },
            {
                id: 'position',
                name: 'Pos',
                fixed: false,
                active: true,
                align: 'center'
            },
            {
                id: 'team',
                name: 'Team',
                fixed: false,
                active: true,
                align: 'center'
            },
            {
                id: 'price',
                name: 'Price',
                fixed: false,
                active: false,
                align: 'center'
            },
            {
                id: 'points',
                name: 'Points',
                fixed: false,
                active: true,
                align: 'center'
            },
            {
                id: 'goals',
                name: 'Goals',
                fixed: false,
                active: false,
                align: 'center'
            },
            {
                id: 'assists',
                name: 'Assists',
                fixed: false,
                active: false,
                align: 'center'
            },
            {
                id: 'previousScore',
                name: 'Previous Score',
                fixed: false,
                active: false,
                align: 'center'
            }
        ];

        const activeColumns = [
            {
                id: 'name',
                name: 'Name',
                fixed: true,
                active: true,
                align: 'center'
            },
            {
                id: 'position',
                name: 'Pos',
                fixed: false,
                active: true,
                align: 'center'
            },
            {
                id: 'team',
                name: 'Team',
                fixed: false,
                active: true,
                align: 'center'
            },
            {
                id: 'points',
                name: 'Points',
                fixed: false,
                active: true,
                align: 'center'
            }
        ];

        const mockFn = jest.fn(noop);

        const event = { };

        const wrapper = shallow(<TableModal
            columnOptions={columnOptions}
            activeColumns={activeColumns}
            sortingComponent="test"
            toggleColumns={mockFn}
        />);
        expect(() => wrapper).not.toThrow();
        expect(wrapper.find(Switch)).toHaveLength(7);

        wrapper.find(Switch).at(4).simulate('change', event);
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe('goals');
    });
});
