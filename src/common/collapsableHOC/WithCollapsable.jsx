import React from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import defaultStyles from './WithCollapsable.module.scss';

const WithCollapsable = (Component, isOpen, setOpen, title) => {
    if (isOpen) {
        const NormalComponent = props => {
            const { styles, ...args } = props; // Need to not pass down styles
            return (
                <div className={props.styles.collapsableWrapper}>
                    <div className={props.styles.expandLess}>
                        <ExpandLessIcon onClick={() => setOpen(false)} />
                    </div>
                    <Component {...args} />
                </div>
            );
        };

        NormalComponent.defaultProps = {
            styles: defaultStyles
        };

        NormalComponent.propTypes = {
            styles: PropTypes.objectOf(PropTypes.string)
        };

        return NormalComponent;
    }

    const ExpandComponent = props => (
        <div className={props.styles.expandWrapper}>
            <div className={props.styles.iconWrapper}>
                <div
                    onClick={() => setOpen(true)}
                    role="button"
                    tabIndex={0}
                    className={props.styles.collapsedTitle}
                >
                    {`${title} (Click to expand)`}
                </div>
                <div className={props.styles.expandIcon}>
                    <ExpandMoreIcon onClick={() => setOpen(true)} />
                </div>
            </div>
        </div>
    );

    ExpandComponent.propTypes = {
        styles: PropTypes.objectOf(PropTypes.string)
    };

    ExpandComponent.defaultProps = {
        styles: defaultStyles
    };

    return ExpandComponent;
};

export default WithCollapsable;
