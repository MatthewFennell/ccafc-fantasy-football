import React from 'react';
import { shallow } from '../enzyme';
import PrivacyPolicy from './PrivacyPolicy';

describe('Privacy Policy', () => {
    it('The PrivacyPolicy component renders without crashing', () => {
        const wrapper = shallow(<PrivacyPolicy />);
        expect(() => wrapper).not.toThrow();
    });
});
