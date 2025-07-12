import type { ButtonProps } from './models/interfaces/button-props';

import './button.scss';

const Button = ({
  text = 'search',
  callback,
  type = 'button',
  className,
}: ButtonProps) => {
  return (
    <button
      className={`button ${className ?? ''}`}
      onClick={callback}
      type={type}
    >
      {text || 'search'}
    </button>
  );
};

export default Button;
