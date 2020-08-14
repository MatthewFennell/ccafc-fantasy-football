import React from 'react';
import StyledButton from '../common/StyledButton/StyledButton';
import { shallow, mount } from '../enzyme';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
    it('The ErrorBoundary component renders without crashing', () => {
        const wrapper = shallow(<ErrorBoundary />);
        expect(() => wrapper).not.toThrow();
    });

    it('ErrorBoundary renders children', () => {
        const children = (
            <StyledButton />
        );
        const moduleName = 'module';
        const wrapper = mount(
            <ErrorBoundary
                moduleName={moduleName}
            >
                {children}
            </ErrorBoundary>
        );

        expect(wrapper.find(StyledButton)).toHaveLength(1);
    });

    it('ErrorBoundary renders error', () => {
        const children = (
            <StyledButton />
        );
        const moduleName = 'module';
        const wrapper = mount(
            <ErrorBoundary
                moduleName={moduleName}
            >
                {children}
            </ErrorBoundary>
        );

        wrapper.setState({ hasError: true });
        expect(wrapper.find('.errorHeader')).toHaveLength(1);
        expect(wrapper.find('.errorHeader').text()).toBe(`There was an error in the ${moduleName} module`);
    });
});
