import './input.scss';

import { useLoadingStatus } from '@/hooks/use-loading-status';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  name?: string;
}

const Input = ({
  type = 'text',
  className = 'input',
  value,
  onChange,
  onClick,
  ...props
}: InputProps) => {
  const { loadingStatus } = useLoadingStatus();

  return (
    <input
      {...props}
      type={type}
      className={className}
      value={value}
      onChange={onChange}
      disabled={loadingStatus}
      onClick={onClick}
    ></input>
  );
};

export default Input;
