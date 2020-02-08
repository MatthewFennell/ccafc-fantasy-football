
import React from 'react';
import { shallow } from '../enzyme';
import MyFeatureRequests from './MyFeatureRequests';

describe('Feature Requests - MyFeatureRequests', () => {
    it('The MyFeatureRequests component renders without crashing', () => {
        const wrapper = shallow(<MyFeatureRequests />);
        expect(() => wrapper).not.toThrow();
    });
});
