
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { noop } from 'lodash';
import { CreatePlayerUnconnected } from './CreatePlayer';
import StyledButton from '../../common/StyledButton/StyledButton';
import styles from './CreatePlayer.module.scss';

configure({ adapter: new Adapter() });

describe('Create Player', () => {
    it('The Create Player component renders without crashing', () => {
        const wrapper = shallow(<CreatePlayerUnconnected
            closeCreatePlayerError={noop}
            creatingPlayer={false}
            createPlayerRequest={noop}
            fetchTeamsRequest={noop}
            createPlayerError=""
            createPlayerErrorCode=""
        />);
        expect(() => wrapper).not.toThrow();
    });

    it('Rendering Create Player sends a fetch all teams request', () => {
        const mockFn = jest.fn(noop);

        mount(<CreatePlayerUnconnected
            closeCreatePlayerError={noop}
            creatingPlayer={false}
            createPlayerRequest={noop}
            fetchTeamsRequest={mockFn}
            createPlayerError=""
            createPlayerErrorCode=""
        />);
        expect(mockFn.mock.calls.length).toBe(1);
    });

    it('Create player should have a single Create Player button', () => {
        const wrapper = shallow(<CreatePlayerUnconnected
            closeCreatePlayerError={noop}
            creatingPlayer={false}
            createPlayerRequest={noop}
            fetchTeamsRequest={noop}
            createPlayerError=""
            createPlayerErrorCode=""
        />);
        expect(wrapper.find(StyledButton)).toHaveLength(1);
    });

    it('Clicking Create Player sends a Create Player request', () => {
        const mockFn = jest.fn(noop);
        const wrapper = shallow(<CreatePlayerUnconnected
            closeCreatePlayerError={noop}
            creatingPlayer={false}
            createPlayerRequest={mockFn}
            fetchTeamsRequest={noop}
            createPlayerError=""
            createPlayerErrorCode=""
        />);
        wrapper.find(StyledButton).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
    });

    it('There is a class with hidden only if the player is not being created', () => {
        const wrapper = shallow(<CreatePlayerUnconnected
            closeCreatePlayerError={noop}
            creatingPlayer={false}
            createPlayerRequest={noop}
            fetchTeamsRequest={noop}
            createPlayerError=""
            createPlayerErrorCode=""
        />);
        expect(wrapper.find({ className: styles.hidden })).toHaveLength(1);
    });

    it('There is not a class with hidden only if the player being created', () => {
        const wrapper = shallow(<CreatePlayerUnconnected
            closeCreatePlayerError={noop}
            creatingPlayer
            createPlayerRequest={noop}
            fetchTeamsRequest={noop}
            createPlayerError=""
            createPlayerErrorCode=""
        />);
        expect(wrapper.find({ className: styles.hidden })).toHaveLength(0);
    });
});
