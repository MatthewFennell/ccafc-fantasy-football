import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './ButtonStyles.module.scss';

const Button = props => (
  <button
    className={props.styles.button}
    onClick={props.onClick}
    type="button"
  >
    {props.text}
  </button>
);

Button.defaultProps = {
  onClick: noop,
  styles: defaultStyles,
  text: 'Button'
};

Button.propTypes = {
  onClick: PropTypes.func,
  styles: PropTypes.objectOf(PropTypes.string),
  text: PropTypes.string
};

export default Button;
