import type { UseFormRegister } from 'react-hook-form';

import './input-field.scss';

import type { FormValues } from '@/shared/interfaces/form-values';

export interface InputFieldProps {
  type: string;
  name: keyof FormValues;
  label: string;
  id: string;
  placeholder?: string;
  error?: string;
  register?: UseFormRegister<FormValues>;
}

const InputField = ({
  type,
  name,
  label,
  id,
  placeholder,
  error,
  register,
}: InputFieldProps) => {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>

      {register ? (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(name)}
        />
      ) : (
        <input type={type} id={id} placeholder={placeholder} name={name} />
      )}

      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default InputField;
