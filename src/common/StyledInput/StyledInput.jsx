import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { MDBInput } from 'mdbreact';
import defaultStyles from './StyledInput.module.scss';

// https://mdbootstrap.com/docs/react/forms/basic/

const StyledInput = props => (
    <MDBInput
        hint={props.hint}
        label={props.label}
        icon={props.icon}
        className={props.styles.styledInput}
        onChange={e => props.onChange(e.target.value)}
        type={props.type}
    />
);

StyledInput.defaultProps = {
    hint: '',
    label: '',
    icon: '',
    onChange: noop,
    styles: defaultStyles,
    type: 'text'
};

StyledInput.propTypes = {
    hint: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,
    onChange: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    type: PropTypes.string
};

export default StyledInput;
