import React from 'react';
import PropTypes from 'prop-types';
import defaultStyles from './ErrorBoundary.module.scss';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch() {
        // Display fallback UI
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError || true) {
        // You can render any custom fallback UI
            return (
                <div className={this.props.styles.errorMessageWrapper}>
                    <div className={this.props.styles.errorHeader}>
                        {`There was an error in the ${this.props.moduleName} module`}
                    </div>

                    <ul className={this.props.styles.options}>
                        <li>
                            Try loading
                            {' '}
                            <a
                                className={this.props.styles.linkColor}
                                href={`/${process.env.REACT_APP_AUTH_DOMAIN}`}
                            >
                                {`https://${process.env.REACT_APP_AUTH_DOMAIN}`}

                            </a>
                        </li>

                        <li>
                            If the error persists,
                            let the website maintainer know (and which module)
                        </li>

                    </ul>
                </div>
            );
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    moduleName: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string)
};

ErrorBoundary.defaultProps = {
    children: null,
    moduleName: '',
    styles: defaultStyles
};

export default ErrorBoundary;
