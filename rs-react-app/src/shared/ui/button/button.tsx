import React from 'react';
import type { ButtonProps } from './models/interfaces/button-props';

const Button: React.FC<ButtonProps> = ({
  text = 'search',
  callback,
  type = 'button',
  className = 'button',
}) => {
  return (
    <button className={className} onClick={callback} type={type}>
      {text || 'search'}
    </button>
  );
};

export default Button;
