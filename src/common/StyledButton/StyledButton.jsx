import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { MDBBtn } from 'mdbreact';
import defaultStyles from './StyledButton.module.scss';

const StyledButton = props => (
    <MDBBtn
        color={props.color}
        className={props.styles.styledButton}
        onClick={props.onClick}
        type={props.type}
    >
        {props.text}
    </MDBBtn>
);

StyledButton.defaultProps = {
    color: 'primary',
    onClick: noop,
    styles: defaultStyles,
    text: 'Button',
    type: ''
};

StyledButton.propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    text: PropTypes.string,
    type: PropTypes.string
};

export default StyledButton;