import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import defaultStyles from './WithCollapsable.module.scss';

const WithCollapsable = (Component, setOpen, title) => {
    const NormalComponent = props => {
        const { styles, ...args } = props; // Need to not pass down styles

        const toggleClose = useCallback(() => {
            setOpen(false, props.id);
        }, [props.id, setOpen]);

        const toggleOpen = useCallback(() => {
            setOpen(true, props.id);
        }, [props.id, setOpen]);

        if (props.isOpen) {
            return (
                <div className={props.styles.collapsableWrapper}>
                    <div className={props.styles.expandLess}>
                        <ExpandLessIcon onClick={toggleClose} />
                    </div>
                    <Component {...args} />
                </div>
            );
        }
        return (
            <div className={props.styles.expandWrapper}>
                <div className={props.styles.iconWrapper}>
                    <div
                        onClick={() => setOpen(true, props.id)}
                        role="button"
                        tabIndex={0}
                        className={props.styles.collapsedTitle}
                    >
                        {`${title} (Click to expand)`}
                    </div>
                    <div className={props.styles.expandIcon}>
                        <ExpandMoreIcon onClick={toggleOpen} />
                    </div>
                </div>
            </div>
        );
    };

    NormalComponent.defaultProps = {
        id: '',
        isOpen: false,
        styles: defaultStyles
    };

    NormalComponent.propTypes = {
        id: PropTypes.string,
        isOpen: PropTypes.bool,
        styles: PropTypes.objectOf(PropTypes.string)
    };

    return NormalComponent;
};

export default WithCollapsable;
