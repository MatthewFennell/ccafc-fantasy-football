
import React from 'react';
import { shallow } from '../../enzyme';
import Toggle from './Toggle';

describe('Common - Toggle', () => {
    it('The Toggle component renders without crashing', () => {
        const wrapper = shallow(<Toggle />);
        expect(() => wrapper).not.toThrow();
    });
});
