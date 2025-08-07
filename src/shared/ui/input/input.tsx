import './input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  name?: string;
  disabled?: boolean;
}

const Input = ({
  type = 'text',
  className = 'input',
  value,
  onChange,
  onClick,
  disabled = false,
  ...props
}: InputProps) => {
  return (
    <input
      {...props}
      type={type}
      className={className}
      value={value}
      onChange={onChange}
      disabled={disabled}
      onClick={onClick}
    ></input>
  );
};

export default Input;
