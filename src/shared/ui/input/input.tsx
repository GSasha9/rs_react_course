import { useContext } from 'react';

import DEFAULT_INPUT_VALUE from './models/constants/default-input-value';

import './input.scss';

import { LoadingContext } from '@/shared/models/contexts';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

const Input = ({
  type = 'text',
  placeholder = DEFAULT_INPUT_VALUE,
  className = 'input',
  value,
  onChange,
  onClick,
}: InputProps) => {
  const { loading } = useContext(LoadingContext);

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange}
      name="input-search"
      disabled={loading}
      onClick={onClick}
    ></input>
  );
};

export default Input;
