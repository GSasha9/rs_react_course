import type { UseFormRegister } from 'react-hook-form';

import './input.scss';

import type { FormValues } from '@/shared/types/form-values';

export interface InputProps {
  type: string;
  name?: keyof FormValues;
  label: string;
  id: string;
  placeholder?: string;
  error?: string;
  register?: UseFormRegister<FormValues>;
}

const Input = ({
  type,
  name,
  label,
  id,
  placeholder,
  error,
  register,
}: InputProps) => {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>

      {register ? (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(id as keyof FormValues)}
        />
      ) : (
        <input type={type} id={id} placeholder={placeholder} name={name} />
      )}

      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default Input;
