import React from 'react';
import { mount, shallow } from '../../enzyme';
import Summary from './Summary';
import Spinner from '../../common/spinner/Spinner';

describe('Current Team Components - Summary', () => {
    const players = [
        {
            name: 'name',
            team: 'Collingwood A',
            id: 'id 1'
        }, {
            name: 'new name',
            team: 'Collingwood D',
            id: 'id 2'
        }, {
            name: 'no team for this guy',
            team: 'blah team not exist',
            id: 'id 3'
        }
    ];

    it('The Summary component renders without crashing', () => {
        const wrapper = shallow(<Summary />);
        expect(() => wrapper).not.toThrow();
    });

    it('The Summary loading', () => {
        const wrapper = shallow(<Summary loading />);
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });

    it('The Summary normal', () => {
        const wrapper = mount(<Summary loading players={players} captain="id 2" />);
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });
});
