import React from 'react';
import { mount, shallow } from '../../enzyme';
import { players } from '../../test/players';
import Table from './Table';

describe('Transfers - Mobile - Table', () => {
    it('The Table component renders without crashing', () => {
        const wrapper = shallow(<Table />);
        expect(() => wrapper).not.toThrow();
    });

    it('The Table component renders useful data', () => {
        const myColumns = [
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
        const wrapper = mount(<Table
            players={players}
            stateObj={{
                myColumns,
                searchByName: ''
            }}
            sortBy="name"
            playerToRemove={
                {
                    name: 'name',
                    position: 'MIDFIELDER',
                    price: 100
                }
            }
        />);
        expect(() => wrapper).not.toThrow();
        expect(wrapper.find('.playerRemoved')).toHaveLength(1);
    });
});
