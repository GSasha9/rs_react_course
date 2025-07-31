import { useContext } from 'react';

import './input.scss';

import { LoadingContext } from '@/shared/models/contexts';

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
  const { loading } = useContext(LoadingContext);

  return (
    <input
      {...props}
      type={type}
      className={className}
      value={value}
      onChange={onChange}
      disabled={loading}
      onClick={onClick}
    ></input>
  );
};

export default Input;
