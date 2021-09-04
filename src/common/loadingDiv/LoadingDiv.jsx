import classNames from 'classnames';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import defaultStyles from './LoadingDiv.module.scss';

const LoadingDiv = props => (
    <div
        className={classNames({
            [props.styles.wrapper]: true,
            [props.styles.margin]: props.isMargin,
            [props.styles.borderRadius]: props.isBorderRadius,
            [props.styles.fitContent]: props.isFitContent,
            [props.styles.noPadding]: props.isNoPadding,
            [props.styles.padding]: props.isPadding,
            [props.styles.whiteBackground]: props.isWhiteBackground,
            [props.styles.paperMargin]: props.isPaperMargin
        })}
        onClick={props.onClick}
        tabIndex={0}
        role="button"
    >
        <span className={classNames({
            [props.styles.firstSpan]: true,
            [props.styles.firstSpanLoading]: props.isLoading,
            [props.styles.isRed]: props.isRed && props.isLoading,
            [props.styles.isBlack]: props.isBlack && props.isLoading
        })}
        />
        <span className={classNames({
            [props.styles.secondSpan]: true,
            [props.styles.secondSpanLoading]: props.isLoading,
            [props.styles.isRed]: props.isRed && props.isLoading,
            [props.styles.isBlack]: props.isBlack && props.isLoading
        })}
        />
        <span className={classNames({
            [props.styles.thirdSpan]: true,
            [props.styles.thirdSpanLoading]: props.isLoading,
            [props.styles.isRed]: props.isRed && props.isLoading,
            [props.styles.isBlack]: props.isBlack && props.isLoading
        })}
        />
        <span className={classNames({
            [props.styles.fourthSpan]: true,
            [props.styles.fourthSpanLoading]: props.isLoading,
            [props.styles.isRed]: props.isRed && props.isLoading,
            [props.styles.isBlack]: props.isBlack && props.isLoading
        })}
        />
        {props.children}
    </div>
);

LoadingDiv.defaultProps = {
    children: null,
    isBlack: false,
    isBorderRadius: false,
    isFitContent: false,
    isLoading: false,
    isMargin: false,
    isNoPadding: false,
    isPadding: false,
    isPaperMargin: false,
    isRed: false,
    isWhiteBackground: false,
    onClick: noop,
    styles: defaultStyles
};

LoadingDiv.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    isBlack: PropTypes.bool,
    isBorderRadius: PropTypes.bool,
    isFitContent: PropTypes.bool,
    isLoading: PropTypes.bool,
    isMargin: PropTypes.bool,
    isNoPadding: PropTypes.bool,
    isPadding: PropTypes.bool,
    isPaperMargin: PropTypes.bool,
    isRed: PropTypes.bool,
    isWhiteBackground: PropTypes.bool,
    onClick: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default LoadingDiv;
