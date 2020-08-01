import React from 'react';
import { noop } from 'lodash';
import { mount, shallow } from '../../enzyme';
import SelectProfilePicture from './SelectProfilePicture';

describe('Profile - SelectProfilePicture', () => {
    it('The SelectProfilePicture component renders without crashing', () => {
        const wrapper = shallow(<SelectProfilePicture disabled={false} />);
        expect(() => wrapper).not.toThrow();
    });

    it('The SelectProfilePicture component renders list of photo urls', () => {
        const photoUrls = ['some', 'list', 'of', 'photos'];
        const activePhoto = 'list';
        const mockFn = jest.fn(noop);

        const wrapper = mount(<SelectProfilePicture
            disabled={false}
            potentialPictures={photoUrls}
            currentPhotoUrl={activePhoto}
            updateProfilePicture={mockFn}
        />);
        expect(() => wrapper).not.toThrow();

        expect(wrapper.find('.imageWrapper')).toHaveLength(4);
        expect(wrapper.find('.hidden')).toHaveLength(3);
        wrapper.find('.imageWrapper').at(0).find('.profilePicture').simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe('some');
    });
});
