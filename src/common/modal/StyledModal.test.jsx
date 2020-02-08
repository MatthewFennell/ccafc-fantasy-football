
import React from 'react';
import { shallow } from '../../enzyme';
import StyledModal from './StyledModal';

describe('Common - StyledModal', () => {
    it('The StyledModal component renders without crashing', () => {
        const wrapper = shallow(<StyledModal>Children</StyledModal>);
        expect(() => wrapper).not.toThrow();
    });
});
