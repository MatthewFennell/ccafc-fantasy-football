import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import defaultStyles from './WithCollapsable.module.scss';

const WithCollapsable = (Component, isOpen, setOpen, title) => {
    if (isOpen) {
        const NormalComponent = props => (
            <div>
                <div>
                    <ExpandLessIcon />
                </div>
                <Component {...props} />
            </div>
        );
        return NormalComponent;
    }

    const ExpandComponent = props => {
        const openBox = useCallback(() => {
            setOpen(true);
        }, [setOpen]);
        return (
            <div className={props.styles.expandWrapper}>
                <div
                    onClick={openBox}
                    role="button"
                    tabIndex={0}
                    className={props.styles.collapsedTitle}
                >
                    {`${title} (Click to expand)`}
                </div>
                <div className={props.styles.expandIcon}>
                    <ExpandMoreIcon onClick={openBox} />
                </div>
            </div>
        );
    };

    ExpandComponent.propTypes = {
        styles: PropTypes.objectOf(PropTypes.string)
    };

    ExpandComponent.defaultProps = {
        styles: defaultStyles
    };

    return ExpandComponent;
};

export default WithCollapsable;
