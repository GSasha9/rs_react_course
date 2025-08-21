export interface InputFieldProps {
  type: string;
  name: string;
  label: string;
  id: string;
  placeholder?: string;
  required: boolean;
  error?: string;
}

const InputField = ({
  type,
  name,
  label,
  id,
  placeholder,
  required,
  error,
}: InputFieldProps) => {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder ?? ''}
        required={required}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default InputField;
