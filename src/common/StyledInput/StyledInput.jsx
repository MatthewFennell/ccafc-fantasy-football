import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { MDBInput } from 'mdbreact';
import classNames from 'classnames';
import defaultStyles from './StyledInput.module.scss';

// https://mdbootstrap.com/docs/react/forms/basic/

const StyledInput = props => (
    <MDBInput
        value={props.value}
        hint={props.hint}
        label={props.label}
        icon={props.icon}
        className={classNames({
            [props.styles.styledInput]: true,
            [props.styles.centerText]: props.centerText
        })}
        onChange={e => props.onChange(e.target.value)}
        type={props.type}
        disabled={props.disabled}
    />
);

StyledInput.defaultProps = {
    centerText: false,
    hint: '',
    label: '',
    icon: '',
    onChange: noop,
    styles: defaultStyles,
    type: 'text',
    disabled: false,
    value: ''
};

StyledInput.propTypes = {
    centerText: PropTypes.bool,
    hint: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,
    onChange: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    type: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string
};

export default StyledInput;
