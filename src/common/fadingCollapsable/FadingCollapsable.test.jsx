import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { noop } from 'lodash';
import React from 'react';
import { mount, shallow } from '../../enzyme';
import FadingCollapsable from './FadingCollapsable';

describe('Fading Collapsable - Comments', () => {
    it('The Fading Collapsable component renders without crashing', () => {
        const wrapper = shallow(<FadingCollapsable />);
        expect(() => wrapper).not.toThrow();
    });

    it('Toggles opening and closing', () => {
        const mockFn = jest.fn(noop);
        const wrapper = mount(<FadingCollapsable addNewComment={mockFn} />);
        expect(wrapper.find(ExpandMoreIcon)).toHaveLength(1);
        expect(wrapper.find(ExpandLessIcon)).toHaveLength(0);
        wrapper.find(ExpandMoreIcon).simulate('click');
        expect(wrapper.find(ExpandMoreIcon)).toHaveLength(0);
        expect(wrapper.find(ExpandLessIcon)).toHaveLength(1);
        wrapper.find(ExpandLessIcon).simulate('click');
        expect(wrapper.find(ExpandMoreIcon)).toHaveLength(1);
        expect(wrapper.find(ExpandLessIcon)).toHaveLength(0);
    });
});
