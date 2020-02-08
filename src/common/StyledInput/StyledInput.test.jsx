
import React from 'react';
import { shallow } from '../../enzyme';
import StyledInput from './StyledInput';

describe('Common - StyledInput', () => {
    it('The StyledInput component renders without crashing', () => {
        const wrapper = shallow(<StyledInput />);
        expect(() => wrapper).not.toThrow();
    });
});
