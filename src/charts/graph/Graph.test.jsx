
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Graph from './Graph';

configure({ adapter: new Adapter() });

describe('Charts - Graph', () => {
    it('The Graph component renders without crashing', () => {
        const wrapper = shallow(<Graph />);
        expect(() => wrapper).not.toThrow();
    });
});
