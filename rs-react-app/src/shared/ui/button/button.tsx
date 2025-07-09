import type { ButtonProps } from './models/interfaces/button-props';

const Button = ({
  text = 'search',
  callback,
  type = 'button',
  className = 'button',
}: ButtonProps) => {
  return (
    <button className={className} onClick={callback} type={type}>
      {text || 'search'}
    </button>
  );
};

export default Button;
