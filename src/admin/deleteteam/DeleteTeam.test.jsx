
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { noop } from 'lodash';
import { DeleteTeamUnconnected } from './DeleteTeam';
import StyledButton from '../../common/StyledButton/StyledButton';
import styles from './DeleteTeam.module.scss';

configure({ adapter: new Adapter() });

describe('Delete Team', () => {
    it('The Delete Team component renders with crashing', () => {
        const wrapper = shallow(<DeleteTeamUnconnected
            closeDeleteTeamError={noop}
            deletingTeam={false}
            deleteTeamRequest={noop}
            fetchTeamsRequest={noop}
            deleteTeamError=""
            deleteTeamErrorCode=""
        />);
        expect(() => wrapper).not.toThrow();
    });

    it('Delete team should have a single Delete Team button', () => {
        const wrapper = shallow(<DeleteTeamUnconnected
            closeDeleteTeamError={noop}
            deletingTeam={false}
            deleteTeamRequest={noop}
            fetchTeamsRequest={noop}
            deleteTeamError=""
            deleteTeamErrorCode=""
        />);
        expect(wrapper.find(StyledButton)).toHaveLength(1);
    });

    it('Clicking Delete Team sends a Delete Team request', () => {
        const mockFn = jest.fn(noop);
        const wrapper = shallow(<DeleteTeamUnconnected
            closeDeleteTeamError={noop}
            deletingTeam={false}
            deleteTeamRequest={mockFn}
            fetchTeamsRequest={noop}
            deleteTeamError=""
            deleteTeamErrorCode=""
        />);
        wrapper.find(StyledButton).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
    });

    it('There is a class with hidden only if the team is not being deleted', () => {
        const wrapper = shallow(<DeleteTeamUnconnected
            closeDeleteTeamError={noop}
            deletingTeam={false}
            deleteTeamRequest={noop}
            fetchTeamsRequest={noop}
            deleteTeamError=""
            deleteTeamErrorCode=""
        />);
        expect(wrapper.find({ className: styles.hidden })).toHaveLength(1);
    });

    it('There is not a class with hidden only if the team being deleted', () => {
        const wrapper = shallow(<DeleteTeamUnconnected
            closeDeleteTeamError={noop}
            deletingTeam
            deleteTeamRequest={noop}
            fetchTeamsRequest={noop}
            deleteTeamError=""
            deleteTeamErrorCode=""
        />);
        expect(wrapper.find({ className: styles.hidden })).toHaveLength(0);
    });
});
