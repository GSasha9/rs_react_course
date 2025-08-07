import './button.scss';

import { useLoadingStatus } from '@/hooks/use-loading-status';

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
  const { loadingStatus } = useLoadingStatus();

  return (
    <button
      className={`button ${className ?? ''}`}
      onClick={callback}
      type={type}
      disabled={loadingStatus}
    >
      {text}
    </button>
  );
};

export default Button;
