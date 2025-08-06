import { useContext } from 'react';

import './button.scss';

import { LoadingContext } from '@/contexts';

interface ButtonProps {
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  callback?: () => void;
}

const Button = ({
  className = '',
  callback,
  text = '',
  type = 'button',
}: ButtonProps) => {
  const { loading } = useContext(LoadingContext);

  return (
    <button
      className={`button ${className ?? ''}`}
      onClick={callback}
      type={type}
      disabled={loading}
    >
      {text}
    </button>
  );
};

export default Button;
