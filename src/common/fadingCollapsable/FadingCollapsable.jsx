import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import defaultStyles from './FadingCollapsable.module.scss';
import Fade from '../Fade/Fade';

const FadingCollapsable = props => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={classNames({
            [props.styles.collapsableWrapper]: true,
            [props.styles.sideMargins]: props.isSideMargins
        })}
        >
            <div className={props.styles.icon}>
                {isOpen ? <ExpandLessIcon onClick={() => setIsOpen(false)} />
                    : <ExpandMoreIcon onClick={() => setIsOpen(true)} /> }
            </div>
            <Fade
                checked={isOpen}
            >
                {props.children}
            </Fade>
            <Fade
                checked={!isOpen}
            >
                {props.title}
            </Fade>
        </div>
    );
};

FadingCollapsable.defaultProps = {
    children: null,
    isSideMargins: false,
    styles: defaultStyles,
    title: null
};

FadingCollapsable.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    isSideMargins: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string),
    title: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default FadingCollapsable;
