import './button.scss';

interface ButtonProps {
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  callback?: () => void;
  disabled?: boolean;
}

const Button = ({
  className = '',
  callback,
  text = '',
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`button ${className ?? ''}`}
      onClick={callback}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
