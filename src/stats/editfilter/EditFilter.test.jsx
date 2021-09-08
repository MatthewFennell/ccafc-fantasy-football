import { noop } from 'lodash';
import React from 'react';
import Slider from '../../common/slider/Slider';
import StyledButton from '../../common/StyledButton/StyledButton';
import { mount, shallow } from '../../enzyme';
import EditFilter from './EditFilter';

describe('Stats - EditFilter', () => {
    it('The EditFilter component renders without crashing', () => {
        const wrapper = shallow(<EditFilter />);
        expect(() => wrapper).not.toThrow();
    });

    it('The EditFilter component does useful stuff', () => {
        const columns = [
            {
                id: 'goals',
                label: 'Goals',
                initialActive: true
            },
            {
                id: 'assists',
                label: 'Assists',
                initialActive: true
            },
            {
                id: 'cleanSheet',
                label: 'Clean Sheets',
                initialActive: true
            },
            {
                id: 'redCard',
                label: 'Reds',
                initialActive: true
            },
            {
                id: 'yellowCard',
                label: 'Yellows',
                initialActive: true
            },
            {
                id: 'manOfTheMatch',
                label: 'MotM',
                initialActive: true
            },
            {
                id: 'dickOfTheDay',
                label: 'DotD',
                initialActive: true
            },
            {
                id: 'ownGoals',
                label: 'Own Goals',
                initialActive: true
            },
            {
                id: 'penaltySaves',
                label: 'Penalty Saves',
                initialActive: true
            },
            {
                id: 'penaltyMisses',
                label: 'Penalty Misses',
                initialActive: true
            }
        ];
        const mockFn = jest.fn(noop);
        const wrapper = mount(<EditFilter
            activeColumns={columns}
            allColumns={columns}
            confirmFilter={mockFn}
            minWeek={5}
            maxWeek={10}
        />);

        expect(wrapper.find('.columnName')).toHaveLength(10);
        expect(wrapper.find(Slider)).toHaveLength(2);

        wrapper.find(StyledButton).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe(5);
        expect(mockFn.mock.calls[0][1]).toBe(10);
        expect(mockFn.mock.calls[0][2]).toBe(columns);
    });
});
