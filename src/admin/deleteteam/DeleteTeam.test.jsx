import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import StyledButton from '../../common/StyledButton/StyledButton';
import { mount, shallow } from '../../enzyme';
import { initialState } from '../reducer';
import DeleteTeam, { DeleteTeamUnconnected } from './DeleteTeam';
import styles from './DeleteTeam.module.scss';

describe('Delete Team', () => {
    it('The Delete Team component renders without crashing', () => {
        const wrapper = shallow(<DeleteTeamUnconnected
            closeSuccessMessage={noop}
            closeAdminError={noop}
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
            closeSuccessMessage={noop}
            closeAdminError={noop}
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
            closeSuccessMessage={noop}
            closeAdminError={noop}
            deletingTeam={false}
            deleteTeamRequest={mockFn}
            fetchTeamsRequest={noop}
            deleteTeamError=""
            deleteTeamErrorCode=""
        />);
        wrapper.find(StyledButton).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
    });

    it('There is not a class with hidden only if the team being deleted', () => {
        const wrapper = shallow(<DeleteTeamUnconnected
            closeSuccessMessage={noop}
            closeAdminError={noop}
            deletingTeam
            deleteTeamRequest={noop}
            fetchTeamsRequest={noop}
            deleteTeamError=""
            deleteTeamErrorCode=""
        />);
        expect(wrapper.find({ className: styles.hidden })).toHaveLength(0);
    });
});

describe('DeleteTeam connected', () => {
    it('Connected delete team', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            admin: initialState
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <DeleteTeam />
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
