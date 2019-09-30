import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './Checkbox.module.scss';

const Checkbox = props => (
    <input
        className={props.styles.checkbox}
        type="checkbox"
        onChange={e => props.onChange(e.target.value)}
    />
);

Checkbox.defaultProps = {
    onChange: noop,
    styles: defaultStyles
};

Checkbox.propTypes = {
    onChange: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default Checkbox;
