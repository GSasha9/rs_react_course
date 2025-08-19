export interface InputFieldProps {
  type: string;
  name: string;
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required: boolean;
  error?: string;
}

const InputField = ({
  type,
  name,
  label,
  id,
  value,
  onChange,
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? ''}
        required={required}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default InputField;
