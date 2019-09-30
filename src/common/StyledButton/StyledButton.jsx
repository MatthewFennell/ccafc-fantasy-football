import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { MDBBtn } from 'mdbreact';

const StyledButton = props => (
    <MDBBtn
        color={props.color}
        className={props.styles.styledButton}
        onClick={props.onClick}
    >
        {props.text}
    </MDBBtn>
);

StyledButton.defaultProps = {
    color: 'primary',
    onClick: noop,
    styles: {},
    text: 'Button'
};

StyledButton.propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    text: PropTypes.string
};

export default StyledButton;
