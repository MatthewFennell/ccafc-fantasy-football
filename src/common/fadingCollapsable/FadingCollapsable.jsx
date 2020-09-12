import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core/styles';
import defaultStyles from './FadingCollapsable.module.scss';
import Fade from '../Fade/Fade';
import materialStyles from '../../materialStyles';
import * as appConstants from '../../constants';

const FadingCollapsable = props => {
    const [isOpen, setIsOpen] = useState(false);
    const classes = makeStyles(materialStyles)();
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);

    return (
        // <div className={classNames({
        //     [props.styles.collapsableWrapper]: true,
        //     [props.styles.sideMargins]: props.isSideMargins,
        //     [props.styles.bigSideMargins]: props.isBigSideMargins,
        //     [props.styles.noPhoneMargin]: props.isNoPhoneMargin,
        //     [props.styles.borderRadiusSmall]: props.isBorderRadiusSmall,
        //     [props.styles.borderRadiusTiny]: props.isBorderRadiusTiny
        // })}
        // >
        <Paper
            elevation={4}
            className={classNames({
                [classes.fadingCollapsable]: !isMobile,
                [classes.fadingCollapsableMobile]: isMobile
            })}
        >
            <div
                className={props.styles.iconWrapper}
                onClick={() => setIsOpen(!isOpen)}
                tabIndex={0}
                role="button"
            >
                {isOpen ? <ExpandLessIcon onClick={() => setIsOpen(false)} />
                    : <ExpandMoreIcon onClick={() => setIsOpen(true)} /> }
            </div>
            <Fade
                checked={isOpen}
            >
                {props.children
                && React.cloneElement(props.children, { setIsCollapsableOpen: setIsOpen })}
            </Fade>
            <Fade
                checked={!isOpen}
            >
                {props.title
                && React.cloneElement(props.title, { setIsCollapsableOpen: setIsOpen })}
            </Fade>
        </Paper>
    );
};

FadingCollapsable.defaultProps = {
    children: null,
    isBigSideMargins: false,
    isBorderRadiusSmall: false,
    isBorderRadiusTiny: false,
    isNoPhoneMargin: false,
    isSideMargins: false,
    styles: defaultStyles,
    title: null
};

FadingCollapsable.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    isBigSideMargins: PropTypes.bool,
    isBorderRadiusSmall: PropTypes.bool,
    isBorderRadiusTiny: PropTypes.bool,
    isNoPhoneMargin: PropTypes.bool,
    isSideMargins: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string),
    title: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default FadingCollapsable;
