import { type UseFormRegister } from 'react-hook-form';

import { type FormValues } from '@/shared/types/form-values';

interface AutocompleteFieldProps {
  htmlFor: string;
  listID: string;
  id: string;
  name: keyof FormValues | string;
  options: string[];
  register?: UseFormRegister<FormValues>;
}

const AutocompleteField = ({
  htmlFor,
  listID,
  id,
  name,
  options,
  register,
}: AutocompleteFieldProps) => {
  return (
    <div className="autocomplete-field">
      <label htmlFor={htmlFor}>Select Country</label>
      {register ? (
        <input list={listID} id={id} {...register(name as keyof FormValues)} />
      ) : (
        <input list={listID} id={id} name={name} />
      )}
      <datalist id={listID}>
        {options.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </div>
  );
};

export default AutocompleteField;
