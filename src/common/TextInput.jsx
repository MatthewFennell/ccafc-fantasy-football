import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './TextInput.module.scss';

const TextInput = props => (
    <input
        className={props.styles.textInput}
        type={props.type}
        onChange={e => props.onChange(e.target.value)}
    />
);

TextInput.defaultProps = {
    onChange: noop,
    styles: defaultStyles,
    type: 'text'
};

TextInput.propTypes = {
    onChange: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    type: PropTypes.string
};

export default TextInput;
