import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import StyledButton from '../../common/StyledButton/StyledButton';
import { mount, shallow } from '../../enzyme';
import { initialState } from '../reducer';
import CreateTeam, { CreateTeamUnconnected } from './CreateTeam';
import styles from './CreateTeam.module.scss';

describe('Create Team', () => {
    it('The Create Team component renders without crashing', () => {
        const wrapper = shallow(<CreateTeamUnconnected
            closeSuccessMessage={noop}
            closeAdminError={noop}
            creatingTeam={false}
            createTeamRequest={noop}
            createTeamError=""
            createTeamErrorCode=""
        />);
        expect(() => wrapper).not.toThrow();
    });

    it('Create player should have a single Create Player button', () => {
        const wrapper = shallow(<CreateTeamUnconnected
            closeSuccessMessage={noop}
            closeAdminError={noop}
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
            closeSuccessMessage={noop}
            closeAdminError={noop}
            creatingTeam={false}
            createTeamRequest={mockFn}
            createTeamError=""
            createTeamErrorCode=""
        />);
        wrapper.find(StyledButton).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
    });

    it('There is not a class with hidden only if the team being created', () => {
        const wrapper = shallow(<CreateTeamUnconnected
            closeSuccessMessage={noop}
            closeAdminError={noop}
            creatingTeam
            createTeamRequest={noop}
            createTeamError=""
            createTeamErrorCode=""
        />);
        expect(wrapper.find({ className: styles.hidden })).toHaveLength(0);
    });
});

describe('Create Team connected', () => {
    it('Connected create team', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            admin: initialState
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <CreateTeam />
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
