import { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css'

export class Button extends Component {
  render() {
    const { title, handleClick, disabled, type } = this.props;
    return (
      <button
        type="button"
        className="button"
        disabled={disabled || false}
        onClick={handleClick}
        type={type}
      >{title}
      </button>
    );
  }
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string.isRequired
};
