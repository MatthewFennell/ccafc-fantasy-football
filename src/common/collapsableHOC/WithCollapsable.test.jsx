import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { noop } from 'lodash';
import React from 'react';
import { mount, shallow } from '../../enzyme';
import WithCollapsable from './WithCollapsable';

const dummyComponent = () => <div>Test</div>;
const HOC = WithCollapsable(dummyComponent);

describe('Common - WithCollapsable', () => {
    it('The WithCollapsable component renders without crashing - isOpen = false', () => {
        const wrapper = shallow(<HOC isOpen={false} />);
        expect(() => wrapper).not.toThrow();
    });

    it('The WithCollapsable component renders without crashing - isOpen = true', () => {
        const wrapper = shallow(<HOC isOpen />);
        expect(() => wrapper).not.toThrow();
    });

    it('Toggle expanding with no id', () => {
        const mockFn = jest.fn(noop);
        const wrapper = mount(<HOC isOpen toggle={mockFn} />);
        expect(wrapper.find(dummyComponent)).toHaveLength(1);
        expect(wrapper.find(ExpandLessIcon)).toHaveLength(1);
        wrapper.find(ExpandLessIcon).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe(false);
    });

    it('Toggle expanding with id', () => {
        const mockFn = jest.fn(noop);
        const wrapper = mount(<HOC isOpen toggle={mockFn} id="id" />);
        expect(wrapper.find(ExpandLessIcon)).toHaveLength(1);
        wrapper.find(ExpandLessIcon).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe(false, 'id');
    });

    it('Toggle closing with no id', () => {
        const mockFn = jest.fn(noop);
        const wrapper = mount(<HOC isOpen={false} toggle={mockFn} />);
        expect(wrapper.find(ExpandMoreIcon)).toHaveLength(1);
        wrapper.find(ExpandMoreIcon).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe(true);
    });

    it('Toggle closing with', () => {
        const mockFn = jest.fn(noop);
        const wrapper = mount(<HOC isOpen={false} toggle={mockFn} id="id" title="title" />);
        expect(wrapper.find(ExpandMoreIcon)).toHaveLength(1);
        wrapper.find(ExpandMoreIcon).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe(true, 'id');
        expect(wrapper.find('.collapsedTitle').text()).toBe('title (Click to expand)');

        wrapper.find('.iconWrapper').simulate('click');
    });

    it('Toggle expand', () => {
        const mockFn = jest.fn(noop);
        const wrapper = mount(<HOC isOpen={false} toggle={mockFn} id="id" title="title" />);

        wrapper.find('.collapsedTitle').simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe(true, 'id');
    });
});
