
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { noop } from 'lodash';
import { CreateTeamUnconnected } from './CreateTeam';
import StyledButton from '../../common/StyledButton/StyledButton';
import styles from './CreateTeam.module.scss';

configure({ adapter: new Adapter() });

describe('Create Team', () => {
    it('The Create Team component renders with crashing', () => {
        const wrapper = shallow(<CreateTeamUnconnected
            closeCreateTeamError={noop}
            creatingTeam={false}
            createTeamRequest={noop}
            createTeamError=""
            createTeamErrorCode=""
        />);
        expect(() => wrapper).not.toThrow();
    });

    it('Create player should have a single Create Player button', () => {
        const wrapper = shallow(<CreateTeamUnconnected
            closeCreateTeamError={noop}
            creatingTeam={false}
            createTeamRequest={noop}
            createTeamError=""
            createTeamErrorCode=""
        />);
        expect(wrapper.find(StyledButton)).toHaveLength(1);
    });

    it('Clicking Create Team sends a Create Team request', () => {
        const mockFn = jest.fn(noop);
        const wrapper = shallow(<CreateTeamUnconnected
            closeCreateTeamError={noop}
            creatingTeam={false}
            createTeamRequest={mockFn}
            createTeamError=""
            createTeamErrorCode=""
        />);
        wrapper.find(StyledButton).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
    });

    it('There is a class with hidden only if the team is not being created', () => {
        const wrapper = shallow(<CreateTeamUnconnected
            closeCreateTeamError={noop}
            creatingTeam={false}
            createTeamRequest={noop}
            createTeamError=""
            createTeamErrorCode=""
        />);
        expect(wrapper.find({ className: styles.hidden })).toHaveLength(1);
    });

    it('There is not a class with hidden only if the team being created', () => {
        const wrapper = shallow(<CreateTeamUnconnected
            closeCreateTeamError={noop}
            creatingTeam
            createTeamRequest={noop}
            createTeamError=""
            createTeamErrorCode=""
        />);
        expect(wrapper.find({ className: styles.hidden })).toHaveLength(0);
    });
});
